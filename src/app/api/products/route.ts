import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import { MongoClient, Db } from 'mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const metadata = req.headers.get('Metadata');
    const data = metadata ? JSON.parse(metadata) : {};
    const query = { shopName: data };
    try {
        const products = await db.collection('products').find(query).toArray();
        console.log(products);
        return NextResponse.json({products, success: true}, {status: 200})
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400})
    }
    
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");
    const data = await JSON.parse(req.headers.get('Metadata') || '{}'); 
    console.log(`Products: ${data}`);

    try {
        const product = await db.collection('products').insertOne(data);
        // return res.status(201).json({ success: true, data: product });
        return NextResponse.json({data: product, success: true}, {status: 200})
    } catch (error) {
        // return res.status(400).json({ success: false });
        return NextResponse.json({ success: false }, {status: 400});
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}'); 

    const query = {_id: new ObjectId(`${data}`)}
    try {
        const products = await db.collection('products').deleteOne(query);
        console.log(products);
        return NextResponse.json({success: true}, {status: 200})
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400})
    }

}

export async function PUT(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    const editedData = await req.json();
    // Remove _id from data before updating
    const { _id, ...updateData } = editedData;
    const id = {_id: data}
    console.log(`data: ${id}`)
    console.log(`editedData: ${editedData.description}`);
    try {
        const updatedResult = await db.collection('products').updateOne(
            {'_id': new ObjectId(data)},
            {$set: updateData}
        )
        console.log(`updatedResult: ${updatedResult}`)
        if (updatedResult.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
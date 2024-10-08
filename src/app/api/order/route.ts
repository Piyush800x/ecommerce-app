import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import { MongoClient, Db } from 'mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");
    const data = await JSON.parse(req.headers.get('Metadata') || '{}'); 
    console.log(`Products: ${data.id}`);
    const query = {
        userId: data.id
    }
    console.log(`API: ${query}`)

    try {
        const product = await db.collection('orders').find(query).toArray();
        // return res.status(201).json({ success: true, data: product });
        return NextResponse.json({data: product, success: true}, {status: 200})
    } catch (error) {
        // return res.status(400).json({ success: false });
        return NextResponse.json({ success: false }, {status: 400});
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");
    const data = await JSON.parse(req.headers.get('Metadata') || '{}'); 
    console.log(`Products: ${data}`);

    try {
        const product = await db.collection('orders').insertOne(data);
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
    console.log(`Products: ${data.id}`);
    const query = {
        orderId: data.orderId
    }
    console.log(`API: ${query}`)

    try {
        const product = await db.collection('orders').deleteOne(query);
        // return res.status(201).json({ success: true, data: product });
        return NextResponse.json({data: product, success: true}, {status: 200})
    } catch (error) {
        // return res.status(400).json({ success: false });
        return NextResponse.json({ success: false }, {status: 400});
    }
}
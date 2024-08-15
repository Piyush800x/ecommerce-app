import { NextRequest, NextResponse } from "next/server";
import dbConnect from '../../../utils/dbConnect';
import { MongoClient, Db, ObjectId } from 'mongodb';

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`data search: ${data}`)

    try {
        const products = await db.collection('customer').insertOne(data);
        return NextResponse.json({products, success: true}, {status: 200})
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400})
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`Data Api: ${data.userId}`);
    try {
        const address = await db.collection('customer').find({userAuthId: data.userId}).toArray();
        console.log(`API: ${address}`)
        return NextResponse.json({data: address, success: true}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 404});
    }
}
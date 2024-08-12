import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import { MongoClient, Db } from 'mongodb';

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");
    try {
        const products = await db.collection('products').find({}).toArray();
        // return res.status(200).json({ success: true, data: products });
        return NextResponse.json({data: products, success: true}, {status: 200})
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400})
    }
}
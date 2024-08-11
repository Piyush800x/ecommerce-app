import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import { MongoClient, Db } from 'mongodb';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const products = await db.collection('products').find({}).toArray();
    // return res.status(200).json({ success: true, data: products });
    return NextResponse.json({data: products}, {status: 200})
}
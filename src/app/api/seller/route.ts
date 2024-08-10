import { NextRequest, NextResponse } from "next/server";
import dbConnect from '../../../utils/dbConnect';
import { MongoClient, Db } from 'mongodb';

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}')

    try {
        const sellers = await db.collection('sellers').insertOne(data);
        return NextResponse.json({data: sellers, success: true}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({success: false}, {status: 400});
    }

}

export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}')

    const seller = await db.collection('sellers').findOne({authUserId: data.authUserId});
    console.log(`seller: ${seller}`);
    return NextResponse.json({data: seller}, {status: 200});

}
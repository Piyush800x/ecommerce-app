import { NextRequest, NextResponse } from "next/server";
import dbConnect from '../../../utils/dbConnect';
import { MongoClient, Db } from 'mongodb';

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await dbConnect;
    const db: Db = client.db("Store");

    const data = await JSON.parse(req.headers.get('Metadata') || '{}')
    console.log(`Route: data?>>>> ${data.authUserId}`)
    const seller = await db.collection('sellers').findOne({authUserId: data.authUserId});
    console.log(`seller: ${seller}`);
    if (seller === null) {
        return NextResponse.json({success: false},{status: 200});    
    }
    if (`${seller.authUserId}` === `${data.authUserId}`) {
        return NextResponse.json({data: seller, success: true}, {status: 200});
    }

}
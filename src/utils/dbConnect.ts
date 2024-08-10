// utils/dbConnect.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}


// In production mode, it's fine to create a new MongoClient instance
client = new MongoClient(uri as string, options);
clientPromise = client.connect();


export default clientPromise;

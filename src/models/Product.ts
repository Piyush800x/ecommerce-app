// models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    seller: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

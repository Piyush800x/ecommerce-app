import mongoose, { Schema, Document } from 'mongoose';

interface Seller extends Document {
    shopName: string;
    gstNo: string;
}

const SellerSchema: Schema = new Schema({
    shopName: { type: String, required: true },
    gstNo: { type: String, required: true },
    authUserId: { type: String, required: true },
    authUserEmail: { type: String, required: true },
    authUserGivenName: { type: String, required: true },
    authUserFamilyName: { type: String, required: true },
    registrationTime: { type: String, required: true },
});

export default mongoose.models.Seller || mongoose.model<Seller>('Seller', SellerSchema);

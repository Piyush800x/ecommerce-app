// components/ProductCard.tsx
import { FC } from 'react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { ObjectId } from 'mongodb';


interface ProductCardProps {
    product: {
        _id: ObjectId;
        title: string;
        description: string;
        price: number;
        imageUrl: string;
        shopName: string,
        category: string;
    };
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="border rounded-lg p-4">
            <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-700">{product.shopName}</p>
            <p className="text-green-500 font-bold mt-2">₹{product.price}</p>
            <div className='flex gap-2 pt-2 w-full'>
                <Button className='bg-blue-500 hover:bg-blue-400'>Buy now</Button>
                <Button variant="outline">Add to cart</Button>
                <Link href={`/products/${product._id}`}><Button variant="outline">View</Button></Link>
            </div>
        </div>
    );
};

export default ProductCard;

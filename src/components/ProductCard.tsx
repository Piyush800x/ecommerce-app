// components/ProductCard.tsx
import { FC } from 'react';

interface ProductCardProps {
    product: {
        title: string;
        description: string;
        price: number;
        imageUrl: string;
    };
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="border rounded-lg p-4">
            <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-500 font-bold mt-2">₹{product.price}</p>
        </div>
    );
};

export default ProductCard;

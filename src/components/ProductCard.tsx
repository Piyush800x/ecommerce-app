// components/ProductCard.tsx
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import Image from 'next/image';


interface Product {
    _id: ObjectId;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    shopName: string,
    category: string;
}

const ProductCard = ({ product }: {product: Product}) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    })
    // const index = cart.findIndex((item: Product) => item._id === product._id);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem: Product, quantity = 1) => {
        console.log(`${newItem.title} added to cart`);
        // setCart((prevCart: any) => [...prevCart, product]);

        // Retrieve the existing cart from localStorage
        let item = `${localStorage.getItem('cart')}`
        let cart = JSON.parse(item) || [];
        const index = cart.findIndex((item: Product) => item._id === product._id);
        // // If item doesn't exist, add it to the cart
        // cart.push(newItem);
        // setCart(cart)
        if (index !== -1) {
            // Product already exists, update the quantity
            cart[index].quantity += quantity;
        } else {
            // Add new product with quantity
            cart.push({ ...product, quantity });
        }
        setCart(cart);
    };

    return (
        <div className="border rounded-lg p-4">
            <Image src={`${product.imageUrl}`} alt={product.title} className="w-full h-48 object-cover rounded-lg" width={192} height={192}/>
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-700">{product.shopName}</p>
            <p className="text-green-500 font-bold mt-2">₹{product.price}</p>
            <div className='flex gap-2 pt-2 w-full'>
                <Button className='bg-blue-500 hover:bg-blue-400'>Buy now</Button>
                <Button variant="outline" onClick={() => addToCart(product)}>Add to cart</Button>
                <Link href={`/products/${product._id}`}><Button variant="outline">View</Button></Link>
            </div>
        </div>
    );
};

export default ProductCard;

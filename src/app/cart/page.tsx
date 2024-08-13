'use client';
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { ObjectId } from "mongodb";

interface Product {
    _id: ObjectId;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    shopName: string,
    category: string;
}

export default function CartPage() {
    const [cart, setCart] = useState<Product[]>([]);

    // Fetch cart data from localStorage on component mount
    useEffect(() => {
        // Fetch the cart data from localStorage
        const storedCart = localStorage.getItem('cart');

        // If storedCart is null, fallback to an empty array
        const cartData = storedCart ? JSON.parse(storedCart) : [];

        setCart(cartData);
    }, []);

    if (cart.length === 0) {
        return (
            <main>
                <Navbar/>
                <h1>No items in cart!</h1>
            </main>
        )
    }

    return (
        <main>
            <Navbar/>
            <div>
                {cart.map((product) => (
                    <div key={`${product._id}`}> 
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <br />
                    </div>
                ))}
            </div>
        </main>
    )
}
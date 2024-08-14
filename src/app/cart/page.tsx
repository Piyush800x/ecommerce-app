'use client';
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
    _id: ObjectId;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    shopName: string,
    category: string;
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<Product[]>([]);
    const [cartValue, setCartValue] = useState<number>(0);

    // Fetch cart data from localStorage on component mount
    useEffect(() => {
        // Fetch the cart data from localStorage
        const storedCart = localStorage.getItem('cart');

        // If storedCart is null, fallback to an empty array
        const cartData = storedCart ? JSON.parse(storedCart) : [];

        setCart(cartData);
    }, []);

    const calculateCartValue = () => {
        console.log(cart);
        // calculate cart value
        const x: number = cart.reduce((acc, product) => {
            return acc + Number(product.price) * product.quantity;
        }, 0);

        setCartValue(x);
        console.log(`Value : ${cartValue}`);
    }

    useEffect(() => {
        calculateCartValue();
    }, [cart, cartValue])
    

    const removeFromCart = (productId: ObjectId, quantity = 1) => {
        // const updatedCart = cart.filter(item => item._id !== productId);
        // setCart(updatedCart);
        // localStorage.setItem('cart', JSON.stringify(updatedCart));
        // calculateCartValue();

        const index = cart.findIndex((item: Product) => item._id === productId);
        const storedCart = localStorage.getItem('cart');
        // If storedCart is null, fallback to an empty array
        const cart2 = storedCart ? JSON.parse(storedCart) : [];
        if (index !== -1) {
            if (cart2[index].quantity > quantity) {
                // Decrease the quantity
                cart2[index].quantity -= quantity;
            } else {
                // Remove the item if quantity is less than or equal to zero
                cart2.splice(index, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart2));
        setCart(cart2);
        // calculateCartValue();
    }

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
            <div className="flex flex-row mx-5">
                <div className="flex flex-col items-stretch w-2/3">
                    {cart.map((product) => (
                        <div key={`${product._id}`} className="flex items-center justify-between px-10 py-5 gap-x-5 border-black border mx-2 my-2 rounded-lg w-full"> 
                            <div className="flex flex-row justify-start px-10 py-5 gap-x-5">
                                <div className="">
                                    <Image src={`${product.imageUrl}`} alt={`${product.title}`} height={200} width={100}/>
                                </div>
                                <div className="flex flex-col justify-start">
                                    <h2 className="text-3xl">{product.title}</h2>
                                    <p className="text-base">{product.description}</p>
                                    <p className="text-base">Quantity: {product.quantity}</p>
                                    <p className="text-xl">₹{product.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button onClick={() => removeFromCart(product._id)}>Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex w-1/3 mx-5 my-2">
                    <div>
                        <h2 className="text-3xl">Price: ₹{cartValue}</h2>
                        <h1 className="text-xl">Cart Size: {cart.length}</h1>
                        <Button className="my-2">Checkout</Button>
                    </div >
                </div>
            </div>
        </main>
    )
}
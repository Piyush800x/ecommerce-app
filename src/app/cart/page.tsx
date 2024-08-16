'use client';
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const handleCheckout = () => {
        router.push('/checkout');
    }

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
                <div className='flex flex-col items-center px-5 py-5'>
                    <p className='text-3xl pb-5 font-semibold'>Your cart is empty!</p>
                    <Image unoptimized className='rounded-xl' src={`/gifs/stare.gif`} alt='annoyed' width={250} height={250}/>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Navbar/>
            <div className="flex flex-row justify-around mx-6 my-4 gap-4">
                <div className="flex flex-col gap-2 items-stretch w-2/3">
                    {cart.map((product) => (
                        <div key={`${product._id}`} className="flex items-center justify-between pr-4 gap-x-5 border mx-2 rounded-md w-full"> 
                            <div className="flex flex-row items-center justify-start px-10 py-5 gap-x-5">
                                <div className="">
                                    <Image src={`${product.imageUrl}`} alt={`${product.title}`} height={120} width={120}/>
                                </div>
                                <div className="flex flex-col justify-start">
                                    <h2 className="text-xl font-semibold">{product.title}</h2>
                                    <p className="text-lg">{product.description}</p>
                                    <p className="text-lg mt-1">Quantity: {product.quantity}</p>
                                    <p className="text-lg font-semibold">₹{product.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button onClick={() => removeFromCart(product._id)} variant="destructive">Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="rounded-md border p-4 h-max">
                    <h2 className="text-xl">Total Price: <span className="font-semibold">₹{cartValue}</span></h2>
                    <h1 className="text-lg">Cart Size: <span className="font-semibold">{cart.length}</span></h1>
                    <Button className="my-2" onClick={() => handleCheckout()}>Checkout</Button>
                </div>
            </div>
        </main>
    )
}
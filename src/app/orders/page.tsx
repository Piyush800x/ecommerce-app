'use client';
import { useEffect, useState } from "react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Navbar from "@/components/Navbar";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { TailSpin } from 'react-loader-spinner';
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button";

interface Product {
    _id: ObjectId;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    shopName: string,
    category: string;
    quantity: number;
}

interface Orders {
    _id: ObjectId;
    orderId: string;
    userId: string;
    userEmail: string;
    cart: Product[];
    cartValue: number;
}

export default function Orders() {
    const {user, isAuthenticated} = useKindeBrowserClient();
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const sendData = {
                id: user?.id
            }
            console.log(`SendData: ${JSON.stringify(user?.id)}`);
            const res = await fetch('/api/order', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(sendData)
                },
            })
            const data = await res.json();
            if (data.success) {
                // console.log(data.products)
                setOrders(data.data);
                // console.log(products);
            }
        }
        catch (error) {
            console.error("can't fetch data: ", error);
        }
        finally {
            setLoading(false)
        }
    }

    const deleteOrder = async (orderId: string) => {
        try {
            const sendData = {
                orderId: orderId
            }
            console.log(`SendData: ${JSON.stringify(user?.id)}`);
            const res = await fetch('/api/order', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(sendData)
                },
            })
            const data = await res.json();
            if (data.success) {
                // console.log(data.products)
                // setOrders(data.data);
                // console.log(products);
                toast.success("Item Cancelled");
            }
        }
        catch (error) {
            console.error("can't fetch data: ", error);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders()
        }
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className='h-dvh flex items-center justify-center'>
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#2A91EB"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <main>
                <Navbar/>
                <div className='flex flex-col items-center px-5 py-5'>
                    <p className='text-3xl pb-5 font-semibold'>You must login or register to access this page.</p>
                    <Image unoptimized className='rounded-xl' src={`/gifs/annoyed.gif`} alt='annoyed' width={250} height={250}/>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Toaster/>
            <Navbar/>
            <div className="px-16">
                <h1 className="text-center text-3xl font-semibold my-2">Your Orders</h1>
                {orders.map((order) => (
                    <div key={order.orderId} className="rounded-md border p-4 h-max my-5 px-5">
                        <h1 className="text-2xl font-bold">Order ID {`#${order.orderId}`}</h1>
                        {order.cart.map((item) => (
                            <div key={`${item._id}`} className="rounded-md border p-4 h-max flex flex-row gap-x-5 my-5">
                                <div>
                                    <Image className="rounded-xl" src={`${item.imageUrl}`} alt={`${item.title}`} width={100} height={50}/>
                                </div>
                                <div>
                                    <h1 className="text-xl">Name: {item.title}</h1>
                                    <h1 className="text-sm">Quantity: {item.quantity}</h1>
                                    <h1 className="text-lg">Price: ₹{Number(item.price) * item.quantity}</h1>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-row justify-between">
                        <h1 className="text-xl font-semibold">Total: ₹{`${order.cartValue}`}</h1>
                        <Button className="" onClick={() => deleteOrder(order.orderId)}>Cancel Order</Button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
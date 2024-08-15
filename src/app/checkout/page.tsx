'use client';
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Navbar from "@/components/Navbar";
import NewAddress from "@/components/NewAddress";
import { ObjectId } from "mongodb";
import { ArchiveIcon, BackpackIcon, CardStackPlusIcon, ArrowTopRightIcon } from '@radix-ui/react-icons'
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button";
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

export default function CheckoutPage() {
    const [address, setAddress] = useState<any>();
    const [loading, setLoading] = useState(true);
    const {isAuthenticated, user} = useKindeBrowserClient();
    const [cart, setCart] = useState<Product[]>([]);
    const [cartValue, setCartValue] = useState<number>(0);
    const router = useRouter();

    const handleOrder = async () => {
        const orderId = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDay()}${new Date().toLocaleTimeString()}`;
        const dataSend = {
            orderId: orderId,
            userId: user?.id,
            userEmail: user?.email,
            cart: cart,
            cartValue: cartValue
        }

        try {
            const res = await fetch('/api/order', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(dataSend)
                },
            })
            const data = await res.json();
            if (data.success) {
                toast.success("Order Placed Successfully!")
            }
        }
        catch (error) {
            console.error("can't fetch data: ", error);
        }
    }

    const fetchAddress = async () => {
        console.log(`auth: ${isAuthenticated}`);
        console.log(`UserID: ${user}`);
        const userData = {
            userId: user?.id
        }

        try {
            const res = await fetch('/api/address', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(userData)
                },
            })
            const data = await res.json();
            console.log(`Data: ${JSON.stringify(data.data)}`);
            if (data.success) {
                setAddress(data.data);

            }
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false);
        }
    }

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
        console.log(`auth: ${isAuthenticated}`);
        if (isAuthenticated) {
            fetchAddress();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        // Fetch the cart data from localStorage
        const storedCart = localStorage.getItem('cart');

        // If storedCart is null, fallback to an empty array
        const cartData = storedCart ? JSON.parse(storedCart) : [];

        setCart(cartData);
    }, []);

    useEffect(() => {
        calculateCartValue();
    }, [cart])
    

    if (loading) {
        return (
            <div>
                <Navbar/>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (address.length === 0) {
        return (
            <main>
                <Navbar/>
                <NewAddress/>
            </main>
        )
    }

    return (
        <main className="">
            <Toaster/>
            <Navbar/>
            <div className="p-4 w-full">
                <div className="flex flex-row justify-between px-16">
                    <div className="flex flex-col gap-y-5">
                        <div className="p-4 border rounded-md w-max h-max items-stretch">
                            <div className="flex items-center gap-1">
                                <ArchiveIcon className="size-6"/>
                                <h1 className="text-xl font-bold">Shipping address</h1>
                            </div>
                            <Separator className="my-2"/>
                            {address.map((item: any, index: number) => (
                                <div key={`${item.userAuthId}${index}`} className="flex flex-col">
                                    <h1 className="font-semibold">{item.userFirstName + " " + item.userLastName}</h1>
                                    <h1 className="font-semibold mb-2">{item.mobile}</h1>
                                    <h1><span className="">{item.house}, {item.city}, {item.landmark}</span></h1>
                                    <h1>{item.pin}</h1>
                                    <h1>Email: <span className="font-semibold">{item.userEmail}</span></h1>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border rounded-md w-max overflow-x-auto">
                            <div className="flex items-center gap-1">
                                <BackpackIcon className="size-6"/>
                                <h1 className="text-xl font-bold">Order Summary</h1>
                            </div>
                            <Separator className="my-2"/>
                            <Table className="overflow-x-auto">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item & Description</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.map((item) => (
                                        <TableRow key={`${item._id}`}>
                                            <TableCell>
                                                <div className="flex flex-row gap-3">
                                                    <Image src={`${item.imageUrl}`} alt={`${item.title}`} width={75} height={75}/>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-lg font-semibold">{item.title}</h1>
                                                        <h1 className="text-md">{item.description}</h1>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>₹{item.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="p-4 border rounded-md w-96 h-max">
                            <div className="flex items-center gap-1">
                                <CardStackPlusIcon className="size-6"/>
                                <h1 className="text-xl font-bold">Payment Method</h1>
                            </div>
                            <Separator className="my-2"/> 
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Cash On Delivery (COD)</Label>
                            </div>
                        </div>
                        <div className="p-4 border rounded-md w-96 h-max">
                            <div className="flex items-center gap-1">
                                <ArrowTopRightIcon className="size-6"/>
                                <h1 className="text-xl font-bold">Checkout</h1>
                            </div>
                            <Separator className="my-2"/> 
                            <div className="flex flex-col space-x-2">
                                <h1 className="text-2xl px-2 py-2">Total: ₹{`${cartValue}`}</h1>
                                <Button onClick={() => handleOrder()}>Place Order</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
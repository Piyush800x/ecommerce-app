'use client';
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { PaperPlaneIcon, ArrowTopRightIcon } from '@radix-ui/react-icons'

interface Product {
    _id: ObjectId;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    shopName: string,
    category: string;
}

export default function ProductPage({params}: any) {
    const [products, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            // console.log(`Page 3: ${params.id}`)
            try {
                const res = await fetch('/api/getproductbyid', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Metadata': JSON.stringify(params.id)
                    },
                })
                const data = await res.json();
                if (data.success) {
                    // console.log(data.products)
                    setProduct(data.products);
                    // console.log(products);
                }
            }
            catch (error) {
                console.error("can't fetch data: ", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProducts()
    }, [params.id])

    if (loading) {
        return (
            <div><h1>Loading...</h1></div>
        )
    }

    if (!products) {
        return (
            <div><h1>Product not found</h1></div>
        )
    }

    return (
        <main>
            <Navbar/>
            <div className="container mx-auto p-4">
                {products.map((product) => (
                    <div key={`${product._id}`} className="flex">
                        <Image 
                            src={`${product.imageUrl}`} 
                            alt={`${product.title}`} 
                            width={500} 
                            height={500} 
                            className="my-6 mr-4 border"
                        />
                        <div className="mt-5 ml-2">
                            <h1 className="text-4xl font-bold mb-1">{product.title}</h1>
                            <p className="text-lg mb-2">{product.description}</p>
                            <p className="text-lg font-semibold">Price: <span className="text-2xl text-green-500">₹{product.price}</span></p>

                            <div className="flex gap-2 mt-2">
                                <Button className='bg-blue-500 hover:bg-blue-400'>Buy now<ArrowTopRightIcon className="size-5"/></Button>
                                <Button variant="outline">Add to cart</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
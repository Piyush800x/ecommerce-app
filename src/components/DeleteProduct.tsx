'use client';
import { useState, useEffect } from "react"
import { Button } from "./ui/button";
import Image from "next/image";
import { Toaster, toast } from 'sonner'

interface Product {
    _id: string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    shopName: string;
    category: string;
}

export default function DeleteProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const shopName = localStorage.getItem("shopName")
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch(`/api/products`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(shopName)
                },
            });
            const data = await res.json();
            setProducts(data.products);
            setLoading(false);
        }

        fetchProducts();
    }, [shopName]);

    const deleteProduct = async (id: string) => {
        const res = await fetch(`/api/products`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Metadata': JSON.stringify(id)
            },
        });
        if (res.ok) {
            setProducts(products.filter((product) => product._id !== id));
            toast.success("Product Deleted.")
        } else {
            alert('Failed to delete the product');
        }
    };

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    if (products.length === 0) {
        return (
            <h1 className="text-3xl font-semibold mb-2 text-center">You have no products listed at {shopName}</h1>
        )
    }

    return (
        <div>
            <Toaster/>
            <h1 className="text-3xl font-semibold mb-2">Products in {shopName}</h1>
            <div>
                {products.map((product) => (
                    <div key={product._id} className="flex justify-between">
                        <div className="border rounded-lg p-4">
                            <Image src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-lg" width={400} height={200}/>
                            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="text-gray-700">{product.shopName}</p>
                            <p className="text-green-500 font-bold mt-2">₹{product.price}</p>
                            <div className='flex gap-2 pt-2 w-full'>
                                <Button onClick={() => deleteProduct(product._id)} className='bg-red-500 hover:bg-red-400'>Delete</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
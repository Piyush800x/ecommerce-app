'use client';
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import Navbar from "@/components/Navbar";

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
            console.log(`Page 3: ${params.id}`)
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
                    console.log(data.products)
                    setProduct(data.products);
                    console.log(products);
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
    }, [])

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
        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold">{product.title}</h1>
        //     <p className="mt-4">{product.description}</p>
        //     <p className="mt-4 text-lg font-semibold">Price: ${product.price}</p>
        //     {/* Add more product details as needed */}
        // </div>
        <main>
            <Navbar/>
            <div className="container mx-auto p-4">
                {products.map((product) => (
                    <div key={`${product._id}`}>
                        <h1 className="text-2xl font-bold">{product.title}</h1>
                        <p className="mt-4">{product.description}</p>
                        <p className="mt-4 text-lg font-semibold">Price: ₹{product.price}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
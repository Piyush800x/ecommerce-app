'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { ring2 } from 'ldrs'
import { ObjectId } from 'mongodb';

interface Product {
    _id: ObjectId;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    shopName: string,
    category: string;
}

export default function Home() {
    // ring2.register()    // This makes / req 500 error
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/getproducts');
            const data = await res.json();

            try {
                if (data.success) {
                    setProducts(data.data);
                }
            }
            catch (error) {
                console.error("can't fetch data: ", error);
            }
            finally {
                setLoading(false);
            }
            
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <main>
                <Navbar initialProducts={products}/>
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <div className='h-dvh flex items-center justify-center'>
                        <l-ring-2
                            size="40"
                            stroke="5"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8" 
                            color="#2A92EB" 
                        ></l-ring-2>
                    </div>
                </div>
            </main>
        )
    }

    if (!products) {
        return (
            <main>
                <Navbar/>
                <h1>No products found</h1>
            </main>
        )
    }

    return (
        <ProductPage initialProducts={products}/>
    );
}

function ProductPage({initialProducts}: any) {
    const [products, setProducts] = useState(initialProducts);

    return (
        <main>
            <Navbar setProducts={setProducts}/>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold my-2">Products</h1>
                <div className="grid grid-cols-3 gap-4">
                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <ProductCard key={`${product._id}`} product={product} />
                        ))
                    ) : (
                        <div className='flex w-full justify-center items-center'>
                            <Alert variant="destructive" className=''>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>No products found</AlertTitle>
                                <AlertDescription>
                                    Please try again
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                
                </div>
            </div>
        </main>
    )   
}
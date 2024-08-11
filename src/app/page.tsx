'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { ring2 } from 'ldrs'

export default function Home() {
    ring2.register()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/getproducts');
            const { data } = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    if (products.length === 0) {
        return (
            <main>
                <Navbar/>
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

    return (
      <main>
        <Navbar/>
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-2">Products</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
      </main>
    );
}

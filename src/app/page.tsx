'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products');
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
                    <p>Loading...</p>
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

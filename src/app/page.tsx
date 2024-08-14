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
import { TailSpin } from 'react-loader-spinner';
import { ObjectId } from 'mongodb';
import { Button } from '@/components/ui/button';
import { showDialog } from '@/components/NewSeller';

interface Product {
    _id: ObjectId;
    title: string;
    description: string;
    price: string;
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
            {/* <Button onClick={() => showDialog()}>Click Me</Button>  // test this alert plz */}
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
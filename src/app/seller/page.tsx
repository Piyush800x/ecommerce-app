'use client';
import { useEffect, useState } from 'react';
import NewSeller from '@/components/NewSeller';
import {useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Navbar from '@/components/Navbar';

export default function Dashboard() {
    const {isAuthenticated, user} = useKindeBrowserClient();
    const [isSeller, setIsSeller] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        shopName: localStorage.getItem("shopName")
    });

    const verifyUserLocally = async () => {
        const data = localStorage.getItem("isSeller");
        const userId = localStorage.getItem("userId");
        console.log(`LocalData ${data}`);
        if (data === null) {
            return false
        }
        if (userId != user?.id) {
            setIsSeller(false)
            localStorage.setItem("isSeller", `${false}`);
            return false
        }
        setLoading(false);
    }

    const verifyUser = async () => {
        const local = await verifyUserLocally();
        if (local == false) {
            const userId = {
                authUserId: user?.id
            }
            if (user) {
                console.log(`Auth: ${user?.id}`)
                const res = await fetch('/api/verifyseller', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Metadata': JSON.stringify(userId)
                    },
                })
                const data = await res.json();
                console.log(`Data PAge: ${data.success}`)
                if (data.success) {
                    console.log(`res: ${data}`);
                    setIsSeller(true);
                    localStorage.setItem("isSeller", `${true}`);
                    alert("User Verified!")
                }
            }
            setLoading(false);
        }
        
    }

    useEffect(() => {
        if (isAuthenticated) {
            verifyUser();
        }
        else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Metadata': JSON.stringify(formData)
            },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            alert('Product added!');
        }
    };

    if (!isSeller) {
        return (
            <main>
                <Navbar/>
                <NewSeller/>
            </main>
        )
    }

    return (
        <main>
            <Navbar/>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </main>
    );
}

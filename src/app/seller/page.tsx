'use client';
import { useState } from 'react';

export default function Dashboard() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
    });

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

    return (
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
    );
}

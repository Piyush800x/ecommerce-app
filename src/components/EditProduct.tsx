import React, { useState, useEffect } from 'react';

interface Product {
    _id: string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    shopName: string;
    category: string;
}

const EditProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const shopName = localStorage.getItem("shopName")

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('/api/products', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(shopName) // Replace with your shop name
                }
            });
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        };

        fetchProducts();
    }, []);

    const handleEditClick = (product: any) => {
        setEditingProduct(product);
        setFormData(product); // Pre-fill form data
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/products/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Metadata': JSON.stringify(editingProduct._id)
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
            setProducts(prev => prev.map(p => (p._id === editingProduct._id ? formData : p)));
            setEditingProduct(null);
        } else {
            alert('Failed to update product');
        }
    };

    return (
        <div>
            <ul>
                {products.map((product: any) => (
                    <li key={product._id}>
                        <div>{product.title}</div>
                        <button onClick={() => handleEditClick(product)}>Edit</button>
                    </li>
                ))}
            </ul>

            {editingProduct && (
                <form onSubmit={handleFormSubmit}>
                    <h2>Edit Product</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.title || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Add other fields as needed */}
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default EditProduct;

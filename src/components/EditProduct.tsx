import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
            const res = await fetch(`/api/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Metadata": JSON.stringify(shopName) // Replace with your shop name
                }
            });
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        };

        fetchProducts();
    }, [shopName]);

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
                "Content-Type": "application/json",
                "Metadata": JSON.stringify(editingProduct._id)
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
            setProducts(prev => prev.map(p => (p._id === editingProduct._id ? formData : p)));
            setEditingProduct(null);
        } else {
            alert("Failed to update product");
        }
    };

    if (!products) {
        return (
            <div>
                <h1 className="text-center text-2xl font-semibold">Edit your products in {shopName}</h1>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-center text-2xl font-semibold">Edit your products in {shopName}</h1>
            <ul className="flex flex-col">
                {products.map((product: any) => (
                    <li key={product._id}>
                        {/* <div>{product.title}</div> */}
                        <Image src={product.imageUrl} alt={product.title} className="w-48 h-48 object-cover rounded-lg" width={192} height={192}/>
                        <h2 className="text-xl font-bold mt-2">{product.title}</h2>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="text-gray-700">{product.shopName}</p>
                        <p className="text-green-500 font-bold mt-2">₹{product.price}</p>
                        <button className="px-2 py-2 w-16 text-white rounded-md bg-blue-500 hover:bg-blue-400" onClick={() => handleEditClick(product)}>Open</button>
                        {editingProduct && (
                            <div>
                                <Sheet>
                                        <SheetTrigger asChild>
                                            <Button className="my-2" onClick={() => handleEditClick(product)} variant="outline">Edit</Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                            <SheetTitle>Edit product</SheetTitle>
                                            <SheetDescription>
                                                Make changes to your product here. Click save when you're done.
                                            </SheetDescription>
                                            </SheetHeader>
                                            <div className="grid gap-4 py-4">
                                                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label>
                                                        Name
                                                        </Label>
                                                        <Input  
                                                                type="text"
                                                                name="name"
                                                                value={formData.title || ''}
                                                                onChange={handleInputChange} 
                                                                className="w-max"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label>
                                                        Price
                                                        </Label>
                                                        <Input
                                                            type="number"
                                                            name="price"
                                                            value={formData.price || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label>
                                                        Description
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            name="description"
                                                            value={formData.description || ''}
                                                            onChange={handleInputChange}
                                                            className="w-max"
                                                        />
                                                        
                                                    </div>
                                                    <SheetClose asChild className="flex w-full">
                                                        <Button className="my-4" onSubmit={handleFormSubmit} type="submit">Save changes</Button>
                                                    </SheetClose>        
                                                </form>
                                            </div>
                                            {/* <SheetFooter>
                                            
                                            </SheetFooter> */}
                                        </SheetContent>
                                    </Sheet>
                            </div>
                
            )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditProduct;

'use client';
import { useEffect, useState } from 'react';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const categories = [
    {
        value: "Baby",
        label: "Baby"
    },
    {
        value: "Beauty",
        label: "Beauty"
    },
    {
        value: "Books",
        label: "Books"
    },
    {
        value: "Car & Motorbike",
        label: "Car & Motorbike"
    },
    {
        value: "Clothing & Accessories",
        label: "Clothing & Accessories"
    },
    {
        value: "Collectibles",
        label: "Collectibles"
    },
    {
        value: "Computers & Accessories",
        label: "Computers & Accessories"
    },
    {
        value: "Electronics",
        label: "Electronics"
    },
    {
        value: "Furniture",
        label: "Furniture"
    },
]


export default function AddProduct() {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const [shopName, setShopName] = useState(`${localStorage.getItem("shopName")}`);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        shopName: shopName,
        category: value
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)
        console.log(`value ${value}`)
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

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            category: value,
        }));
    }, [value]);

    return (
        <div className="container mx-auto flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-2">Add Product</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-1/2'>
                    <Input 
                        type="text" 
                        placeholder="Title" 
                        value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                            >
                            {value
                                ? categories.find((category) => category.value === value)?.label
                                : "Select Category..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                            <CommandInput placeholder="Search Category..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No Categories found.</CommandEmpty>
                                <CommandGroup>
                                {categories.map((category) => (
                                    <CommandItem
                                    key={category.value}
                                    value={category.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    >
                                    {category.label}
                                    <CheckIcon
                                        className={cn(
                                        "ml-auto h-4 w-4",
                                        value === category.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                            </Command>
                        </PopoverContent>
                        </Popover>
                    <Input
                        type="text"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <Button type="submit">Add Product</Button>
                </form>
            </div>
    )
}
'use client';
import { useState } from "react"
import { Button } from "./ui/button";
import {useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { Input } from "./ui/input";
import { Toaster, toast } from 'sonner'

export default function NewSeller() {
    const [shopName, setShopName] = useState<string | null>('');
    const [gstNo, setGSTNo] = useState<string | null>('');
    const {user} = useKindeBrowserClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            authUserId: user?.id,
            authUserEmail: user?.email,
            authUserGivenName: user?.given_name,
            authUserFamilyName: user?.family_name,
            shopName: shopName,
            gstNo: gstNo,
            registrationTime: new Date().toLocaleDateString()
        }
        const res = await fetch('/api/seller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Metadata': JSON.stringify(data)
            }
        });
        if (res.ok) {
            localStorage.setItem("shopName", `${shopName}`)
            toast.success(`${shopName} Successfully Regsitered!`);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <Toaster/>
            <h1 className="font-semibold text-2xl py-2">Want to become a seller?</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-2">
                <div>
                    <h2>Shop Name</h2>
                    <Input type="name" value={`${shopName}`} onChange={(e) => setShopName(e.target.value)} placeholder="Enter shop name" required/>
                </div>
                <div>
                    <h2>GST No</h2>
                    <Input type="name" value={`${gstNo}`}  onChange={(e) => setGSTNo(e.target.value)} placeholder="Enter GST No" required/>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
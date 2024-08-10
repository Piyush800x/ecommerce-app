'use client';
import { useState } from "react"
import { Button } from "./ui/button";
import {useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

export default function NewSeller() {
    const [shopName, setShopName] = useState<string | null>();
    const [gstNo, setGSTNo] = useState<string | null>();
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
            alert('Seller Registered!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="name" value={`${shopName}`} onChange={(e) => setShopName(e.target.value)} placeholder="Enter show name" required/>
            <input type="name" value={`${gstNo}`}  onChange={(e) => setGSTNo(e.target.value)} placeholder="Enter GST No" required/>
            <Button type="submit">Submit</Button>
        </form>
    )
}
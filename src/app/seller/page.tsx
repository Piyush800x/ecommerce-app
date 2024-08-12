'use client';
import { useCallback, useEffect, useState } from 'react';
import NewSeller from '@/components/NewSeller';
import {useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Navbar from '@/components/Navbar';
import AddProduct from '@/components/AddProduct';
import { SidebarMain } from '@/components/SidebarMain';



export default function Dashboard() {
    const {isAuthenticated, user} = useKindeBrowserClient();
    const [isSeller, setIsSeller] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(true);
    // const [shopName, setShopName] = useState(`${localStorage.getItem("shopName")}`);

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState('');



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

    if (loading) {
        return <div>Loading...</div>
    }

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
            <SidebarMain/>
            {/* <AddProduct/> */}
        </main>
    );
}

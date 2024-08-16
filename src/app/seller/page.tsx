'use client';
import { useEffect, useState } from 'react';
import NewSeller from '@/components/NewSeller';
import {useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Navbar from '@/components/Navbar';
import AddProduct from '@/components/AddProduct';
import { SidebarMain } from '@/components/SidebarMain';
import { TailSpin } from 'react-loader-spinner';
import Image from 'next/image';


export default function Dashboard() {
    const {isAuthenticated, user} = useKindeBrowserClient();
    // const [isSeller, setIsSeller] = useState<any>(() => {
    //     String(localStorage.getItem("isSeller")?.toLowerCase() === 'true') || false
    // });
    const [isSeller, setIsSeller] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    // const [shopName, setShopName] = useState(`${localStorage.getItem("shopName")}`);

    const getSeller = async () => {
        const val = localStorage.getItem("isSeller")?.toLowerCase();
        console.log(val);
        if (val == null) {
            setIsSeller(false)
        }
        else {
            setIsSeller(true)
        }
        // setIsSeller(String(localStorage.getItem("isSeller")?.toLowerCase() === 'true') || false);
    }

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
                    localStorage.setItem("shopName", data.data.shopName);
                }
            }
            setLoading(false);
        }
        
    }

    // useEffect(() => {
    //     getSeller();
    // }, [])

    useEffect(() => {
        if (isAuthenticated) {
            verifyUser();
            getSeller();
        }
        else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return (
            <main>
                <Navbar/>
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
            </main>
        )
    }

    if (!loading) {
        if (!isAuthenticated) {
            return (
                <main>
                    <Navbar/>
                    <div className='flex flex-col items-center px-5 py-5'>
                        <p className='text-3xl pb-5 font-semibold'>You must login or register to access this page.</p>
                        <Image unoptimized className='rounded-xl' src={`/gifs/annoyed.gif`} alt='annoyed' width={250} height={250}/>
                    </div>
                </main>
            )
        }
        if (!isSeller) {
            return (
                <main>
                    <Navbar/>
                    <NewSeller/>
                </main>
            )
        }
    }

    return (
        <main>
            <Navbar/>
            <SidebarMain/>
            {/* <AddProduct/> */}
        </main>
    );
}

'use client';
import { PersonIcon, EnterIcon, ExitIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Input } from "@/components/ui/input"
import { useState } from 'react'

interface SearchbarProps {
    setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Searchbar({setProducts}: SearchbarProps) {
    const [inputData, setInputData] = useState({
        name: ''
    })


    const handleSumbit = async () => {
        console.log(`inputData: ${inputData.name}`);
        const res = await fetch(`/api/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Metadata': JSON.stringify(inputData)
            },
        })
        const data = await res.json();
        setProducts(data.products)
    }

    return (
        <div className='flex gap-2 w-1/2 items-center'>
            {/* <form onSubmit={handleSumbit} className='flex gap-2 items-center w-full focus-visible:ring-blue-700 focus:ring-2'> */}
                <Input name='name' onChange={(e) => setInputData({...inputData, name: e.target.value})} className='focus-visible:ring-blue-700 focus:ring-2'  placeholder='Search for Products, Brands and More'/>
                <button onClick={handleSumbit}><MagnifyingGlassIcon className='size-8'/></button>
            {/* </form> */}
        </div>
    )
}
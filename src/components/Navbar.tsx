import Link from "next/link"
import { RegisterLink, LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

export default function Navbar() {
    return (
        <div className="flex flex-row justify-between w-full px-5 py-2">
            <h1>ECommerce Store</h1>
            <div className="flex justify-between gap-x-5">
                <Link href='/'>Home</Link>
                <Link href="/store">Store</Link>
                <Link href="/seller">Seller</Link>
            </div>
            <div className="flex gap-x-5">
                <RegisterLink>Register</RegisterLink>
                <LoginLink>Login</LoginLink>
            </div>
        </div>
    )
}
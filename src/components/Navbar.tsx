import Link from "next/link"
import { PersonIcon, EnterIcon, ExitIcon } from '@radix-ui/react-icons'
import { RegisterLink, LoginLink, useKindeBrowserClient, LogoutLink } from "@kinde-oss/kinde-auth-nextjs"

export default function Navbar() {
    const {isAuthenticated} = useKindeBrowserClient();

    return (
        <div className="sticky top-0 flex flex-row justify-between items-center w-full px-20 py-4 mb-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500">
            <h1 className='font-semibold'>ECommerce Store</h1>
            <div className="flex justify-between gap-x-5">
                <Link href='/' className="hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900">Home</Link>
                <Link href="/store" className="hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900">Store</Link>
                <Link href="/seller" className="hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900">Seller</Link>
            </div>
            <div className="flex gap-x-5">
                <div className={isAuthenticated ? "hidden" : "flex"}>
                    <div className="flex items-center gap-5">
                        <RegisterLink className="flex items-center gap-2 hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900"><PersonIcon className="size-5"/>Register</RegisterLink>
                        <LoginLink className="flex items-center gap-2 hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900"><EnterIcon className="size-5"/>Login</LoginLink>
                    </div>
                </div>
                <div className={!isAuthenticated ? "hidden" : "flex"}>
                    <LogoutLink className="flex items-center gap-2 hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900"><ExitIcon className="size-5"/>Logout</LogoutLink>
                </div>
            </div>
        </div>
    )
}
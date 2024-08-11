"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
} from "@tabler/icons-react";
import { PlusIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AddProduct from "./AddProduct"; // Import other components like EditProduct, RemoveProduct, etc.
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export function SidebarMain() {
    const [open, setOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState<any>("Dashboard");
    
    const links = [
        {
            label: "Add Product",
            href: "#",
            icon: (
                <PlusIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            component: "AddProduct"
        },
        {
            label: "Edit Product",
            href: "#",
            icon: (
                <Pencil1Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            component: "EditProduct",
        },
        {
            label: "Remove Product",
            href: "#",
            icon: (
                <TrashIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            component: "DeleteProduct",
        },
    ];

    const renderComponent = () => {
        switch (activeComponent) {
            case "AddProduct":
                return <AddProduct />;
            case "DeleteProduct":
                return <DeleteProduct/>
            case "EditProduct":
                return <EditProduct/>
            default:
                return <AddProduct />;
        }
    };

    return (
        <div
            className={cn(
                "rounded-md flex flex-col pt-4 md:flex-row w-full flex-1 border overflow-visible",
                "h-dvh" // for your use case, use `h-dvh` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={() => setActiveComponent(link.component)} // Pass onClick to handle component switching
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <Image
                                        src="/next.svg"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex-1">
                {renderComponent()} {/* Render the selected component */}
            </div>
        </div>
    );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

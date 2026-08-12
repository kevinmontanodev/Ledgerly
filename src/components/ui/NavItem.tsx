import Link from "next/link";
import { ReactNode } from "react";

export function NavItem({url, children, current}: {url:string, children: ReactNode, current:boolean}){
    return (
        <Link href={url} className={`relative p-4 py-3 rounded-full flex justify-start gap-2 sm:items-center transition-all duration-300 ${current ? 'bg-black text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}>
            {children}
        </Link>
    )
}
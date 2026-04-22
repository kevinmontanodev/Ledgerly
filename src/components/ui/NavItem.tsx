import Link from "next/link";
import { ReactNode } from "react";

export function NavItem({url, children, current}: {url:string, children: ReactNode, current:boolean}){
    return (
        <Link href={url} className={`relative p-4 rounded-full flex justify-start gap-2 sm:items-center hover:bg-zinc-50 hover:text-indigo-600 transition-all ${current ? 'bg-zinc-100 text-indigo-700' : ''}`}>
            {children}
        </Link>
    )
}
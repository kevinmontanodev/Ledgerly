'use client';

import { DashBoard } from "./icons/DashBoard";
import { NavItem } from "./ui/NavItem";
import { Transaction } from "./icons/Transaction";
import { Setting } from "./icons/Settings";
import { AccountCatalog } from "./icons/AccountCatalog";
import { Report } from "./icons/Report";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavbarMenuIcon } from "./icons/NavbarMenuIcon";
import { useCurrentProjectStore } from "@/store/useCurrentProjectStore";

const getNavItems = (projectId:string) => [
    {
        url: `/projects/${projectId}`,
        icon: <DashBoard/>,
        name: 'Dashboard'
    },
    {
        url: `/projects/${projectId}/transaction`,
        name: 'Transactions',
        icon: <Transaction/>
    },
    {
        url: `/projects/${projectId}/journal`,
        name: 'Journal',
        icon: <AccountCatalog/>
    },
    {
        url: `/projects/${projectId}/catalog`,
        name: 'Catalog',
        icon: <AccountCatalog/>
    },
    {
        url: `/projects/${projectId}report`,
        name: 'Reports',
        icon: <Report/>
    }
]

export function Navbar(){
    const [showNav, setShowNav] = useState(false)
    const ref= useRef<HTMLElement>(null)
    const params = useParams<{ projectId?: string }>()
    const pathname = usePathname()

    const storeProject = useCurrentProjectStore((state) => state.currentProject)

    const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

    useEffect(() => {
        const loadLocalState = async () => {
            setActiveProjectId(storeProject?.id || params.projectId || null)
        }

        loadLocalState()
    }, [storeProject, params.projectId])
    
    const items = activeProjectId ? getNavItems(activeProjectId) : []    

    useEffect(() => {
        const closeNav = () => {
            setShowNav(false)
        }

        closeNav()
    }, [pathname])

    useEffect(() => {
        if (!showNav) return

        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)){
                setShowNav(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showNav])

    return (
        <div className="[grid-area:aside] relative transition-all duration-300 h-screen bg-white">
            <nav className="w-auto p-2 transition-all duration-300 fixed left-0 top-0 md:relative z-50" ref={ref}>
                <h1 className="w-0 opacity-0 hidden md:w-44 md:opacity-100 md:flex text-2xl p-4 font-semibold">Ledgerly</h1>
                <div className="pt-2 pl-2.5 md:pt-0 md:pl-0">
                    
                    <button className="md:hidden text-black hover:text-indigo-700 cursor-pointer" onClick={() => setShowNav(!showNav)}>
                        <NavbarMenuIcon styles=""/>
                    </button>
                    
                    <ul className={`${showNav ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} bg-white p-2 rounded-2xl md:bg-transparent md:scale-100 md:opacity-100 origin-top-left transition-all duration-300 `}>
                        {items.map(item => (
                            <li key={item.name}>
                                <NavItem current={pathname === item.url} url={item.url}>
                                    {item.icon} 
                                    <span className="">
                                    {item.name}
                                    </span>
                                </NavItem>
                            </li>
                        ))}
                        <li className="p-4 flex gap-2">
                            <Setting/> 
                            <span className="">
                            Settings
                            </span>
                        </li>
                    </ul>
                </div>
                
            </nav>
        </div>
    )
}
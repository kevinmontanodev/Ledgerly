'use client'
import { useCurrentProjectStore } from "@/store/useCurrentProjectStore";
import { NewTransactionButton } from "./NewTransactionButton";

export function Header(){
    const currentProject = useCurrentProjectStore(state => state.currentProject)

    return (
        <header className="[grid-area:header] p-4 bg-zinc-50 flex items-center justify-between w-full md:relative z-45">
            <h2 className="sm:text-lg md:text-2xl font-semibold pl-10 md:pl-0 text-md">{currentProject?.name}</h2>
                  
            <NewTransactionButton/>                      
        </header>
    )
}
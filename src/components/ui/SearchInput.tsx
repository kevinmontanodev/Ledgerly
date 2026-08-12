'use client'

import { useEffect, useState } from "react";
import { Close } from "../icons/Close";
import { Search } from "../icons/Search";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchInput({className, placeholder, onSearch, defaultValue}:{className?:string, placeholder:string, onSearch: (param:string | null) => void, defaultValue:string | null}){
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 400)

    useEffect(() => {
        onSearch(debouncedSearch.trim() === '' ? null : debouncedSearch)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch])

    return (
        <div className={`${className} relative`}>
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600" />
            
            <input type="text" className="w-full h-full py-2 pl-10 placeholder:text-zinc-500 bg-zinc-200 rounded-lg outline-0" 
                placeholder={placeholder} 
                defaultValue={defaultValue ?? ''}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            
            <button 
                onClick={()  => setSearch('')} 
                className="cursor-pointer"
            >
                <Close className={`${search ? 'appear' : 'opacity-0 translate-y-3 transition-all duration-400'} absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600`} />
            </button>
        </div>
    )
}
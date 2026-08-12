'use client'
import { useMemo } from "react"
import { NextIcon } from "../icons/NextIcon"
import { PrevIcon } from "../icons/PrevIcon"
import { Button } from "./Button"
import { pagination } from "@/utils/pagination"

export function Paginator({currentPage, totalPages, totalItems, changePage}:{currentPage:number, totalPages: number, totalItems:number, changePage: (page: number) => void}){
    const getPaginationStats = () => {
        if (totalPages !== currentPage){
            return 10 * currentPage
        } else if (totalItems % 10 !== 0){
            const rest = totalItems % 10
            return (10 * (currentPage - 1)) + rest
        } else {
            return 10 * currentPage
        }
    }

    const visiblePages = useMemo(() => {
        return pagination(currentPage, totalPages)
    }, [currentPage, totalPages])

    return (
        <div className="pt-2 px-2 md:flex gap-1 justify-between items-center">
            <div className="text-sm text-zinc-700">
                {totalItems === 0 
                ? ('No hay registros por mostrar') 
                : (
                    <>
                        Mostrando <span className="font-black text-black"> {(10 * currentPage) - 9} - {getPaginationStats()} </span> de {totalItems}
                    </>
                )}
            </div>
            <div className="flex justify-center gap-1.5 py-1">
                <Button
                    variant="CLEAN"
                    className="px-1 py-1 hover:bg-zinc-100 rounded-md"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                >
                    <PrevIcon/>
                </Button>
                
                {visiblePages.map((item, index) => {
                    if (item.type === 'ellipsis') return <span key={`elipsis-${index}`} className="flex items-end px-1">...</span>

                    const variant = currentPage === item.value ? 'PRIMARY' : 'SECONDARY'
                
                    return <Button 
                        className="px-2.5 py-1 rounded-md"
                        onClick={() => {
                            if (item.value === currentPage) return
                            changePage(item.value)
                        }}
                        variant={variant} key={`page-${item.value}`}>{item.value}</Button>
                })}
                        
                <Button 
                    variant="CLEAN"
                    className="px-1 py-1 hover:bg-zinc-100 rounded-md"
                    disabled={currentPage === totalPages}
                    onClick={() => changePage(currentPage + 1)}
                >
                    <NextIcon/>
                </Button>
            </div>
        </div>
    )
}
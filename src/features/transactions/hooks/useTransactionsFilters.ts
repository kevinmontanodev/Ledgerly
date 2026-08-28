import { useState } from "react"

export interface Filters  {
    year: number | null,
    month: number | null,
    search: string | null,
    category: string | null
}

export const useTransactionsFilters = () => {
    const [filters,setFilters] = useState<Filters>({
        year: new Date().getFullYear(),
        month: null,
        search: null,
        category: null,
    })
    const [currentPage, setCurrentPage] = useState(1)

    const changeFilter = (newFilter: Partial<Filters>) => {
        const next = {
            ...filters,
            ...newFilter
        }
            
        if (JSON.stringify(filters) === JSON.stringify(next)){
            return
        }

        setCurrentPage(1)
        setFilters(next)        
    }

    const resetPagination = () => {
        setCurrentPage(1)
    }

    const clearFilters = () => {
        resetPagination()
        setFilters({ year: new Date().getFullYear(), month: null, search: null, category: null });
    };

    const goToPage = (page:number) => {
        setCurrentPage(page)
    }

    return {
        changeFilter,
        clearFilters,
        currentFilters: filters,
        currentPage,
        goToPage
    }
}
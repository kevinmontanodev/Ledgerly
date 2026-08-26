import { useState } from "react";

export type typeAccountFilter = 'all' | 'Pasivo' | 'Activo' | 'Ingreso' | 'Gasto' | 'Patrimonio'

export interface AccountFilters {
    type?: typeAccountFilter,
    search?: string
}

export const useAccountFilters = () => {
    const [filters, setFilters] = useState<AccountFilters>() 
    const [currentPage, setCurrentPage] = useState(1)


    const changeFilter = (newFilter: Partial<AccountFilters>) => {
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

    const goTo = (page: number) => {
        setCurrentPage(page)
    }

    const clearFilters = () => {
        setFilters({})
    }

    return {
        changeFilter,
        filters,
        currentPage,
        goTo,
        clearFilters
    }

} 
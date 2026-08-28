'use client'

import { TransactionTable } from "./TransactionTable";
import { PaginationData } from "@/features/journal/interfaces/interfaces";
import { useEffect, useState } from "react";
import { useTransactionsFilters } from "../hooks/useTransactionsFilters";
import { SearchInput } from "@/components/ui/SearchInput";
import { Paginator } from "@/components/ui/Pagination";
import { getJournalTransactionsPaginated } from "@/server/actions/journal.actions";
import { useCurrentProjectStore } from "@/store/useCurrentProjectStore";
import { CategoryDTO } from "@/server/dto/transaction.dto";
import { TransactionCategorySelect } from "./TransactionCategorySelect";

export function TransactionsManagerContainer({paginatedData, transactionCategories}:{paginatedData:PaginationData, transactionCategories:CategoryDTO[]}){
    const [paginated, setPaginated] = useState(paginatedData)
    const {currentFilters, currentPage, changeFilter, goToPage} = useTransactionsFilters()
    const {currentProject} = useCurrentProjectStore()
    
    useEffect(() => {
        if (!currentProject) return

        const updateDate = async () => {
            const newData = await getJournalTransactionsPaginated({projectId: currentProject.id, page: currentPage, search: currentFilters.search ?? undefined, categoryId: currentFilters.category ?? undefined})
            setPaginated(newData)
        }

        updateDate()
    }, [currentFilters.search, currentFilters.category, currentPage, currentProject])
    
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 relative">
               <SearchInput defaultValue={currentFilters.search}
               placeholder="Buscar por titulo o  descripcion"
               className="col-span-2"
               onSearch={(search) => changeFilter({search})} />
                    
                <TransactionCategorySelect
                    categories={transactionCategories}
                    currentCategoryId={currentFilters.category}
                    changeFilter={changeFilter}
                />
            </div>

            <Paginator 
                currentPage={currentPage}
                totalItems={paginated.totalItems}
                totalPages={paginated.totalPages}
                changePage={goToPage}
             />

            <TransactionTable transactionsPaginationData={paginated} />
        </>
    )
}
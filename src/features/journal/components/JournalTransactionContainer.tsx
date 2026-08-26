'use client'

import { SearchInput } from "@/components/ui/SearchInput"
import { useEffect, useMemo, useState } from "react"
import { SelectItems } from "@/shared/shared"
import { useCurrentProjectStore } from "@/store/useCurrentProjectStore"
import { useTransactionStore } from "@/features/transactions/store/transaction.store"
import { useTransactionsFilters } from "@/features/transactions/hooks/useTransactionsFilters"
import { getJournalTransactionsPaginated } from "@/server/actions/journal.actions"
import { Paginator } from "@/components/ui/Pagination"
import { MONTHS } from "../utils/const"
import { JournalTransactionsContainerProps, PaginationData } from "../interfaces/interfaces"
import { CurrentPageTotals } from "./CurrentPageTotals"
import { JournalTable } from "./JournalTable"
import { JournalFiltersPanel } from "./JournalFiltersPanel"

export function JournalTransactionsContainer({periods, paginated, transactionCategories}:JournalTransactionsContainerProps){
    const [paginationData, setPaginationData] = useState<PaginationData>(paginated)
    const {loadTransactions, transactions} = useTransactionStore()
    const {currentFilters, changeFilter, clearFilters, currentPage, goToPage} = useTransactionsFilters()
    const project = useCurrentProjectStore(state => state.currentProject)
    const [availableDates] = useState<Record<number, number[]>>(periods)
    
    useEffect(() => {
        loadTransactions(paginationData.transactions)
    }, [loadTransactions, paginationData.transactions])

    const availableYears : SelectItems[] = useMemo(() => {
        return Object.keys(availableDates).map(year => {
                return {id: year, label: year}
            }
        )
    }, [availableDates])

    const availableMonths = useMemo(() => {
        if (!currentFilters.year) return

        return availableDates[currentFilters.year].map(month => {
            return {id:month.toString(), label: MONTHS[month]}
        })
    }, [availableDates, currentFilters.year])

    const selectCategories : SelectItems[] = useMemo(() => {
        return transactionCategories.map((c) => ({
            id: c.id,
            label: c.name
        }))
    }, [transactionCategories])

    useEffect(() => {
        const getTransactions = async () => {
            if (!project) return
            const {month, year, search, category} = currentFilters

            const paginatedData = await getJournalTransactionsPaginated({
                projectId: project.id,
                month: month ?? undefined,
                year: year ?? undefined,
                search: search ?? undefined,
                categoryId: category ?? undefined,
                page: currentPage
            })

            setPaginationData(paginatedData)
            loadTransactions(paginatedData.transactions)
        }

        getTransactions()
    }, [currentFilters, project, currentPage, loadTransactions])

    return (
        <div className="relative">
            <div className="sticky -top-6 z-50 bg-zinc-50 p-4 rounded-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <SearchInput className="col-span-2 md:col-span-1" placeholder="Buscar por titulo o descripcion"
                        onSearch={(param) => changeFilter({ search: param })}
                        defaultValue={currentFilters.search}
                    />

                    <JournalFiltersPanel
                        currentFilters={currentFilters}
                        changeFilter={changeFilter}
                        clearFilters={clearFilters}
                        selectCategories={selectCategories}
                        availableMonths={availableMonths}
                        availableYears={availableYears}
                    />

                </div>

                <Paginator currentPage={currentPage} totalItems={paginationData.totalItems} totalPages={paginationData.totalPages} changePage={goToPage} />
            </div>

            <JournalTable transactions={transactions} />

            <CurrentPageTotals filteredTransactions={paginationData.transactions} />
        </div>
    )
}
import { CategoryDTO, TransactionDTO } from "@/server/dto/transaction.dto"

// data
export interface PaginationData {
    transactions: TransactionDTO[]
    totalPages: number
    totalItems: number
}


// components props
export interface JournalTransactionsContainerProps {
    paginated: PaginationData
    periods: Record<number, number[]>
    transactionCategories: CategoryDTO[]
}
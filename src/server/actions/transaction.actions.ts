"use server"

import { TransactionDraft } from "@/features/transactions/store/transaction.store";
import { transactionService } from "../container";

export async function  getTransactionsByProjectId(projectId:string) {
    return await transactionService.getTransactions({projectId})
}

export async function saveTransaction(transaction: TransactionDraft[]) {
    return await transactionService.saveTransaction(transaction)
}

export async function getTransactionCategories(){
    return await transactionService.getTransactionCategories()
}

export async function getTransactionsPaginated(
    {projectId, page, year, month, categoryId, search}:
    {
        projectId:string,
        page: number
        year?: number
        month?:number
        categoryId?:string,
        search?:string
    }
) {
    return await transactionService.getPaginatedTransactions({projectId, page, year, month, categoryId, search})
}
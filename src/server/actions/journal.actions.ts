'use server'
import { transactionService } from "../container";

export async function getJournalAvailableDates(projectId:string) {
    return await transactionService.getAvailablePeriods(projectId)
}

export async function getCreditAndDebitTotalByYear(projectId:string, year?:number) {
    return await transactionService.getYearCreditAndDebit(projectId, year)
}

export async function getJournalTransactionsPaginated(
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
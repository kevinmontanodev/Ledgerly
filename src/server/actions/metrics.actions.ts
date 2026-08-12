'use server'
import { transactionService } from "../container/index"

export async function getCapitalMetrics(projectId:string) {
    return await transactionService.getTotalCapital(projectId)
}
import { TransactionDraft } from "@/features/transactions/store/transaction.store"
import { TransactionRecord } from "../repositories/records/payload.records"
import { EntryDTO, TransactionCategoryDTO, TransactionDTO } from "../dto/transaction.dto"
import { ITransactionRepository } from "../interfaces/repositories"
import { RawEntry } from "../types/transaction.types"

export class TransactionService {
    constructor(private readonly repository: ITransactionRepository){}

    // get transacction with pagination
    async getPaginatedTransactions({ projectId, page, year , month, search, categoryId }:{ projectId:string, page: number,  year?: number, month?: number, search?: string, categoryId?: string}){
        let startDate : Date | undefined = undefined
        let endDate : Date | undefined = undefined

        if (year && month){
            startDate = new Date(year, month - 1, 1)
            endDate = new Date(year, month, 1)
        } else if (year){
            startDate = new Date(year, 0, 1)
            endDate = new Date(year + 1, 0, 1)
        }

        const paginatedData = await this.repository.getPaginateTransactions({
            page,
            pageSize: 10,
            projectId: projectId,
            startDate,
            endDate,
            search,
            categoryId
        })

        return {
            transactions: this.toTransactionDTOArray(paginatedData.transactions),
            totalPages:paginatedData.totalPages,
            totalItems: paginatedData.totalItems
        }
    }

    async getTransactionCategories () : Promise<TransactionCategoryDTO[]> {
        return this.repository.getCategories()
    }

    async saveTransaction (transactions: TransactionDraft[]) {
        const {fail, failsIds} = this.checkDoublePartide(transactions)

        if (fail && failsIds.length > 0){
            return failsIds
        }

        const transactionsToSave = this.toTransactionData(transactions)

        return this.toTransactionDTOArray(await this.repository.saveMany(transactionsToSave))
    }

    // get actual project capital
    // todo: improve function typing
    async getTotalCapital(projectId: string){
        let totalActive = 0
        let totalPasive = 0

        const transactions = await this.repository.findAllByProject(projectId)

        if (transactions.length > 0){
            transactions.forEach(t => {
                t.entries.forEach(e => {
                    if (e.account.code.startsWith("1")) {
                        totalActive += e.amount.toNumber()
                    } else if (e.account.code.startsWith("2")){
                        totalPasive += e.amount.toNumber()
                    }
                })
            })
        }
        
        return {
            active: totalActive,
            pasive: totalPasive,
            capital: totalActive - totalPasive
        }
    }

    async getTransactions ({projectId}:{projectId:string}) {
        return this.toTransactionDTOArray(await this.repository.findAllByProject(projectId))
    }

    // get current year balance
    async getYearCreditAndDebit (projectId:string, year?: number){
        const currentYear = year ?? new Date().getFullYear()
    
        return await this.repository.getYearBalance({projectId, year: currentYear})
    }
    
    // return years with respective months, (just dates with transacctions)
    async getAvailablePeriods(projectId:string){
        const dates = await this.repository.getAvaiableDates(projectId)
        if (!dates) return {}
    
        const periods: Record<number, number[]> = {}
            
            for (const {date} of dates){
                const year = date.getFullYear()
                const month = date.getMonth() + 1
    
                if (!periods[year]){
                    periods[year] = []
                }
    
                if (!periods[year].includes(month)){
                    periods[year].push(month)
                }
            }
    
            return periods
        }

    private toTransactionData(transactions: TransactionDraft[]){
        return transactions.map(tx => ({
            ...tx,
            date: new Date(`${tx.date}T12:00:00`)
        }))
    }

    private toEntryDTO(entries: RawEntry[]) : EntryDTO[] {
        return entries.map(en => ({
            id: en.id,
            accountId: en.accountId,
            amount: Number(en.amount),
            transactionId: en.transactionId,
            type: en.type,
            accountName: en.account.name
        }))
    }

    private toTransactionDTO(tx: TransactionRecord) : TransactionDTO {
        const entriesDTO = this.toEntryDTO(tx.entries)

        return {
            id: tx.id,
            title: tx.title,
            description: tx.description ?? undefined,
            date: tx.date,
            category: tx.category,
            projectId: tx.projectId,
            entries: entriesDTO
        }
    }

    private toTransactionDTOArray(transactions: TransactionRecord[]){
        return transactions.map(tx => this.toTransactionDTO(tx))
    }

    // validate the  Double Partide
    private checkDoublePartide(tx: TransactionDraft[]){
        let fail = false
        const failsIds : string[] = []

        tx.forEach(tx => {
            const {entries} = tx
            // validate equity
            const totalDebit = entries
                .filter(e => e.type === "DEBIT")
                .reduce((sum, e) => sum + e.amount, 0)

            const totalCredit = entries
                .filter(e => e.type === "CREDIT")
                .reduce((sum, e) => sum + e.amount, 0)

            if (totalDebit !== totalCredit) {
                fail = true
                failsIds.push(tx.id)
                throw new Error("La transacción no está balanceada")
            }

            if (entries.length < 2) {
                fail = true
                failsIds.push(tx.id)
                throw new Error("Debe haber al menos dos entradas")
            }
        })

        return {fail, failsIds}
    } 

    

}
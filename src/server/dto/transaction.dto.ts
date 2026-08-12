export interface TransactionDTO {
    id: string
    title: string
    date: Date
    description? : string
    projectId:string,
    entries: EntryDTO[]
    category: CategoryDTO | null
}

export interface TransactionCategoryDTO {
    id: string,
    name: string
}

export interface CategoryDTO {
    id:string, 
    name: string
}

export interface EntryDTO {
    id: string,
    transactionId: string,
    type: EntryType
    amount: number,
    accountId: string,
    accountName?:string
}

export type EntryType = "CREDIT" | "DEBIT"
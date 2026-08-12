import { Decimal } from "@prisma/client/runtime/index-browser"
import { EntryType } from "../../../generated/prisma/enums"

export interface TransactionServer {
    id: string
    description: string
    date: Date
    projectId: string,
    categoryId:string
    userId:string
    entries: EntryServer[]
}

export interface EntryServer {
    id : string
    transactionId: string
    accountId: string
    type : EntryType
    amount: number
}

export interface SmallAcount {
    name: string
    code: string
}

export interface RawEntry {
    id: string,
    amount: Decimal,
    type: EntryType,
    accountId: string,
    transactionId: string,
    account: SmallAcount
}

export interface CapitalBalance {
    pasive: number,
    active: number,
    capital: number
}

export interface TransactionData {
  id: string
  title: string
  categoryId: string
  description?: string
  date: Date
  entries: EntryServer[]
  projectId:string
}

import { AccountNature } from "@/server/dto/account.dto"
import { Prisma } from "../../../../generated/prisma/client"

// accounts
export const accountSelect = {
        id: true,
        name: true,
        code: true,
        description: true,
        systemKey:true,
        accountTypeId: true,
        source: true,
        projectId: true,
        accountType: {
            select: {
                name: true,
                code: true,
                nature: true,
            }
        }
    
}

export const accountSelectOption = {
    id: true,
    name: true,
    accountType: {
        select: {
            code: true,
            name: true,
            nature: true
        }
    }
}

export type AccountRecord = Prisma.AccountGetPayload<{
    select: typeof accountSelect
}>

export type AccountSelectOptionRecord = Prisma.AccountGetPayload<{
    select: typeof accountSelectOption
}>

export interface SelectOptionAccount {
    id:string,
    name: string,
    typeName: string,
    nature: AccountNature
}

// projects
export const projectSelect = {
    id:true,
    name: true,
    description: true,
    userId: true,
} as const

// transactions
export const transactionSelect = {
    id: true,
    title: true,
    description: true,
    date: true,
    projectId: true,
    entries: {
        select: {
            id: true,
            amount: true,
            type: true,
            accountId: true,
            transactionId: true,
            account: {
                select: {
                    name: true,
                    code: true,
                }
            }
        }
    },
    category: {
        select: {
            id: true,
            name: true,
        }
    }
} as const

export type TransactionRecord = Prisma.TransactionGetPayload<{
    select: typeof transactionSelect
}>

// user
export const userSelect = {
    id:true,
    name:true,
    email:true,
    image: true
}

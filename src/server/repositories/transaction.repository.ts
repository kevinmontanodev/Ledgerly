import {prisma} from "@/lib/prisma"
import { GetTransactionsArgs, ITransactionRepository } from "../interfaces/repositories"
import { TransactionRecord, transactionSelect } from "./records/payload.records"
import { TransactionData } from "../types/transaction.types";

export class TransactionRepository implements ITransactionRepository {
    async getCategories () {
        return prisma.transactionCategory.findMany({
            select: {
                id: true,
                name: true
            }
        });
    }

    async saveMany (transactions : TransactionData[]) {
 
        return prisma.$transaction(async (tx) => {
            const results : TransactionRecord[] = []

            for (const data of transactions){
                const {id, title, description, projectId, entries, categoryId, date} = data

                const existing = await tx.transaction.findUnique({
                    where: {id},
                    include: {
                        entries: true
                    }
                })

                if (!existing) {
                    const created = await tx.transaction.create({
                        data: {id, title, description, date, projectId, categoryId,
                            entries : {
                                create: entries.map(entry => ({
                                    id: entry.id,
                                    accountId: entry.accountId,
                                    type: entry.type,
                                    amount: entry.amount
                                }))
                            }
                        },
                        select: transactionSelect
                    })

                    results.push(created)

                    continue
                }
        
                await tx.transaction.update({
                    where: {id},
                    data: {
                        title,
                        description,
                        date,
                        projectId,
                        categoryId
                    }
                })

                const incomingIds = entries.map(e => e.id)

                await tx.entry.deleteMany({
                    where: {
                        transactionId: id,
                        id: {
                            notIn: incomingIds
                        }
                    }
                })

                for (const entry of entries){
                    await tx.entry.upsert({
                        where: {id: entry.id},

                        update: {
                            accountId: entry.accountId,
                            amount: entry.amount,
                            type: entry.type,
                        },

                        create: {
                            id: entry.id,
                            accountId: entry.accountId,
                            amount: entry.amount,
                            transactionId: entry.transactionId,
                            type: entry.type
                        }
                    })
                }

                const updated = await tx.transaction.findUnique({
                    where: {id},
                    select: transactionSelect
                })

                if (updated)
                results.push(updated)
            }

            return JSON.parse(JSON.stringify(results))
        })
    }

    async findAllByProject (projectId: string) {
        return await prisma.transaction.findMany({
            where: { projectId },
            select: transactionSelect,
            orderBy: { date: "desc" }
        })
    }

    async getAvaiableDates (projectId:string) {
        return await prisma.transaction.findMany({
            where: {
                projectId
            },
            select: {
                date: true
            }
        })
    }

    async getYearBalance({projectId, year}:{projectId:string,year:number}){
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1)

        const creditResult = await prisma.entry.aggregate({
            where: {
                transaction: {
                    projectId
                },
                createdAt: {
                    gte: startDate,
                    lt: endDate
                },
                type: 'CREDIT'
            },
            _sum: {
                amount: true
            }
        })

        const debitResult = await prisma.entry.aggregate({
            where: {
                transaction: {
                    projectId
                },
                createdAt: {
                    gte: startDate,
                    lt: endDate
                },
                type: 'DEBIT'
            },
            _sum: {
                amount: true
            }
        })

        return {credit: Number(creditResult._sum.amount) || 0, debit: Number(debitResult._sum.amount) || 0}
    }

    async getPaginateTransactions({page, pageSize, projectId, startDate, endDate, categoryId, search}: GetTransactionsArgs) {
        const skip = (page - 1) * pageSize

        const whereClause = {
            projectId,
            date: {
                gte: startDate,
                lt: endDate
            },
            categoryId: categoryId,
            ...(search ? {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } }
                ]
            }: {})
        }

        const totalItems = await prisma.transaction.count({
            where: whereClause
        })

        const totalPages = Math.ceil(totalItems / pageSize)

        const transactions = await prisma.transaction.findMany({
            where: whereClause,
            skip,
            take: pageSize,
            orderBy: {
                date: 'desc'
            },
            select: transactionSelect
        })

        return {transactions, totalPages, totalItems}
    }
}




import {prisma} from "@/lib/prisma"
import { AccountDTO } from "../dto/account.dto"
import { GetAccountsArgs, IAccountRepository } from "../interfaces/repositories"
import { accountSelect, accountSelectOption } from "./records/payload.records"

export class AccountRepository implements IAccountRepository {
    constructor(){}

    async save (accountData: AccountDTO) {
        const account = await prisma.account.findUnique({
            where: {id: accountData.id}
        })

        if (account) {
            return prisma.account.update({
                data: accountData,
                where: {id: account.id, projectId: accountData.projectId},
                select: accountSelect
            })
        } else {
            return prisma.account.create({data: accountData, select: accountSelect})
        }
    }

    async findById (id: string) {
        return prisma.account.findUnique({
            where: { id },
            select: accountSelect
        })
    }

    async findAllByProject (projectId: string) {
        return await prisma.account.findMany({
            where: { projectId },
            select: accountSelect
        })
    }

    async getSelectOptionAccounts (projectId:string) {
        return await prisma.account.findMany({
            where: {projectId: projectId},
            select: accountSelectOption
        })
    }

    async findAllProjectAccounts(projectId:string){
        return await prisma.account.findMany({
            where: {
                projectId
            },
            select: accountSelect
        })
    }

    async findAllBaseAccount () {
        return await prisma.account.findMany({
            where: { source: 'SYSTEM' },
            select: accountSelect
        })
    }

    async getPaginateAccounts({page, pageSize, projectId, accountTypeName, search}: GetAccountsArgs) {
            const skip = (page - 1) * pageSize

            const andConditions : any[] = []

            if (accountTypeName){
                andConditions.push({
                    accountType: {
                        name: accountTypeName
                    }
                })
            }

            if (search) {
                andConditions.push({
                    OR: [
                        { name: { contains: search } }, 
                        { code: { contains: search } } 
                    ]
                })
            }

            andConditions.push(
                    {
                        AND: [
                            { projectId: projectId }
                        ]
                    }
            )
    
            const whereClause = {
                AND : andConditions
            }
    
            const totalItems = await prisma.account.count({
                where: whereClause
            })
    
            const totalPages = Math.ceil(totalItems / pageSize)
    
            const accounts = await prisma.account.findMany({
                where: whereClause,
                skip,
                take: pageSize,
                select: accountSelect
            })
    
            return {accounts, totalPages, totalItems}
    }

    async getAllAccountTypes () {
        return (await prisma.accountType.findMany()).map(acc => ({
            id: acc.id,
            name: acc.name,
            nature: acc.nature
        }))
    }
}
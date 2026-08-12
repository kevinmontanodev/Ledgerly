"use server"
import { AccountDTO } from "../dto/account.dto"
import { accountService } from "../container"

export async function getAccountsPaginatedData(projectId:string,page:number, pageSize?:number, accountTypeName?:string, search?:string) {
    return await accountService.getPaginatedAccounts({projectId, page, pageSize, accountTypeName, search})
}

export async function getAccountTypes() {
    return await accountService.getAccountTypes()
}

export async function saveAccount(accountData:AccountDTO) {
    return await accountService.saveAccount(accountData)
}

export async function getSelectOptions(projectId:string) {
    return await accountService.getSelectOptionAccounts(projectId)
}
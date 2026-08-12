import { AccountDTO } from "../dto/account.dto"
import { IAccountRepository } from "../interfaces/repositories"
import { AccountRecord, AccountSelectOptionRecord, SelectOptionAccount } from "../repositories/records/payload.records" 

export class AccountService {
    constructor(private readonly repository: IAccountRepository){}

    async saveAccount(accountData: AccountDTO) {
        return this.toAccountDTO(await this.repository.save(accountData))
    }

    async getAccounts(projectId:string) {
        return this.toAccountDTOArray(await this.repository.findAllProjectAccounts(projectId))
    }

    async getPaginatedAccounts({projectId, page, pageSize=12, accountTypeName, search}:{projectId:string,page:number, pageSize?:number, accountTypeName?:string, search?:string}){
        const paginatedResponse = await this.repository.getPaginateAccounts({projectId, page, pageSize, accountTypeName, search})

        return {
            ...paginatedResponse,
            accounts: this.toAccountDTOArray(paginatedResponse.accounts),
        }
    }

    async getSelectOptionAccounts(projectId:string) {
        return this.toAccountSelectOptionDTOArray(await this.repository.getSelectOptionAccounts(projectId))
    }

    async getAccountTypes() {
        return this.repository.getAllAccountTypes()
    }

    private toAccountSelectOptionDTO(account: AccountSelectOptionRecord): SelectOptionAccount {
        return {
            id: account.id,
            name: account.name,
            typeName: account.accountType.name,
            nature: account.accountType.nature
        }
    }

    private toAccountDTO(account: AccountRecord): AccountDTO {
        return {
            id: account.id,
            name: account.name,
            description: account.description,
            code: account.code,
            source: account.source,
            systemKey: account.systemKey,
            accountTypeId: account.accountTypeId,
            nature: account.accountType.nature,
            typeName: account.accountType.name,
            projectId: account.projectId
        }
    }

    private toAccountDTOArray(accounts: AccountRecord[]) : AccountDTO[] {
        return accounts.map(acc => this.toAccountDTO(acc))
    }

    private toAccountSelectOptionDTOArray(accounts: AccountSelectOptionRecord[]) : SelectOptionAccount[] {
        return accounts.map(acc => this.toAccountSelectOptionDTO(acc))
    }
}
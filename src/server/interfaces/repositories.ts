import { AccountDTO, AccountTypeDTO } from "../dto/account.dto";
import { AccountRecord, AccountSelectOptionRecord } from "../repositories/account.repository";;
import { TransactionData, TransactionRecord } from "../repositories/transaction.repository";
import { ProjectDTO } from "../types/project.types";
import { TransactionCategoryDTO } from "../types/transaction.types";
import { NewUserDTO, UserDTO } from "../types/user.types";

//  Repositories interfaces
export interface IAccountRepository {
    save (accountData: AccountDTO): Promise<AccountRecord>
    findById (id: string) : Promise<AccountRecord | null>
    findAllByProject (projectId: string) : Promise<AccountRecord[]>
    findAllBaseAccount() : Promise<AccountRecord[]>
    getAllAccountTypes() : Promise<AccountTypeDTO[]>
    findAllProjectAccounts(projectId:string) : Promise<AccountRecord[]>
    getSelectOptionAccounts (projectId:string) : Promise<AccountSelectOptionRecord[]>
    getPaginateAccounts({page, pageSize, projectId, accountTypeName, search}: GetAccountsArgs) : Promise<PaginatedAccountResponse>
}

export interface ITransactionRepository {
    getCategories: () => Promise<TransactionCategoryDTO[]>
    saveMany: (transactions: TransactionData[]) => Promise<TransactionRecord[]>
    findAllByProject: (projectId: string) => Promise<TransactionRecord[]>
     getAvaiableDates: (projectId: string) => Promise<{
    date: Date;
}[]>
getPaginateTransactions(args: GetTransactionsArgs): Promise<PaginatedResponse>
    getYearBalance({projectId, year}:{projectId:string,year:number}) : Promise<{credit : number, debit: number}>
}

export interface IProjectRepository {
    findById: (id: string) => Promise<ProjectDTO | null>
    findAllByUserId: (userId: string) => Promise<ProjectDTO[]>
    save: (projectData: ProjectDTO) => Promise<ProjectDTO>
    deleteProject: (projectId: string, userId:string) => Promise<ProjectDTO>
}

export interface IUserRepository {
    findByEmail: (email:string) => Promise<UserDTO | null>
    save:(userData:UserDTO | NewUserDTO) => Promise<UserDTO | undefined>
}

// methods props
export interface GetTransactionsArgs {
  projectId: string;
  startDate?: Date;
  endDate?: Date;
  page: number;
  pageSize: number;
  search?: string;
  categoryId?: string;
}

export interface GetAccountsArgs {
  projectId: string;
  page: number;
  pageSize: number;
  search?: string;
  accountTypeName?: string;
}

export interface PaginatedAccountResponse {
    accounts: AccountRecord[]
    totalPages: number,
    totalItems: number
}

export interface PaginatedResponse {
  transactions: TransactionRecord[];
  totalPages: number;
  totalItems: number
}

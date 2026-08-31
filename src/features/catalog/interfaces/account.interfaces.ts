import { AccountDTO } from "@/server/dto/account.dto";

export interface PaginatedResponse {
    totalPages: number,
    totalItems: number,
    accounts: AccountDTO[]
}
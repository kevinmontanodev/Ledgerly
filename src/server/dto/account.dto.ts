import { AccountSource, SystemAccountKey } from "../../../generated/prisma/enums"

export interface AccountDTO {
    id: string
    name: string
    accountTypeId:string,
    systemKey: SystemAccountKey | null
    typeName: string
    nature: AccountNature
    code: string
    description?: string | null
    source: AccountSource,
    projectId:string
}

export type AccountNature = "DEBIT" | "CREDIT"


export interface AccountTypeDTO {
    id: string,
    name: string;
    nature: AccountNature;
}
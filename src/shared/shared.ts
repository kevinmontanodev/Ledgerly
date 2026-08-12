import { SelectOptionAccount } from "@/server/repositories/records/payload.records";

export interface SelectItems {
    id: string
    label:string
    icon?:string
}


export interface PrettySelectProps {
    onSelect: (id: string) => void;
    selectItems: SelectItems[];
    value: string | undefined;
    className?: string;
    itemsStyle?: string
    placeHolder?:string
    disable?: boolean
}

export interface SearchableAccountSelectProps {
    value: string,
    className?: string,
    accounts: SelectOptionAccount[]
    onChange: (id: string, name: string) => void
}
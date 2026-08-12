import { CategoryConfig } from "@/utils/TransactionCategoryIcons"
import { AccountTypesConfig } from "@/utils/AccountTypeIcons"

export function CategoryIcon ({categoryName, className, accountIcons}: {categoryName: string, className?:string, accountIcons?:boolean}) {
    const config = accountIcons ?
    AccountTypesConfig[categoryName] || AccountTypesConfig['Default']
    : CategoryConfig[categoryName] || CategoryConfig["Default"]
    const Icon = config.icon 

    return (
        <div className={`${className} ${config.colorClass} `}>
            <Icon />
        </div>
    )
}
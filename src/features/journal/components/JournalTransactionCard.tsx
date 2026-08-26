import { CardWrapper } from "@/components/ui/CardWrapper";
import { formatAmount } from "@/utils/amountFormatter";
import { TransactionDTO } from "@/server/dto/transaction.dto";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { formaterDateToShortString } from "@/utils/formatDateToShortString";
import { CategoryConfig } from "@/utils/transactionCategoryIcons";

export function JournalTransactionCard({transaction}: {transaction: TransactionDTO}){
    const config = CategoryConfig[transaction.category?.name ?? 'Default']

    const orderedEntries = [...transaction.entries].sort((a,b) => {
        if (a.type === 'CREDIT' && b.type === 'DEBIT') return -1
        if (a.type === 'DEBIT' && b.type === 'CREDIT') return 1
        return 0
    })

    return (
        <CardWrapper styles="relative w-full h-full">
            <div className="flex gap-4 items-start px-4 py-3">
                <CategoryIcon className="p-3 rounded-2xl" categoryName={transaction.category?.name ?? ''} />
        
                <div className="flex-1">
                    <div className="flex justify-between items-start gap-1">
                        <div className="flex flex-col gap-1 w-4/5">
                            <p className="font-semibold text-xs lg:text-sm uppercase">
                                {transaction.title}
                                <span className={`${config?.colorClass ?? 'text-slate-500 bg-slate-500/10'} ml-2 lowercase p-1 px-2 text-xs rounded-2xl font-semibold hidden lg:inline`}>
                                    {transaction.category?.name}
                                </span>
                            </p>
                            <p className="text-xs text-zinc-500 hidden lg:block">
                                {transaction.description}
                            </p>
                        </div>
                
                        <span className="text-xs text-zinc-500 font-semibold">
                           {formaterDateToShortString(transaction.date)}
                        </span>
                    </div>
        
                    <div className="mt-2">
                        {orderedEntries.map(entry => {
                            return (
                                <div key={entry.id} className={`flex text-xs lg:text-sm justify-between ${entry.type === "CREDIT" ? 'text-zinc-500' : ''}`}>
                                    <span className={`${entry.type === "DEBIT" ? 'text-zinc-800' : 'pl-4'}`}>{entry.accountName}</span>
                                    <span className="font-medium">{formatAmount(entry.amount)}</span>
                                </div>

                            )
                        })}        
                    </div>
                </div>
            </div>
        </CardWrapper>
    )
}
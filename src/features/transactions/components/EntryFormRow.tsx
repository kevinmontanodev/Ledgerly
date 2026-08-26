import { EntryDraft } from "@/features/transactions/store/transaction.store"
import { SearchableAccountSelect } from "@/components/ui/SearchableAccountSelect"
import { Delete } from "@/components/icons/Delete"
import { Dollar } from "@/components/icons/Dollar"
import { PrettySelect } from "@/components/ui/PrettySelect"
import { useMemo } from "react"
import { CategoryIcon } from "@/components/ui/CategoryIcon"
import { useAccountOptionStore } from "@/features/catalog/store/account.select.store"
import { SelectOptionAccount } from "@/server/repositories/records/payload.records"

interface EntryFormRowProps {
    entry: EntryDraft
    remove: (id: string) => void
    update: (id: string, data: Partial<EntryDraft>) => void
}

export type EntryRowAction = 'increase' | 'decrease'

export function EntryFormRow ({entry, update, remove}: EntryFormRowProps) {
    const {options} = useAccountOptionStore()

    const checkAccountNature = (actionType : EntryRowAction, account : SelectOptionAccount | undefined) => {
        if (!account) return

        const isIncrease = actionType === 'increase'

        if (account.nature === 'DEBIT'){
            return isIncrease ? 'DEBIT' : 'CREDIT'
        } else {
            return isIncrease ? 'CREDIT' : 'DEBIT'
        }
    }

    const account = useMemo(() => {
        return options.find((a) => a.id === entry.accountId)
    }, [entry, options])

  return (
    <div className={`flex justify-between w-full ${entry.type === "DEBIT" ? 'bg-indigo-400/20' : 'bg-indigo-400/10'} transition-colors p-2 px-0 md:px-2 rounded-2xl items-center`} id={`${entry.id}`}>
        <div className="flex items-center gap-0.5">
            <CategoryIcon categoryName={account?.typeName ?? ''} className="bg-white p-1 rounded-xl w-0 opacity-0 md:w-auto md:opacity-100 transition-all duration-400" accountIcons />
            
            <div>
              <SearchableAccountSelect 
                className="w-30 md:w-38 text-xs"
                accounts={options}
                value={entry.accountId} 
                onChange={(id, name) => {
                    console.log('selected: ', id, name)
                    update(entry.id, {accountId: id, accountName: name})
                }} />
            </div>

            
            <PrettySelect
                selectItems={[{label: "Aumenta", id: "increase"}, {label: "Disminuye", id: "decrease"}]}
                onSelect={(id) => {
                    const action = checkAccountNature(id as 'increase' | 'decrease', account)
                    
                    if (!action) return

                    update(entry.id, {
                        type: action
                    })
                }}
                value={
                    account && entry.type 
                    ? (entry.type === account.nature ? "increase" : "decrease")
                    : undefined
                }
                className={`w-22 md:w-25 text-xs ${account ? '' : 'cursor-not-allowed pointer-events-none'}`}
            />


            <div className="flex gap-1 items-center relative">
                <Dollar className="absolute w-4 h-4 left-1" />
                <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) =>
                        update(entry.id, {
                            amount: Number(e.target.value),
                        })
                    }
                    placeholder="10.00"
                    className="bg-white w-22 rounded-xl text-sm text-right px-1 py-1"
                />

                <button type="button" className="cursor-pointer text-zinc-600 hover:text-red-400 transition-all" onClick={(e) => {
                    e.preventDefault()
                    remove(entry.id)
                }}>
                    <Delete className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
  )
}
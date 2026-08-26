'use client'
import { EntryDTO, TransactionDTO } from "@/server/dto/transaction.dto"
import { formatAmount } from "@/utils/amountFormatter"
import { useMemo } from "react"
import { Download } from "@/components/icons/Download"
import { Button } from "@/components/ui/Button"

export function CurrentPageTotals({filteredTransactions}:{filteredTransactions: TransactionDTO[]}){
    const {currentPageDebit, currentPageCredit} = useMemo(() => {

        const entriesDebit : EntryDTO[] = []

        const entriesCredit : EntryDTO[] = []

        filteredTransactions.forEach(t => {
            const {entries} = t
            entries.forEach(e => {
                if (e.type === "CREDIT"){
                    entriesCredit.push(e)
                } else {
                    entriesDebit.push(e)
                }
            })
        })

        if (entriesCredit.length === 0) return { totalCredit: 0 , totalDebit: 0}

        const currentPageDebit = entriesDebit.map(e => e.amount).reduce((acc, current) => acc + current)

        const currentPageCredit = entriesCredit.map(e => e.amount).reduce((acc, current) => acc + current)

        return {currentPageDebit, currentPageCredit}

    }, [filteredTransactions])


    return (
        <div className="flex items-center text-xs lg:text-md justify-center gap-2 lg:justify-between flex-wrap sticky left-0 -bottom-4 shadow bg-zinc-200 p-4 w-full rounded-xl">
            <div className="flex gap-2 flex-wrap justify-center items-center">
                <div className="">
                    <h4 className="text-md font-semibold text-center md:uppercase">Pagina Actual</h4>
                    <div className="flex gap-1.5">
                        <p>
                            Credito: 
                            <span className="text-indigo-800">{formatAmount(currentPageCredit ?? 0)}</span>
                        </p>
                        <p>
                            Debito: 
                            <span className="text-indigo-600">{formatAmount(currentPageDebit ?? 0)}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-1">
                <Button 
                    variant="CLEAN"
                    className="py-1.5 px-2 hover:bg-zinc-200"
                >
                    <Download/>
                </Button>
                            
                <Button 
                    variant="PRIMARY"
                    className="py-1.5 px-4 rounded-2xl"
                >
                    Close Period
                </Button>
            </div>
        </div>
    )
}
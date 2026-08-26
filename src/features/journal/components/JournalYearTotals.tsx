'use client'
import { formatAmount } from "@/utils/amountFormatter";
import { CardWrapper } from "@/components/ui/CardWrapper";
import { useState } from "react";

export function JournalYearTotals({credit, debit}:{credit:number, debit:number}){
    const [totals, setTotals] = useState({credit, debit})

    return (
        <div className="grid grid-cols-2 w-full gap-4">
            <CardWrapper styles="p-6">
                <p className="uppercase text-xs text-zinc-600 font-semibold">Total debits</p>
                <h4 className="text-xl sm:text-3xl text-indigo-700 font-semibold">{formatAmount(totals.debit)}</h4>
            </CardWrapper>
        
            <CardWrapper styles="p-6">
                <p className="uppercase text-xs text-zinc-600 font-semibold">Total credits</p>
                <h4 className="text-xl sm:text-3xl text-indigo-700 font-semibold">{formatAmount(totals.credit)}</h4>
            </CardWrapper>
        </div>
    )
}
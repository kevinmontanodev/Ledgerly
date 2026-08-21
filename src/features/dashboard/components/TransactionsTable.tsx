'use client'

import { formatAmount } from "@/utils/amountFormatter";
import { CardWrapper } from "@/components/ui/CardWrapper";
import { TransactionDTO } from "@/server/dto/transaction.dto";
import { useEffect, useState } from "react";
import { useTransactionStore } from "@/features/transactions/store/transaction.store";

export function TransactionsTable({transactionsRes}:{transactionsRes: TransactionDTO[]}){
    const {loadTransactions, transactions} = useTransactionStore()
    const [lastMoves, setLastMoves] = useState<TransactionDTO[]>([])

    useEffect(() => {
        loadTransactions(transactionsRes)

    }, [loadTransactions, transactionsRes])


    useEffect(() => {
         const getLastMoves = (transactions: TransactionDTO[]) => {
            const last = transactions.slice(0, 4)
            setLastMoves(last)
        } 

        getLastMoves(transactions)

    }, [transactions])

    return (
        <CardWrapper styles="p-3 md:p-6 w-full overflow-hidden shadow-sm border border-zinc-100 min-h-full">
            <div className="pb-4">
                <h3 className="text-lg md:text-2xl font-semibold">Recent Transactions</h3>
                <p className="text-zinc-500 text-xs md:text-base">Real-time ledger entries across all accounts</p>
            </div>
            <div className="w-full">
                <table className="w-full">
                    <thead className="bg-zinc-50">
                        <tr className="text-xs md:text-sm">
                            <th className="py-3 md:px-4 font-medium hidden md:table-cell">DATE</th>
                            <th className="py-3 md:px-4 font-medium">ACCOUNT</th>
                            <th className="py-3 md:px-4 font-medium hidden lg:table-cell">DESCRIPTION</th>
                            <th className="py-3 md:px-4 font-medium text-center">DEBIT</th>
                            <th className="py-3 md:px-4 font-medium text-center">CREDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lastMoves.map(t => (
                            <LastMoves transaction={t} key={t.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </CardWrapper>
    )
}

export function LastMoves({transaction}:{transaction:TransactionDTO}){
    const {entries} = transaction

    return (
        entries.map(e => (
            <tr className="border-b border-zinc-200 last:border-0 text-xs md:text-sm" key={e.id}>
                <td className="py-4 md:px-4 text-center text-sm whitespace-nowrap hidden md:table-cell">{transaction.date.toLocaleDateString()}</td>
                <td>
                    <span className="p-1 rounded-md uppercase text-xs bg-blue-400 text-blue-800">
                        {e.accountName}
                    </span>
                </td>
                <td className="text-zinc-600 text-shadow-mauve-100 px-2 md:px-4 truncate hidden lg:table-cell">{transaction.description}</td>
                <td className="py-4 md:px-4 text-center font-mono text-sm">
                    {e.type === 'DEBIT' ? `${formatAmount(e.amount)}` : '-'}
                </td>
                <td className="py-4 md:px-4 text-center font-mono text-sm">
                    {e.type === 'CREDIT' ? `${formatAmount(e.amount)}` : '-'}
                </td>
            </tr>
        ))
    )
}
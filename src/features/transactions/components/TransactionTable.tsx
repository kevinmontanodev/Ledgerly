'use client'

import { TransactionDraft, useTransactionStore } from "@/features/transactions/store/transaction.store";
import { CardWrapper } from "@/components/ui/CardWrapper";
import { useViewTransitionModal } from "@/hooks/useViewTransitionModal";
import { TransactionForm } from "./TransactionForm";
import { AnimatePresence } from "framer-motion";
import { TransactionDTO } from "@/server/dto/transaction.dto";
import { transactionDtoToDraft } from "@/utils/mappers/transactionDtoToDraft";
import { TransactionTableRow } from "./TransactionTableRow";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { PaginationData } from "@/features/journal/interfaces/interfaces";

export function TransactionTable({transactionsPaginationData}:{transactionsPaginationData: PaginationData}) {
    const {removeTransaction, updateTransaction, transactions} = useTransactions({transactionsData: transactionsPaginationData.transactions})
    const {startDraft} = useTransactionStore()
    const {modalRef, openModal, closeModal, originRef} = useViewTransitionModal()

    const handleOpenModal = (element:HTMLElement, transaction: TransactionDTO) => {
        startDraft(transactionDtoToDraft(transaction))
        openModal(element)
    }

    const handleSubmit  = async (tx: TransactionDraft) => {
        updateTransaction(tx, originRef)
    }

    return (
        <>
            <CardWrapper styles="px-2 py-6 md:px-6 shadow-xs overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-md md:text-xl font-semibold">Activity History</h2>
                    <p className="text-xs md:text-md opacity-70 font-semibold">{transactionsPaginationData.totalItems} Transactions total</p>
                </div>
    
                <div className="w-full">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs md:text-sm text-zinc-700 bg-zinc-50 text-left">
                                <th className="py-2 pl-4">DATE</th>
                                <th className="py-2">DESCRIPTION</th>
                                <th className="py-2 pr-4 text-right">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody className="relative">
                            <AnimatePresence mode="popLayout">
                                {transactions.map((t) => (
                                    <TransactionTableRow 
                                        key={t.id} 
                                        t={t} 
                                        onDelete={removeTransaction}
                                        onClick={handleOpenModal}
                                    />
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </CardWrapper>
            
            <TransactionForm modalRef={modalRef} closeModal={closeModal} onSubmit={handleSubmit} />
        </>
    );
}
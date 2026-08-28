import { saveTransaction } from "@/server/actions/transaction.actions"
import { TransactionDTO } from "@/server/dto/transaction.dto"
import { TransactionDraft, useTransactionStore } from "@/features/transactions/store/transaction.store"
import { RefObject, useEffect } from "react"
import { useViewTransitionModal } from "../../../hooks/useViewTransitionModal"

export function useTransactions({transactionsData}:{transactionsData: TransactionDTO[]}){
    const {loadTransactions, transactions} = useTransactionStore()
    const {startDraft} = useTransactionStore()
    const {openModal} = useViewTransitionModal()
    
    useEffect(() => {
        const fetchTransactions = async () => {
            loadTransactions(transactionsData)
        }

        fetchTransactions()
    }, [transactionsData, loadTransactions])

    const removeTransaction = (id: string) => {
        const updatedTransactions = transactions.filter(t => t.id !== id)
        loadTransactions(updatedTransactions)
    }

    const updateTransaction = async (tx: TransactionDraft, originRef: RefObject<HTMLElement | null>) => {
            const updated = transactions.find(t => t.id === tx.id)
    
            const transactionsCopy = [...transactions]
            const originCopy = originRef.current
    
            if (updated){
                const {category} = updated

                const updatedTx : TransactionDTO = {
                    ...updated,
                    category : {
                        ...category,
                        id: tx.categoryId,
                        name: tx.categoryName ?? ""
                    },
                    title: tx.title,
                    entries: tx.entries,
                    date: new Date(tx.date),
                    description: tx.description
                }
    
                const newTransactions = transactions.map(t => t.id === tx.id ? updatedTx : t)
                loadTransactions(newTransactions)
    
                try {
                    await saveTransaction([tx])
                } catch {
                    loadTransactions(transactionsCopy)
                    startDraft(tx)
                    openModal(originCopy)
                }
            }
        }

    return {
        transactions,
        removeTransaction,
        updateTransaction
    }
}
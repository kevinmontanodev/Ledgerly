import { TransactionDTO } from "@/server/dto/transaction.dto"
import { create } from "zustand"

export type EntryDraft = {
    id: string
    accountId: string
    accountName: string
    type: "DEBIT" | "CREDIT"
    amount: number
    transactionId:string
}

export type TransactionDraft = {
    id: string
    title: string
    categoryId: string
    categoryName?: string
    description?: string
    date: string
    entries: EntryDraft[]
    projectId:string
}

type TransactionStore = {
    transactions: TransactionDTO[]
    previewTransactions: TransactionDraft[]
    currentTransactionId: string | null
    draftTransaction: TransactionDraft | null
    projectId: string | null
    lastUpdate:number

    setProjectId: (id: string) => void
    loadTransactions: (transactions: TransactionDTO[]) => void
    loadPreviewTransactions: (previewTransactions: TransactionDraft[]) => void
    setCurrentTransaction: (id: string) => void
    removeTransaction: (id:string) => void

    addEntry: () => void
    updateEntry: (entryId: string, data: Partial<EntryDraft>) => void
    removeEntry: (entryId: string) => void

    getTotals: () => {
        debit: number
        credit: number
        balanced: boolean
    }

    startDraft: (tx?: TransactionDraft) => void
    updateDraft: (data: Partial<TransactionDraft>) => void
    updateDraftEntry: (entryId: string, data: Partial<EntryDraft>) => void
    addDraftEntry: () => void
    removeDraftEntry: (entryId: string) => void

    saveDraft: () => void
    discardDraft: () => void

    reset: () => void
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
    transactions: [],
    previewTransactions: [],
    currentTransactionId: null,
    draftTransaction: null,
    projectId: null,
    lastUpdate: Date.now(),

    setProjectId: (id) => set({projectId: id}),

    loadTransactions: (transactions) => set({transactions}),

    loadPreviewTransactions: (previewTransactions) => set({previewTransactions}),

    setCurrentTransaction: (id) =>
        set({ currentTransactionId: id }),

    removeTransaction: (id) => {
        set(state => ({transactions: state.transactions.filter(t => t.id !== id)}))
    },

    addEntry: () =>
        set(state => ({
            transactions: state.transactions.map(tx =>
                tx.id === state.currentTransactionId
                ? {
                    ...tx,
                    entries: [
                        ...tx.entries,
                        {
                        id: crypto.randomUUID(),
                        accountId: "",
                        accountName: "",
                        type: "DEBIT",
                        amount: 0,
                        transactionId: tx.id
                        }
                    ]
                    }
                : tx
            )
    })),

    updateEntry: (entryId, data) =>
        set(state => ({
            transactions: state.transactions.map(tx =>
                tx.id === state.currentTransactionId
                ? {
                    ...tx,
                    entries: tx.entries.map(e =>
                        e.id === entryId ? { ...e, ...data } : e
                    )
                    }
                : tx
            )
    })),

    removeEntry: (entryId) =>
        set(state => ({
            transactions: state.transactions.map(tx =>
                tx.id === state.currentTransactionId
                ? {
                    ...tx,
                    entries: tx.entries.filter(e => e.id !== entryId)
                    }
                : tx
            )
    })),

    getTotals: () => {
        const state = get()
        const tx = state.transactions.find(
            t => t.id === state.currentTransactionId
        )

        if (!tx) {
            return { debit: 0, credit: 0, balanced: false }
        }

        const debit = tx.entries
        .filter(e => e.type === "DEBIT")
        .reduce((sum, e) => sum + e.amount, 0)

        const credit = tx.entries
        .filter(e => e.type === "CREDIT")
        .reduce((sum, e) => sum + e.amount, 0)

        return {
            debit,
            credit,
            balanced: debit === credit && debit > 0
        }
    },

    startDraft: (tx) => {
        const base = tx ?? {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            date: new Date().toISOString().split("T")[0],
            projectId: get().projectId,
            entries: [
                {
                    id: crypto.randomUUID(),
                    accountId: "",
                    type: "DEBIT",
                    amount: 0
                }
            ]
        }

        set({
            draftTransaction: JSON.parse(JSON.stringify(base))
        })
    },

    updateDraft: (data: Partial<Omit<TransactionDraft, "entries">>) =>
        set(state => {
            if (!state.draftTransaction) return state

            return {
                draftTransaction: {
                    ...state.draftTransaction,
                    ...data
                }
            }
    }),

    updateDraftEntry: (entryId, data) =>
        set(state => ({
            draftTransaction: state.draftTransaction && {
                ...state.draftTransaction,
                entries: state.draftTransaction.entries.map(e =>
                    e.id === entryId ? { ...e, ...data } : e
                )
            }
    })),

    saveDraft: () =>
        set(state => {
            const draft = state.draftTransaction
            if (!draft) return state

            const exists = state.previewTransactions.some(t => t.id === draft.id)

            return {
                previewTransactions: exists
                    ? state.previewTransactions.map(t =>
                        t.id === draft.id ? draft : t
                    )
                    : [...state.previewTransactions, draft],

                draftTransaction: null,
            }
    }),

    addDraftEntry: () =>
        set(state => {
            if (!state.draftTransaction) return state

            return {
                draftTransaction: {
                    ...state.draftTransaction,
                    entries: [
                        ...state.draftTransaction.entries,
                        {
                            id: crypto.randomUUID(),
                            accountId: "",
                            accountName: "",
                            type: "DEBIT",
                            amount: 0,
                            transactionId: state.draftTransaction.id
                        }
                    ]
                }
            }
    }),

    removeDraftEntry: (entryId) =>
        set(state => {
            if (!state.draftTransaction) return state

            if (state.draftTransaction.entries.length === 1) return state

            return {
                draftTransaction: {
                    ...state.draftTransaction,
                    entries: state.draftTransaction.entries.filter(
                        e => e.id !== entryId
                    )
                }
            }
    }),

    discardDraft: () => set({ draftTransaction: null }),

    reset: () =>
        set({
            previewTransactions: [],
            currentTransactionId: null,
            lastUpdate: Date.now()
        })
}))
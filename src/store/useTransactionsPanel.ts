import {create} from "zustand"

interface TransactionsViewState {
    showView: boolean | null,
    setShowView: () => void,
    setCloseView: () => void,
}


export const useTransactionPanel = create<TransactionsViewState>((set,get) => ({
    showView: null,

    setShowView: () => set({showView: true}),

    setCloseView: () => set({showView: false})
}))
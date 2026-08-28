import { TransactionDraft } from "../store/transaction.store"

// components Props
export interface TransactionPreviewCardProps {
    transaction: TransactionDraft
    startDraft: (tx?: TransactionDraft | undefined) => void 
    removeTransaction: (id: string) => void
    openModal: (originElement: HTMLElement | null) => Promise<void>
}
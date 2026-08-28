import { Delete } from "@/components/icons/Delete";
import { Edit } from "@/components/icons/Edit";
import { TransactionPreviewCardItem } from "./TransactionPreviewCardItem";
import { TransactionPreviewCardProps } from "../interfaces/transaction.interfaces";

export function TransactionPreviewCard({ transaction, startDraft, removeTransaction, openModal }: TransactionPreviewCardProps) {
    const debitEntries = transaction.entries.filter((en) => en.type === "DEBIT")
    const creditEntries = transaction.entries.filter((en) => en.type === "CREDIT")

    return (
        <div className="p-4 rounded-lg bg-zinc-100 relative">
            <p className="absolute top-4 right-4 text-xs bg-zinc-300 px-2 py-0.5 rounded-2xl">
                {transaction.date}
            </p>
            <p className="font-semibold">{transaction.title}</p>
            {transaction.description && (
                <span className="text-xs text-zinc-500">{transaction.description}</span>
            )}

            <TransactionPreviewCardItem type="CREDIT" entries={creditEntries} />
            <TransactionPreviewCardItem type="DEBIT" entries={debitEntries} />

            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                className="cursor-pointer"
                onClick={(ev) => {
                    startDraft(transaction);
                    openModal(ev.currentTarget);
                }}
                >
                    <Edit styles="w-5 h-5" />
                </button>

                <button
                className="cursor-pointer"
                onClick={() => {
                    removeTransaction(transaction.id);
                }}
                >
                    <Delete className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}



import { EntryDraft } from "@/features/transactions/store/transaction.store";
import { formatAmount } from "@/utils/amountFormatter";

export function TransactionPreviewCardItem({type, entries}:{type: "CREDIT" | "DEBIT", entries: EntryDraft[]}){
    return (
        <div className="py-2">
            <span className="uppercase text-sm font-semibold text-zinc-500">
                {type === "CREDIT" ? 'Credit' : 'Debit'}
            </span>
            <div className="flex flex-col gap-0.5 pr-12">
                {entries
                    .map((entry) => (
                    <p
                        key={entry.id}
                        className={`font-semibold text-sm flex justify-between border-b border-dashed ${type === "CREDIT" ? 'border-zinc-700' : 'border-zinc-400'}`}
                    >
                    <span>{entry.accountName}</span>
                    <span>{formatAmount(entry.amount)}</span>
                </p>
                ))}
            </div>
        </div>
    )
}
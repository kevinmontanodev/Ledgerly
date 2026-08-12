import { EntryDTO, TransactionDTO } from "@/server/dto/transaction.dto";
import { EntryDraft, TransactionDraft } from "@/features/transactions/store/transaction.store";

export function transactionDtoToDraft(transaction: TransactionDTO) : TransactionDraft {
    return {
        id: transaction.id,
        categoryId: transaction.category?.id || "",
        categoryName: transaction.category?.name ?? "",
        description: transaction.description,
        title: transaction.title,
        date: transaction.date.toISOString().split("T")[0],
        entries: entriesDtoToDraft(transaction.entries),
        projectId: transaction.projectId
    }
}


export function entriesDtoToDraft(entries:EntryDTO[]) : EntryDraft[] {
    return entries.map(e => ({
        id: e.id,
        accountId: e.accountId,
        amount: e.amount,
        accountName: e.accountName ?? "",
        transactionId: e.transactionId,
        type: e.type
    }))
}
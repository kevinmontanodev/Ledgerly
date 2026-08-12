import { EntryDraft } from "@/features/transactions/store/transaction.store"

export function getTotalsFromEntries(entries: EntryDraft[]) {
  const debit = entries
    .filter(e => e.type === "DEBIT")
    .reduce((sum, e) => sum + e.amount, 0)

  const credit = entries
    .filter(e => e.type === "CREDIT")
    .reduce((sum, e) => sum + e.amount, 0)

  return {
    debit,
    credit,
    difference: debit - credit,
    balanced: debit === credit && debit > 0
  }
}
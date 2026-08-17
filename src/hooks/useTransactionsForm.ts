import { getTransactionCategories } from "@/server/actions/transaction.actions";
import { SelectItems } from "@/shared/shared";
import { TransactionDraft } from "@/features/transactions/store/transaction.store";
import { getTotalsFromEntries } from "@/utils/getTotalsFromEntries";
import { useEffect, useMemo, useState } from "react";

export function useTransactionsForm(draftTransaction: TransactionDraft | null){
    const [selectItems, setSelectItems] = useState<SelectItems[]>([])

    const entries = useMemo(
        () => draftTransaction?.entries ?? [],
    [draftTransaction?.entries])
      
    const totals =  useMemo(
        () => getTotalsFromEntries(entries),
    [entries])
    
    useEffect(() => {
        const loadCategories = async () => {
            const categories = await getTransactionCategories()
            const categorySelectItems : SelectItems[] = categories.map((c) => ({
                id: c.id,
                label: c.name
            }))
            setSelectItems(categorySelectItems)
        }
    
        loadCategories()
    }, [])
    
    return {
        selectItems,
        totals,
        entries
    }
}
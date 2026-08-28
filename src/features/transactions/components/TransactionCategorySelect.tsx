import { KeyboardArrowDown } from "@/components/icons/KeyBoardArrowDown";
import { PopUpWrapper } from "@/components/ui/PopUpWrapper";
import { CategoryDTO } from "@/server/dto/transaction.dto";
import { SelectItems } from "@/shared/shared";
import { useMemo } from "react";
import { Filters } from "../hooks/useTransactionsFilters";

export interface TransactionCategorySelectProps {
    categories: CategoryDTO[]
    currentCategoryId: string | null
    changeFilter: (newFilter: Partial<Filters>) => void
}

export function TransactionCategorySelect({categories, changeFilter, currentCategoryId}:TransactionCategorySelectProps){
    const selectCategories : SelectItems[] = useMemo(() => {
        return categories.map((c) => ({
            id: c.id,
            label: c.name
        }))
    }, [categories])

    return (
        <PopUpWrapper
            trigger={
                <p className="flex items-center justify-center gap-2 py-3 px-2 bg-zinc-200 rounded-2xl">
                    <KeyboardArrowDown/>
                    <span>{selectCategories.find(c => c.id === currentCategoryId)?.label ?? 'Categorias'}</span>
                </p>
            }

            id="modal-1"
            closeOnClickContent
            center={false}

            className="flex flex-col gap-1 bg-zinc-200 p-2 rounded-2xl max-w-44 col-span-1"
        >
            <div className="flex flex-col gap-1 h-52 overflow-y-scroll scroll-auto">
                <p onClick={() => changeFilter({category: null})} className="p-2 bg-zinc-200 hover:bg-zinc-100 cursor-pointer rounded-xl transition-all">Todas</p>
                {selectCategories.map(c => (
                    <p key={c.id}
                        onClick={() => changeFilter({category:c.id})} className="p-2 bg-zinc-200 hover:bg-zinc-100 cursor-pointer rounded-xl transition-all">{c.label}</p>
                ))}
            </div>
        </PopUpWrapper>
    )
}
import { CleanFilter } from "@/components/icons/CleanFilter";
import { Button } from "@/components/ui/Button";
import { PrettySelect } from "@/components/ui/PrettySelect";
import { Filters } from "@/features/transactions/hooks/useTransactionsFilters";
import { SelectItems } from "@/shared/shared";

interface Props {
    availableYears: SelectItems[]
    changeFilter: (newFilter: Partial<Filters>) => void
    availableMonths: {
        id: string;
        label: string;
    }[] | undefined
    selectCategories: SelectItems[]
    clearFilters: () => void
    currentFilters: Filters
}

export function JournalFiltersPanel({availableYears, availableMonths, selectCategories, changeFilter, clearFilters, currentFilters}: Props){
    return (
        <div className="flex justify-center gap-2 flex-wrap">
            <PrettySelect
                itemsStyle="bg-white py-2.5"
                className="w-16 lg:w-20 xl:w-28"
                selectItems={availableYears}
                placeHolder="Año"
                value={currentFilters.year?.toString()}
                onSelect={(id) => changeFilter({year: Number(id)})}
            />

            <PrettySelect
                className="w-16 lg:w-20 xl:w-28"
                itemsStyle="bg-white py-2.5"
                disable={availableMonths === undefined}
                placeHolder="Mes"
                selectItems={availableMonths ?? [{id:'', label: ''}]}
                value={currentFilters.month?.toString()}
                onSelect={(id) => changeFilter({month: Number(id)})}
            />

            <PrettySelect
                className="w-30"
                itemsStyle="bg-white py-2.5"
                selectItems={selectCategories}
                value={currentFilters.category ?? ''}
                placeHolder="Categoria"
                onSelect={(id) => changeFilter({category: id})}
            />

            <Button 
                variant="PRIMARY"
                className="py-1 px-3 rounded-full font-bold text-sm flex items-center gap-1 group relative"
                onClick={clearFilters}
            >
            
                <CleanFilter className="size-5" />
                <span className="absolute opacity-0 scale-50 bg-black w-20 rounded-2xl text-xs top-10 left-1/2 -translate-x-1/2 ld:block group-hover:opacity-100 group-hover:scale-100 transition-all">
                    Limpiar Filtros
                </span>
            </Button>
        </div>
    )
}
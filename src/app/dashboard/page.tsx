import { ExpenseAllocation } from "@/components/dashboard/ExpenseAllocation";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { WeeklyInsight } from "@/components/dashboard/WeeklyInsight";
import { DashboardAmountCard } from "@/components/ui/DashBoardAmountCard";
import { NewTransactionButton } from "@/components/ui/NewTransactionButton";

export default function DashBoardPage(){
    return (
        <div className="min-h-full rounded-md w-full">
            <header className="p-4 bg-zinc-100 flex items-center justify-between fixed w-full md:relative z-45">
                <h2 className="md:text-2xl font-semibold pl-10 md:pl-0 text-lg">Dashboard</h2>

                <NewTransactionButton/>
            </header>

            <div className="mt-16 md:mt-6 px-4 flex flex-col gap-4 pb-6">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                    <DashboardAmountCard amountData={{label: 'Activos', currency: '$', amount: 1248500}} />
                    <DashboardAmountCard amountData={{label: 'Pasivos', currency: '$', amount: 412300}} />
                    <DashboardAmountCard amountData={{label: 'Capital', currency: '$', amount: 836200}} />
                    <DashboardAmountCard amountData={{label: 'Resultado del Período', currency: '$', amount: 124000}} />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 sm:grid-rows-3 lg:grid-rows-2 gap-2 lg:gap-4">
                    <div className="col-span-2 row-span-1 sm:row-span-2 lg:row-span-2">
                        <IncomeChart/>
                    </div>
   
                    <div className="col-span-1 row-span-1 hidden sm:flex">
                        <WeeklyInsight/>
                    </div>
                    <div className="col-span-2 sm:col-span-1 row-span-1">
                        <ExpenseAllocation/>
                    </div>
                </div>

                <TransactionsTable/>
            </div>
            
        </div>
    )
}
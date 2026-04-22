import { ExpenseAllocation } from "@/components/dashboard/ExpenseAllocation";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Navbar } from "@/components/Navbar";
import { DashboardAmountCard } from "@/components/ui/DashBoardAmountCard";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="text-black flex flex-col px-4 gap-2">
        <TransactionsTable />
        <ExpenseAllocation/>
        
        <Navbar/>
      </main>
    </div>
  );
}

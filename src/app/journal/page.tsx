import { ActionDots } from "@/components/icons/ActionDots";
import { Hint } from "@/components/icons/Hint";
import { CardWrapper } from "@/components/ui/CardWrapper";
import { NewTransactionButton } from "@/components/ui/NewTransactionButton";

export default function JournalPage(){
    return (
        <div className="w-full h-full">
            <header className="p-4 bg-zinc-100 flex items-center justify-between fixed w-full md:relative z-45">
                <h2 className="md:text-2xl font-semibold pl-8 md:pl-0 text-lg">Journal</h2>
            
                <NewTransactionButton/>
            </header>

            <div className="w-full p-4 h-full flex flex-col gap-4 mt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                    <CardWrapper styles="p-6">
                        <p className="uppercase text-xs text-zinc-600 font-semibold">Total debits</p>
                        <h4 className="text-3xl text-indigo-700 font-semibold">$42,950.00</h4>
                    </CardWrapper>

                    <CardWrapper styles="p-6">
                        <p className="uppercase text-xs text-zinc-600 font-semibold">Total debits</p>
                        <h4 className="text-3xl text-indigo-900-700 font-semibold">$42,950.00</h4>
                    </CardWrapper>
                </div>

                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" className="col-span-2 md:col-span-1 py-2 px-8 placeholder:text-zinc-500 bg-zinc-200 rounded-lg outline-0" placeholder="Search by vendor, account, or amount..." />

                        <div className="flex justify-center gap-4">
                            <button className="py-2 px-3 shadow bg-zinc-50 rounded-full font-bold text-sm">
                                Date Range
                            </button>
                            <button className="py-2 px-3 shadow bg-zinc-50 rounded-full font-bold text-sm">
                                Account
                            </button>
                            <button className="py-2 px-3 shadow bg-indigo-700 text-white rounded-full font-bold text-sm">
                                All Entries
                            </button>
                        </div>
                    </div>

                    <div className="py-6">
                        <CardWrapper styles="overflow-hidden">
                            <div className="bg-zinc-100 p-6 flex gap-4 items-start relative">
                                <div className="flex flex-col gap-0.5 px-4 py-2 rounded-xl bg-zinc-50 shadow">
                                    <span className="text-xs font-semibold text-zinc-700 uppercase">oct</span>
                                    <span className="text-xl font-semibold">24</span>
                                </div>

                                <div>
                                    <p className="font-semibold text-xl">Inventory Purchase</p>
                                    <p className="text-sm text-zinc-700 font-medium">Cash payment for Q4 stock</p>
                                </div>

                                <div className="absolute top-3 right-3 flex gap-2 items-center">
                                    <span className="uppercase text-orange-950 bg-orange-700/10 py-1 px-2.5 rounded-full text-xs font-semibold">pending</span>
                                    <ActionDots/>
                                </div>
                            </div>
                            <div className="bg-white p-6">
                                <div className="flex justify-between ">
                                    <span className="text-indigo-600 font-semibold">Inventory</span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-lg font-semibold">$50.00</span>
                                        <span className="text-xs uppercase font-medium">debit</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-700 font-semibold italic pl-4">Cash</span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-lg text-zinc-600 font-semibold">$50.00</span>
                                        <span className="text-xs uppercase font-medium">credit</span>
                                    </div>
                                </div>
                            </div>
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </div>
    )
}
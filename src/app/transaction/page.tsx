import { Hint } from "@/components/icons/Hint";
import { KeyboardArrowDown } from "@/components/icons/KeyBoardArrowDown";
import { CardWrapper } from "@/components/ui/CardWrapper";
import { NewTransactionButton } from "@/components/ui/NewTransactionButton";
import { PopUpWrapper } from "@/components/ui/PopUpWrapper";

export default function TransactionsPage(){
    return (
        <div className="w-full h-full">
            <header className="p-4 bg-zinc-100 flex items-center justify-between fixed w-full md:relative z-45">
                <h2 className="md:text-2xl font-semibold pl-8 md:pl-0 text-lg">Transactions</h2>

                <NewTransactionButton/>
            </header>

            <div className="w-full p-4 h-full flex flex-col gap-4 mt-14">
                <div className="grid grid-cols-3 md:grid-cols-[1fr_auto] w-full gap-2 relative">
                    <input type="text" className="col-span-2 md:col-span-1 py-2 px-8 placeholder:text-zinc-500 bg-zinc-200 rounded-lg outline-0" placeholder="Search by vendor, account, or amount..." />
                    
                    <PopUpWrapper
                    trigger={
                        <p className="flex items-center justify-center gap-2 py-3 px-2">
                            <KeyboardArrowDown/>
                            <span>Filters</span>
                        </p>
                    }

                    triggerStyles="w-full rounded-xl bg-zinc-200"

                    content={
                        <div className="flex flex-col gap-1">
                            <p className="p-2 bg-zinc-200 hover:bg-zinc-100 cursor-pointer rounded-xl transition-all">Account</p>
                            <p className="p-2 bg-zinc-200 hover:bg-zinc-100 cursor-pointer rounded-xl transition-all">Vendor</p>
                        </div>
                    }

                    contentStyles="flex flex-col gap-1 bg-zinc-200 p-2 rounded-2xl w-full right-0 top-0"

                    closeOnContentClick={true}
                    >

                    </PopUpWrapper>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <CardWrapper styles="p-6 col-span-2">
                        <div>
                            <span className="uppercase font-semibold text-xs flex">Mountly outflow</span>
                            <h4 className="text-2xl font-semibold">$42,490.00</h4>
                            <p className="text-xs text-indigo-600">- 12.5% from last mounth</p>
                        </div>
                    </CardWrapper>
                    <div className="p-6 bg-indigo-600 rounded-xl col-span-2 md:col-span-1 text-white">
                        <span className="flex text-xs uppercase">Available balance</span>
                        <h4 className="text-2xl font-semibold">$184,205.12</h4>
                    </div>
                </div>

                <CardWrapper styles="p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg md:text-xl font-semibold">Activity History</h2>
                        <p className="text-xs md:text-md opacity-70 font-semibold">324 Transactions total</p>
                    </div>

                    <div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-sm text-zinc-700 bg-zinc-50 text-left">
                                    <th className="py-2">DATE</th>
                                    <th className="py-2 hidden md:table-cell">DESCRIPTION</th>
                                    <th className="py-2">ACCOUNT</th>
                                    <th className="py-2">AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="uppercase text-zinc-400 text-xs md:text-base py-6">OCT 24</td>
                                    <td className="py-6 hidden md:table-cell">
                                        <div className="flex gap-2 items-center">
                                            <div className="p-2 text-blue-700 bg-blue-700/10 rounded-xl">
                                                <Hint/>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-md md:text-lg">Cloud infraestructure</p>
                                                <span className="text-xs text-zinc-500">Amazon web services</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <span className="px-1.5 py-1 bg-zinc-200 text-xs uppercase font-semibold rounded-full">Operating cash</span>
                                    </td>
                                    <td className="py-6 font-semibold">-$2,410.00</td>
                                </tr>
                                <tr>
                                    <td className="uppercase text-zinc-400 text-xs md:text-base  py-6">OCT 23</td>
                                    <td className="py-6 hidden md:table-cell">
                                        <div className="flex gap-2 items-center">
                                            <div  className="p-2 text-red-700 bg-red-700/10 rounded-xl">
                                                <Hint/>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-md md:text-lg">Cloud infraestructure</p>
                                                <span className="text-xs text-zinc-500">Amazon web services</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <span className="px-1.5 py-1 bg-zinc-200 text-xs uppercase font-semibold rounded-full">Business visa</span>
                                    </td>
                                    <td className="py-6 font-semibold">-$412.50</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardWrapper>
            </div>
        </div>
    )
}
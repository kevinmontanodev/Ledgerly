import { CardWrapper } from "../ui/CardWrapper";

export function ExpenseAllocation(){
    return (
        <CardWrapper styles="p-6 w-full h-full">
            <div>
                <h3 className="text-md md:text-xl font-semibold mb-4">Expense Allocation</h3>
                <div>
                    <div className="py-2">
                        <div className="flex justify-between font-semibold text-xs md:text-sm">
                            <span className="uppercase">Operations</span>
                            <span>42%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-200">
                            <span className="flex h-full w-1/2 bg-blue-800 rounded-full"></span>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="flex justify-between font-semibold text-xs md:text-sm">
                            <span className="uppercase">Payroll</span>
                            <span>35%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-200">
                            <span className="flex h-full w-1/4 rounded-full bg-indigo-800"></span>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="flex justify-between font-semibold text-xs md:text-sm">
                            <span className="uppercase">Marketing</span>
                            <span>18%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-200">
                            <span className="flex h-full w-[18%] rounded-full bg-amber-900"></span>
                        </div>
                    </div>
                </div>
            </div>
        </CardWrapper>
    )
}
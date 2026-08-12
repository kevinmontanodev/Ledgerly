import { formatAmount } from "@/utils/amountFormatter"
import { CardWrapper } from "./CardWrapper"

interface AmountCardProps {
    label: string,
    amount: number,
    currency: string
}

export function DashboardAmountCard({amountData}:{amountData: AmountCardProps}){
    return (
        <CardWrapper styles="p-8">
            <div className="flex flex-col justify-center items-center gap-2">
                <span className="text-zinc-600 text-sm md:text-base">{amountData.label}</span>
                <div>
                    <span className="text-xl md:text-3xl font-bold">
                        {formatAmount(amountData.amount)}
                    </span>
                </div>
            </div>
        </CardWrapper>
    )
}
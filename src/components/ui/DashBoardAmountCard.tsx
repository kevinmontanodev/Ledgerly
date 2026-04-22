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
                <span className="text-zinc-600 text-md md:text-base">{amountData.label}</span>
                <div className="text-3xl font-bold">
                    <span>
                        {formatAmount(amountData.amount)}
                    </span>
                </div>
            </div>
        </CardWrapper>
    )
}
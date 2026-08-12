'use client'

import { useTransactionPanel } from "@/store/useTransactionsPanel";
import { Plus } from "../icons/Plus";
import { Button } from "./Button";

export function NewTransactionButton(){
    const {setShowView} = useTransactionPanel()

    return (
        <Button variant="PRIMARY" className="py-1.5 px-1.5 md:py-2 md:px-3 rounded-full flex gap-1 md:gap-1.5 text-xs items-center cursor-pointer"
        onClick={() => setShowView()}>
            <Plus style="w-4 h-4 md:w-7 md:h-7"/> New Transaction
        </Button>
    )
}
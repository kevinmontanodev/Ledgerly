'use client'

import { useEffect, useState } from "react";
import { DashboardAmountCard } from "@/components/ui/DashBoardAmountCard";
import { useTransactionStore } from "@/features/transactions/store/transaction.store";
import { getCapitalMetrics } from "@/server/actions/metrics.actions";
import { useCurrentProjectStore } from "@/store/useCurrentProjectStore";

interface CapitalTotals {
    active: number;
    pasive: number;
    capital: number;
}

export function DashBoardCapitalStats({capitalTotals}:{capitalTotals:CapitalTotals}){
    const project = useCurrentProjectStore(state => state.currentProject)
    const [capitalStats, setCapitalStats] = useState<CapitalTotals>(capitalTotals)
    const {lastUpdate, setProjectId} = useTransactionStore()

    useEffect(() => {
        const load = async () => {
            if (!project) return
            const capitalMetrics = await getCapitalMetrics(project.id)
            setCapitalStats(capitalMetrics)
            setProjectId(project.id)
        }
        load()
    }, [lastUpdate, project, setProjectId])



    return (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            <DashboardAmountCard amountData={{label: 'Activos', currency: '$', amount: capitalStats.active}} />
            <DashboardAmountCard amountData={{label: 'Pasivos', currency: '$', amount: capitalStats.pasive}} />
            <DashboardAmountCard amountData={{label: 'Capital', currency: '$', amount: capitalStats.capital}} />
            <DashboardAmountCard amountData={{label: 'Resultado del Período', currency: '$', amount: 124000}} />
        </div>
    )
}
import { Food } from "@/components/icons/transactions/Food"
import { Income } from "@/components/icons/transactions/Income"
import { Other } from "@/components/icons/transactions/Other"
import { Salary } from "@/components/icons/transactions/Salary"
import { Taxes } from "@/components/icons/transactions/Taxes"
import { Transfer } from "@/components/icons/transactions/Transfer"
import { ComponentType, SVGProps } from "react"

const colorStyles: Record<string, string> = {
  emerald: "text-emerald-500 bg-emerald-500/10",
  blue: "text-blue-500 bg-blue-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  red: "text-red-500 bg-red-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  yellow: "text-yellow-500 bg-yellow-500/10",
  indigo: "text-indigo-500 bg-indigo-500/10",
  cyan: "text-cyan-500 bg-cyan-500/10",
  rose: "text-rose-500 bg-rose-500/10",
  slate: "text-slate-500 bg-slate-500/10",
};

export const AccountTypesConfig: Record<string, { icon: ComponentType<SVGProps<SVGSVGElement>>, colorClass: string }> = {
  "Activo": { icon: Salary, colorClass: colorStyles.emerald },
  "Pasivo": { icon: Transfer, colorClass: colorStyles.cyan },
  "Patrimonio": { icon: Food, colorClass: colorStyles.blue },
  "Ingreso": { icon: Income, colorClass: colorStyles.emerald },
  "Gasto": { icon: Taxes, colorClass: colorStyles.red },
  "Default": { icon: Other, colorClass: colorStyles.slate },
};
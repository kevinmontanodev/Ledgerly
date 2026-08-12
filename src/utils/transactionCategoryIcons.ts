import {Saving} from "@/components/icons/transactions/Ahorro"
import { Education } from "@/components/icons/transactions/Education"
import { Food } from "@/components/icons/transactions/Food"
import { Health } from "@/components/icons/transactions/Healt"
import { Income } from "@/components/icons/transactions/Income"
import { Leisure } from "@/components/icons/transactions/Leisure"
import { Other } from "@/components/icons/transactions/Other"
import { Salary } from "@/components/icons/transactions/Salary"
import { Services } from "@/components/icons/transactions/Services"
import { Taxes } from "@/components/icons/transactions/Taxes"
import { Transfer } from "@/components/icons/transactions/Transfer"
import { Transport } from "@/components/icons/transactions/Transport"
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

export const CategoryConfig: Record<string, { icon: ComponentType<SVGProps<SVGSVGElement>>, colorClass: string }> = {
  "Ahorro": { icon: Saving, colorClass: colorStyles.emerald },
  "Educacion": { icon: Education, colorClass: colorStyles.blue },
  "Comida": { icon: Food, colorClass: colorStyles.orange },
  "Salud": { icon: Health, colorClass: colorStyles.rose },
  "Ingreso": { icon: Income, colorClass: colorStyles.emerald },
  "Ocio": { icon: Leisure, colorClass: colorStyles.purple },
  "Otros": { icon: Other, colorClass: colorStyles.slate },
  "Salario": { icon: Salary, colorClass: colorStyles.cyan },
  "Servicios": { icon: Services, colorClass: colorStyles.indigo },
  "Inpuestos": { icon: Taxes, colorClass: colorStyles.red },
  "Transferencia": { icon: Transfer, colorClass: colorStyles.yellow },
  "Transporte": { icon: Transport, colorClass: colorStyles.blue },
  "Default": { icon: Other, colorClass: colorStyles.slate },
};
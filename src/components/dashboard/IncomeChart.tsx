"use client";

import {LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { AnimatedCard } from "./AnimateCard";

const data = [
  { name: "Jan", income: 400, expenses: 240 },
  { name: "Feb", income: 300, expenses: 139 },
  { name: "Mar", income: 500, expenses: 300 },
  { name: "Apr", income: 700, expenses: 400 },
]


export function IncomeChart(){
    return (
        <AnimatedCard styles="w-full h-full">
            <div className="w-full h-full bg-white rounded-2xl ">
                <div className="flex items-center justify-between p-3 md:p-6">
                    <div>
                        <h3 className="text-sm font-semibold lg:text-xl">
                            Performance Analytics
                        </h3>
                        <h6 className="text-sm text-zinc-600 hidden md:block  lg:text-base">Comparision of mounthly cash flow trajectory</h6>
                    </div>
                    <div className="flex gap-2 md:gap-4 items-center">
                        <div className="flex gap-1 md:gap-2 items-center">
                            <span className="w-4 h-4 rounded-full bg-[#6366f1]"></span>
                            <span className="text-xs">Income</span>
                        </div>
                        <div className="flex gap-1 md:gap-2 items-center">
                            <span className="w-4 h-4 rounded-full bg-[#cbd5e1]"></span>
                            <span className="text-xs">Expenses</span>
                        </div>
                    </div>
                </div>

               
                    <ResponsiveContainer width="100%" height="70%">
                        <LineChart data={data} margin={{ top: 5, right: 40, left: 40, bottom: 5 }}>
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
                                dy={10}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "none",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                    fontSize: '12px'
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="expenses"
                                stroke="#cbd5e1"
                                strokeWidth={3}
                                strokeDasharray="6 6"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                
            </div>
        </AnimatedCard>
    )
}
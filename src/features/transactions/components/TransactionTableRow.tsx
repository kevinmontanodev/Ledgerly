import { TransactionDTO } from "@/server/dto/transaction.dto";
import { formatDateShort } from "@/utils/formatDateShort";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Delete } from "@/components/icons/Delete";
import { formatAmount } from "@/utils/amountFormatter";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export function TransactionTableRow({ t, onDelete, onClick }: {t: TransactionDTO, onDelete: (id: string) => void, onClick: (e: HTMLElement, t: TransactionDTO) => void}) {
    const { day, month } = formatDateShort(t.date);

    const amount = t.entries.filter(e => e.type === "CREDIT").reduce((acc, entry) => acc += entry.amount, 0);
    const isDragging = useRef(false);
    const [paintRow, setPaintRow] = useState(false)

    return (
        <motion.tr
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
            className="relative group border-b border-zinc-100 last:border-none"
        >
            <td colSpan={3} className="p-0 relative overflow-hidden">

                <div className="absolute inset-0 bg-red-500 flex items-center justify-end pr-8 z-0">
                    <Delete className="text-white animate-pulse" />
                </div>

                <motion.div
                    drag="x"
                    dragConstraints={{ left: -120, right: 0 }}
                    dragElastic={0.05}
                    onDragStart={() => {
                        isDragging.current = true
                    }}
                    onDrag={(e, info) => {
                        setPaintRow(info.offset.x < -60)
                    }}
                    onDragEnd={(e, info) => {
                        // if user slide more than 100px to left, delete the item 
                        if (info.offset.x < -100) {
                            onDelete(t.id);
                        }

                        setTimeout(() => {
                            isDragging.current = false;
                        }, 50)
                    }}
                    onClick={(e) => {
                        if (isDragging.current) return
                        const element = e.target as HTMLElement;

                        onClick(element.closest('tr')!, t); 
                    }}
                    style={{ x: 0 }}
                    className={`${paintRow ? 'border-red-400' : 'border-transparent'} border bg-white flex items-center w-full py-4 px-1 md:px-4 z-10 relative cursor-grab active:cursor-grabbing touch-pan-y`}
                >
                    <div className="flex flex-col items-center justify-center bg-zinc-100 min-w-10 h-10 md:min-w-12 md:h-12 rounded-2xl mr-1 md:mr-4">
                        <span className="text-xs font-bold leading-none">{day}</span>
                        <span className="text-[10px] uppercase opacity-60">{month}</span>
                    </div>

                    <div className="flex-1 flex items-start gap-1 md:gap-2 min-w-0 mr-1 md:mr-4">
                        <CategoryIcon categoryName={t.category?.name ?? ""} className="p-2 rounded-2xl" />
                        <div className="flex flex-col">
                            <span className="font-semibold text-xs md:text-base w-28 sm:w-auto md:truncate">{t.title}</span>
                            <p className="hidden sm:block text-xs text-zinc-500 truncate">{t.description}</p>
                        </div>
                    </div>

                    <div className="font-bold text-xs md:text-base whitespace-nowrap">
                        {formatAmount(amount)}
                    </div>
                </motion.div>
            </td>
        </motion.tr>
    );
}

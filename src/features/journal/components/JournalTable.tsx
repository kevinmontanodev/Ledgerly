import { TransactionDTO } from "@/server/dto/transaction.dto";
import { AnimatePresence, motion } from "framer-motion";
import { JournalTransactionCard } from "./JournalTransactionCard";

export function JournalTable({transactions}:{transactions: TransactionDTO[]}){
    return (
        <div className="pt-4 grid col-1 md:grid-cols-2 gap-3 md:pb-8 pb-12">
            <AnimatePresence>
                {transactions.map(t => (
                    <motion.div
                        key={t.id + '-journal'}
                        layout
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.95}}
                        transition={{duration: 0.2}}
                    >
                        <JournalTransactionCard transaction={t} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
import { useEffect, useState, useMemo, useRef } from "react"
import { KeyboardArrowDown } from "../icons/KeyBoardArrowDown"
import { motion, AnimatePresence } from "framer-motion"
import { SearchableAccountSelectProps } from "@/shared/shared"
import { useAccountOptionStore } from "@/features/catalog/store/account.select.store"

export function SearchableAccountSelect({value, className = 'w-48', onChange}: SearchableAccountSelectProps) {
    const { options } = useAccountOptionStore()

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handle)
        return () => document.removeEventListener("mousedown", handle)
    }, [])

    const filtered = useMemo(() => {
        return options
            .filter(a =>
                a.name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5)

    }, [options, query])

    const selected = options.find(a => a.id === value)

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.button
            whileTap={{scale: 0.97}}
            type="button"
            whileHover={{ scale: 1.02 }}
                onClick={() => setOpen(p => !p)}
                className="w-full rounded-md px-2 py-1 text-left flex justify-between items-center cursor-pointer"
            >
                <span className="truncate">
                    {selected?.name || "Select account"}
                </span>
                <KeyboardArrowDown styles={`${open && 'rotate-180'} transition-all duration-300 w-5 h-5`} />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300, duration: 0.2, ease: "easeOut"}}
                    style={{originY: 0}}
                    className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-1 p-2 z-50"
                    >

                        <input
                            autoFocus
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full mb-2 px-2 py-1 border rounded"
                        />

                        <motion.div className="flex flex-col gap-1 max-h-40 overflow-auto"
                        initial="closed"
                        animate="open"
                        variants={{
                            open: {transition: {staggerChildren: 0.05}},
                            closed: {transition: {staggerChildren: 0.02, staggerDirection: -1}}
                        }}
                        >
                            {filtered.map(acc => (
                                <motion.button
                                    key={acc.id}
                                    layout
                                    variants={{
                                    open: { opacity: 1, x: 0 },
                                    closed: { opacity: 0, x: -5 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    
                                    onClick={() => {
                                    onChange(acc.id, acc.name)
                                    setOpen(false)
                                    setQuery("")
                                    }}
                                    className="text-left hover:bg-zinc-100 px-2 py-1  rounded cursor-pointer"
                                >
                                    {acc.name}
                                </motion.button>
                            ))}
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
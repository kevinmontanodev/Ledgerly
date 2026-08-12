import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyboardArrowDown } from "../icons/KeyBoardArrowDown";
import { PrettySelectProps } from "@/shared/shared";

export function PrettySelect({ onSelect, selectItems, value, className="w-20", itemsStyle='bg-zinc-100', placeHolder = 'Select', disable = false }: PrettySelectProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = useMemo(() => {
        return selectItems.find((item) => item.id === value)
    }, [value,selectItems]);

    useEffect(() => {
        if (!open) return;
        
        const handle = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
        };
        
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [open]);

    return (
        <div className={`${className} relative`} ref={containerRef}>
            <button
                disabled={disable}
                onClick={() => setOpen(!open)}
                type="button"
                className={`w-full ${itemsStyle} p-2 px-1 md:px-2 flex justify-between items-center rounded-xl z-10 relative ${disable ? 'cursor-not-allowed opacity-70 pointer-events-none' : 'cursor-pointer'}`}
            >
                <span className="truncate font-semibold text-xs uppercase">
                    {selected?.label || placeHolder}
                </span>
                <motion.span 
                    animate={{ rotate: open ? 180 : 0 }} 
                    className="text-gray-500"
                >
                    <KeyboardArrowDown styles="w-4 h-4"/>
                </motion.span>
            </button>


            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute top-0 left-0 w-full bg-white shadow-2xl z-50 rounded-xl origin-top"
                    >
                        <div className="p-1">
                            
                            <div 
                                className="px-2 py-1 font-bold text-xs uppercase mb-1 cursor-pointer flex justify-between items-center opacity-40"
                                onClick={() => setOpen(false)}
                            >
                                {selected?.label || placeHolder }
                                <KeyboardArrowDown styles="w-4 h-4"/>
                            </div>
                    
                            <div className="flex flex-col max-h-48 overflow-y-auto gap-0.5 custom-scrollbar">
                                {selectItems.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            onSelect(item.id);
                                            setOpen(false);
                                        }}
                                        className={`text-left px-2 py-1.5 text-xs cursor-pointer rounded-lg transition-colors ${
                                            value === item.id 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'hover:bg-zinc-100 text-zinc-700'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
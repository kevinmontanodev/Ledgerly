'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PopUpProps {
  id: string; // ID único para que sepa de dónde "nace"
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  center: boolean;
  closeOnClickContent:boolean
}

export function PopUpWrapper({ id, trigger, children, className, center, closeOnClickContent }: PopUpProps) {
    const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block">
      
      {/* TRIGGER: El punto de origen */}
      <motion.div
        layoutId={`pop-${id}`}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        {trigger}
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP: Solo lo mostramos si centramos (para enfoque modal) */}
            
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-40 ${center ? 'bg-black/10 backdrop-blur-[2px]' : 'bg-transparent'}`}
              />
            

            {/* CONTENIDO */}
            <motion.div
              layoutId={`pop-${id}`}
              className={`
                z-50 bg-white shadow-xl rounded-2xl overflow-hidden
                ${center ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-92" : "absolute top-0 left-0 min-w-full"}
                ${className}
              `}
              // Curva de transición estilo "Ease-Out" (más natural que el rebote)
              transition={{
                type: "tween",
                ease: [0.4, 0, 0.2, 1],
                duration: 0.35
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className=""
                onClick={() => {
                    if (closeOnClickContent) {
                        setOpen(false)
                    }
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


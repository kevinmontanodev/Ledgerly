import {motion} from "framer-motion"
import { Close } from "../icons/Close"
import { ReactNode, RefObject, useEffect } from "react"

export function DialogModal({modalRef, closeModal, children, className}: {modalRef: RefObject<HTMLDialogElement | null>, closeModal: () => Promise<void>, children: ReactNode, className?:string}) {

    useEffect(() => {
        if (!modalRef.current) return
    
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape"){
                e.preventDefault()
                closeModal()
            }
        }
    
        document.addEventListener('keydown', handler)
    
        return () => document.removeEventListener('keydown', handler)
    }, [modalRef, closeModal])

    return (
        <dialog 
            className={`w-92 ${className} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl`}
            ref={modalRef}
            onClick={(e) => {
                const dialog = modalRef.current
                if (!dialog) return

                const rect = dialog.getBoundingClientRect()

                const isInDialog = 
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom

                if (!isInDialog){
                    closeModal()
                }
        }}>
            <motion.div
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="w-full"
            >
                <button className="absolute top-3 right-3 cursor-pointer hover:rotate-180 transition-all duration-500" onClick={closeModal}>
                    <Close className="w-5 h-5"/>
                </button>

                {children}
            </motion.div>
        </dialog>
    )
}
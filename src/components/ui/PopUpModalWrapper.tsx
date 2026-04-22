'use client'

import { ReactNode, useRef } from "react"

export function PopUpModalWrapper({trigger, content, triggerStyles, contentStyles}: {trigger: ReactNode, content:ReactNode, triggerStyles?:string, contentStyles?:string}){
    const modalRef = useRef<HTMLDialogElement>(null)
    const originElementRef = useRef<HTMLButtonElement>(null)
    const viewTransitionClass = "vt-element-animation";
    const viewTransitionClassClosing = "vt-element-animation-closing"
    
    const openModal = async () => {
        const originElement = originElementRef.current

        if (!document.startViewTransition) {
            modalRef.current?.showModal()
            return
        }

        if (!modalRef.current || !originElement) return

        const modal = modalRef.current

        modal.style.viewTransitionName = "vt-shared"
        modal.style.viewTransitionClass = viewTransitionClass

        originElement.style.viewTransitionName = "vt-shared"
        originElement.style.viewTransitionClass = viewTransitionClass
        originElement.setAttribute("origin-element", "")

        const transition = document.startViewTransition(() => {
            originElement.style.viewTransitionName = ""
            originElement.style.viewTransitionClass = ""

            modal.showModal()
        })

        await transition.finished

        modal.style.viewTransitionName = ""
        modal.style.viewTransitionClass = ""
    }

    const closeModal = async () => {
        const originElement = originElementRef.current

        if (!modalRef.current || !originElement) return

        const modal = modalRef.current

        modal.style.viewTransitionName = "vt-shared"
        modal.style.viewTransitionClass = viewTransitionClassClosing

        const transition = document.startViewTransition(() => {
            originElement.style.viewTransitionName = "vt-shared"
            originElement.style.viewTransitionClass = viewTransitionClassClosing

            modal.style.viewTransitionName = ""
            modal.style.viewTransitionClass = ""

            modalRef.current?.close()
        })

        await transition.finished

        originElement.style.viewTransitionName = ""
        originElement.style.viewTransitionClass = ""
        originElement.removeAttribute("origin-element")
    }

    return (
        <div>
            <button className={`${triggerStyles} cursor-pointer`} onClick={openModal} ref={originElementRef}>
                {trigger}
            </button>
            
            <dialog 
            className={`${contentStyles} relative`} 
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
                <button className="absolute top-2 right-2" onClick={closeModal}>
                    X
                </button>
                {content}
            </dialog>
        </div>
    )
}
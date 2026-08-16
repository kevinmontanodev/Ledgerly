import { useModalStore } from "@/store/modal.store";
import { useRef } from "react";


export function useViewTransitionModal(){
    const modalRef = useRef<HTMLDialogElement>(null)
    const originRef = useRef<HTMLElement | null>(null)
    const {close} = useModalStore()

    const viewTransitionClass = "vt-element-animation";
    const viewTransitionClassClosing = "vt-element-animation-closing"

    const closeToDown = async () => {
        const originElement = originRef.current
        const modal = modalRef.current
        
        if (!modal) return

        if (!document.startViewTransition || !originElement){
            modalRef.current?.close()
            close()
            return
        }

        originElement.style.viewTransitionName = ""
        originElement.style.viewTransitionClass = ""
        originRef.current = null

        modal.style.viewTransitionName = "vt-modal-down"
        modal.style.viewTransitionClass = "vt-element-down"
        

         const transition = document.startViewTransition(() => {
            modal.style.viewTransitionName = ""
            modal.style.viewTransitionClass = ""
            modal.close()
        })

        await transition.finished

        close()
    }

    const openModal = async (originElement: HTMLElement | null) => {
        const modal = modalRef.current
        if (!modal) return

        originRef.current = originElement ?? null

        if (!document.startViewTransition || !originElement) {
            modalRef.current?.showModal()
            return
        }

        modal.style.viewTransitionName = "vt-shared"
        originElement.style.viewTransitionName = "vt-shared"
        
        modal.style.viewTransitionClass = viewTransitionClass
        originElement.style.viewTransitionClass = viewTransitionClass

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
        const originElement = originRef.current
        const modal = modalRef.current
        
        if (!modal) return

        if (!document.startViewTransition || !originElement){
            modalRef.current?.close()
            return
        }

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
        originRef.current = null
        close()
    }

    return {modalRef, openModal, closeModal, originRef, closeToDown}
}
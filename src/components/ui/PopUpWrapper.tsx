'use client'

import { ReactNode, useEffect, useRef, useState } from "react"

export function PopUpWrapper({trigger, content, triggerStyles, contentStyles, title, closeOnContentClick}: {trigger: ReactNode, content:ReactNode, triggerStyles?:string, contentStyles?:string, title?:string, closeOnContentClick: boolean}){
    const [show,setShow] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const popUpRef = useRef<HTMLDivElement>(null)
    const originElementRef = useRef<HTMLButtonElement>(null)
    const viewTransitionClass = "vt-element-animation";
    const viewTransitionClassClosing = "vt-element-animation-closing"

    useEffect(() => {
        if (!show) return
    
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)){
                setShow(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [show])
    
    const togglePopUp = async () => {
        const originElement = originElementRef.current

        if (!document.startViewTransition) {
            setShow(!show)
            return
        }

        if (!popUpRef.current || !originElement) return

        const popUp = popUpRef.current

        popUp.style.viewTransitionName = "vt-shared"
        popUp.style.viewTransitionClass = viewTransitionClass

        originElement.style.viewTransitionName = "vt-shared"
        originElement.style.viewTransitionClass = viewTransitionClass
        originElement.setAttribute("origin-element", "")

        const transition = document.startViewTransition(() => {
            originElement.style.viewTransitionName = ""
            originElement.style.viewTransitionClass = ""

            setShow(!show)
        })

        await transition.finished

        popUp.style.viewTransitionName = ""
        popUp.style.viewTransitionClass = ""
    }

    const closePopUp = async () => {
        const originElement = originElementRef.current

        if (!popUpRef.current || !originElement) return

        const popUp = popUpRef.current

        popUp.style.viewTransitionName = "vt-shared"
        popUp.style.viewTransitionClass = viewTransitionClassClosing

        const transition = document.startViewTransition(() => {
            originElement.style.viewTransitionName = "vt-shared"
            originElement.style.viewTransitionClass = viewTransitionClassClosing

            popUp.style.viewTransitionName = ""
            popUp.style.viewTransitionClass = ""

            setShow(false)
        })

        await transition.finished

        originElement.style.viewTransitionName = ""
        originElement.style.viewTransitionClass = ""
        originElement.removeAttribute("origin-element")
    }


    return (
        <div className="relative" ref={containerRef}>
            <button className={`${triggerStyles} cursor-pointer`} ref={originElementRef} onClick={togglePopUp}>
                {trigger}
            </button>

            <div className={`${contentStyles} absolute ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} origin-top-right transition-all duration-300`} 
            ref={popUpRef} 
            onClick={(e) => {
                e.stopPropagation()
                if (closeOnContentClick) closePopUp()
            }}>
                <div>
                    {content}
                </div>
            </div>
        </div>
    )
}
"use client"

import { ReactNode, useEffect, useRef } from "react"
import gsap from "gsap"

export function AnimatedCard({ children, styles }: {children: ReactNode,styles? : string }) {
    const ref = useRef(null)

    useEffect(() => {
        gsap.from(ref.current, {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
    }, [])

    return <div className={`${styles}`} ref={ref}>{children}</div>
}
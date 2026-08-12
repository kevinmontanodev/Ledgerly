import { ReactNode } from "react";

export interface ButtonProps {
    variant: "PRIMARY" | "SECONDARY" | "CLEAN",
    type?: "button" | "submit"
    className?:string,
    onClick?: () => void,
    children: ReactNode,
    disabled?: boolean
}
export function Button({className, onClick, children, type = "button",  variant, disabled}: ButtonProps){
    const defaultStylesByType = variant === "PRIMARY" ? 'bg-black hover:bg-black/90 text-white font-semibold' 
    : variant === "SECONDARY" ? 'bg-zinc-300 hover:bg-zinc-400 font-semibold' : ''

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`${className} ${defaultStylesByType} transition-all rounded-full ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
            {children}
        </button>
    )
}
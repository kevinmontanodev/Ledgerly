import { ReactNode } from "react";

export function CardWrapper({children, styles}:{children: ReactNode, styles?:string}){
    return (
        <div className={`${styles} bg-white rounded-2xl`}>
            {children}
        </div>
    )
}
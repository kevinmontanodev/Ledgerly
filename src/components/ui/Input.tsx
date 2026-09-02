export interface InputProps {
    label: string
    id: string
    placeHolder?: string
    value: string | number
    required: boolean
    type: 'text' | 'number'
    onChange: (value: string) => void
}

export function Input({id,label, value,type,placeHolder,required,onChange}:InputProps){
    return (
        <fieldset>
            <label htmlFor={id} className="text-xs font-semibold">{label} {required && <span className="text-red-600">*</span>}</label>
            <input type={type} placeholder={placeHolder} 
                className="p-2 bg-indigo-300/20 rounded-lg text-xs w-full outline-none"
                id={id}
                value={value}
                required={required}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            />
        </fieldset>
    )
}
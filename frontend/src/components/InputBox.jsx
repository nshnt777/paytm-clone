import React from 'react'

const InputBox = React.memo(({label, type, placeholder, onChange, name}) => {
    return(
        <div className="py-2">
            <div className="text-left font-medium pb-1">
                {label}
            </div>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                autoComplete='true' 
                onChange={onChange} 
                className="border-2 border-solid border-slate-300 rounded p-1 px-2 w-full [&::-webkit-inner-spin-button]:appearance-none" />
        </div>
    )
});

export default InputBox;
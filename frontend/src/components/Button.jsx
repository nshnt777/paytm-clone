import React from 'react'

const Button = React.memo(({text, onClick, BGcolour})=>{
    let BGhover = `hover:bg-green-700`;

    if(!BGcolour){
        BGcolour = 'bg-sky-500'
        BGhover = 'hover:bg-sky-700'
    }
    return(
        <button onClick={onClick} className={`w-full ${BGcolour} rounded-lg p-2 my-2 text-white text-lg font-medium ${BGhover} focus:outline-none active:ring-2 active:ring-gray-300`}>
            {text}
        </button>
    )
});

export default Button
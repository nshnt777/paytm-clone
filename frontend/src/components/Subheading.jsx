import React from 'react'


const Subheading = React.memo(({text})=>{
    return(
        <div className="text-slate-500 text-lg text-center pt-1 px-4 pb-4">
            {text}
        </div>
    )
})

export default Subheading;
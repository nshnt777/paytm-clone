import React from 'react'

const Heading = React.memo(({text})=>{
    return(
        <div className="font-bold text-4xl text-center ">
            {text}
        </div>
    )
})

export default Heading;
import {Link} from 'react-router-dom'
import React from 'react'

const BottomWarning = React.memo(({text, buttonText, to}) => {
    return(
        <div className='text-center text-sm pt-2'>
            {text}
            <Link to={to} className='underline underline-offset-4 cursor-pointer' >
                {buttonText}
            </Link>
        </div>
    )
})

export default BottomWarning
import { useEffect, useState } from "react";

function useDebounce(value, timeout){
    const [deboucedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        let timeoutID = setTimeout(() => {
            setDebouncedValue(value);
        }, timeout);

        //cleanup function
        return ()=>{
            clearInterval(timeoutID)
        }
        //cleans up the previous clock
    }, [value]);

    return deboucedValue;
}

export default useDebounce;
import React, { useEffect, useState, useCallback } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    // **ADD DEBOUNCING**
    useEffect(()=>{
        const authToken = localStorage.getItem("token");
        
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((result)=>{
                setUsers(result.data.users);
            })
            .catch((error)=>{
                if (error.response) {
                    console.log("Error status:", error.response.status);
                    console.log("Error:", error.response.data.message);
                } else if (error.request) {
                    console.log("No response received:", error.request);
                } else {
                    console.log("Error setting up the request:", error.message);
                }
            })
    }, [filter])

    return(
        <div className="m-4">
            <div className="font-bold text-lg">
                Users
            </div>
            <input 
                type="search" 
                placeholder="Search users..." 
                name="userSearch" 
                className="border-2 border-solid border-slate-300 rounded my-2 px-2 py-1 w-full focus:outline-none focus:border-black"
                onChange={useCallback((e)=>{
                    setFilter(e.target.value);
                }, [filter])}
            />
            <div>
                {users.map((user)=>{
                    return <User user={user} key={user._id} />
                })}
            </div>
        </div>
    )
}

const User = React.memo(({user})=>{
    const navigate = useNavigate();

    return(
        <div className="flex justify-between my-4">
            <div className="flex">

                <div className="bg-slate-200 rounded-full h-12 w-12 flex justify-center items-center text-xl">
                    {user.firstName[0]}
                </div>

                <div className="flex justify-center items-center h-full ml-4 text-xl font-medium">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button 
                    className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg focus:outline-none active:ring-2 active:ring-blue-100 font-medium text-sm px-5 py-2.5 me-2 h-10" 
                    onClick={()=>{
                        navigate(`/transfer?id=${user._id}&name=${user.firstName + " " + user.lastName}`)
                    }} 
                >
                    Send Money
                </button>
            </div>
        </div>
    )
});

export default Users
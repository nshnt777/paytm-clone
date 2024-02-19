import {useEffect, useState} from 'react'
import Appbar from '../components/Appbar.jsx'
import Balance from '../components/Balance.jsx'
import axios from 'axios'

function UpdateProfile(){
    const[balance, setBalance] = useState();
    const [user, setUser] = useState({});

    useEffect(()=>{
        const authToken = localStorage.getItem("token");

        const headers = {Authorization: `Bearer ${authToken}`}

        const requests = [
            axios.get("https://paytm-clone-api-git-test-nishants-projects-85360d67.vercel.app/v1/account/balance", {headers}),
            axios.get("https://paytm-clone-api-git-test-nishants-projects-85360d67.vercel.app/v1/user/me", {headers})
        ]

        Promise.all(requests)
            .then((responses) => {
                const [result1, result2] = responses;

                setBalance(result1.data.balance.toFixed(2));
                
                setUser(result2.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Error status:", error.response.status);
                    console.log("Error:", error.response.data.message);
                } else if (error.request) {
                    console.log("No response received:", error.request);
                } else {
                    console.log("Error setting up the request:", error.message);
                }
            });
    }, []);


    return(
        <div className="w-screen h-screen p-5">
            <Appbar user={user} />
            <Balance value={balance} />
        </div>
    )
}

export default UpdateProfile;
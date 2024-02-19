import Heading from '../components/Heading.jsx'
import InputBox from '../components/InputBox.jsx'
import Button from '../components/Button.jsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useState } from 'react';
import axios from 'axios';

function SendMoney(){
    const [searchParams] = useSearchParams();
    
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [money, setMoney] = useState(0);

    const authToken = localStorage.getItem("token");

    const navigate = useNavigate();
    
    return(
        <div className="w-screen h-screen bg-sky-50 sm:flex sm:justify-center sm:items-center">
            <div className='size-full sm:size-fit sm:w-3/5 md:w-1/2 lg:w-2/5 bg-white sm:bg-transparent flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-evenly size-full bg-white sm:shadow-md rounded-md p-10 m-10 sm:p-6 sm:m-0'>

                    <Heading text={"Send Money"} />

                    <div className="flex items-center mt-20 mb-1">
                        <div className="bg-green-500 rounded-full h-12 w-12 flex justify-center items-center text-xl text-white">
                            {name[0].toUpperCase()}
                        </div>

                        <div className="flex justify-center items-center h-full ml-4 text-2xl font-bold">
                            {name}
                        </div>
                    </div>

                    <InputBox 
                        label={"Amount (in Rs)"} 
                        type={"number"} 
                        name={"transferAmount"}
                        placeholder={"Enter Amount"} 
                        onChange = {useCallback((e)=>{
                            setMoney(parseFloat(e.target.value));
                        })}
                    />


                    <Button text={"Pay Now"} BGcolour={"bg-green-500"} onClick={async ()=>{
                        if(money<0){
                            alert("Invalid input");
                            return;
                        }
                        else if(money === 0){
                            return;
                        }
                        try{
                            const result = await axios.post("https://paytm-clone-api.vercel.app/api/v1/account/transfer", {
                                to: id,
                                amount: money
                            }, {
                                headers: {
                                    Authorization: `Bearer ${authToken}`
                                }
                            });

                            if(result.data.message){
                                console.log(result.data.message);
                                alert("Payment successful");
                                navigate('/dashboard');
                            }
                        }
                        catch(error){
                            if (error.response) {
                            console.log("Error status:", error.response.status);
                            console.log("Error:", error.response.data.message);
                            } else if (error.request) {
                                console.log("No response received:", error.request);
                            } else {
                                console.log("Error setting up the request:", error.message);
                            }
                        }
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default SendMoney
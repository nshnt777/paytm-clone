import Heading from '../components/Heading.jsx'
import Subheading from '../components/Subheading.jsx'
import InputBox from '../components/InputBox.jsx'
import Button from '../components/Button.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return(
        <div className="w-screen h-screen bg-sky-100 sm:flex sm:justify-center sm:items-center">
            <div className='size-full sm:size-fit sm:w-3/5 md:w-1/2 lg:w-2/5 bg-white sm:bg-transparent flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-evenly size-full bg-white sm:shadow-md rounded-md p-10 m-10 sm:p-6 sm:m-0'>
                    <Heading text={"Log In"} />

                    <Subheading text={"Enter your credentials to access your account"} />

                    <InputBox 
                        type={"email"} 
                        label={"Email"} 
                        name={"username"}
                        placeholder={"John@email.com"}
                        onChange = {useCallback((e)=>{
                            setUsername(e.target.value);
                        }, [username])}
                    />

                    <InputBox 
                        type={"password"} 
                        label={"Password"} 
                        name={"password"}
                        placeholder={"123456"} 
                        onChange = {useCallback((e)=>{
                            setPassword(e.target.value);
                        }, [password])}
                    />

                    <Button text={"Login"} onClick={async ()=>{
                        try{
                            const result = await axios.post("https://paytm-clone-api.vercel.app/api/v1/user/login", {
                                username: username,
                                password: password
                            });
                            
                            localStorage.setItem("token", result.data.token);
                            navigate('/dashboard');
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
                    }} />

                    <BottomWarning text={"Don't have an acccount? "} buttonText={"Sign Up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}

export default Login
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SendMoney from './pages/SendMoney.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import { useEffect } from 'react'
import axios from 'axios'


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/transfer' element={<SendMoney />} />
          <Route path='/update' element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home(){
  const navigate = useNavigate();

  useEffect(()=>{
    const authToken = localStorage.getItem("token");

    if(!authToken){
      navigate('/login');
    }
    else{
      axios.get("https://paytm-clone-api.vercel.app/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then((result) => {
          navigate('/dashboard');
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error:", error.response.data.message);
          } 
          else if (error.request) {
            console.log("No response received:", error.request);
          } else {
            console.log("Error setting up the request:", error.message);
          }
        });
    }
  }, []);

  return null;
}

export default App

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Appbar({ user }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="flex justify-between shadow-lg p-2 px-5 bg-sky-500 rounded text-white h-12 items-center">
            <div className="text-xl font-medium h-full">
                PayTM App
            </div>
            <div className="flex items-center">
                <div className='h-full'>
                    Hello
                </div>

                <div className="text-white hover:bg-sky-600 rounded px-1 text-center flex cursor-pointer w-full h-full" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} > 

                    {user.firstName} 

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-0 pl-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    {isDropdownOpen ? <DropDown user={user}/> : null }
                </div>

            </div>
        </div>
    )
}


function DropDown({user}) {
    const navigate = useNavigate();
    
    function handleLogout(){
        const ans = confirm("Are you sure you want to Log Out?");
        console.log(ans);
        if(ans === true){
            console.log('Logging out...');
            // localStorage.removeItem('token');
            navigate('/login');
        }
        else{
            //do nothing
        }
    };

    return (
        <div  className="absolute top-14 right-6 z-10 bg-white divide-y divide-gray-300 rounded-lg shadow-lg w-44 block" >
                    <div className="px-4 py-3 text-sm text-black" >

                        <div>{user.firstName} {user.lastName}</div>

                        <div className="font-medium truncate">{user.username}</div>
                    </div>

                    <ul className="py-1 text-sm text-black">
                        <li>
                            <Link 
                                to='/dashboard' className="block px-4 py-2 hover:bg-sky-100">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/update"  className="block px-4 py-2 text-sm text-black hover:bg-sky-100">
                                Update Profile
                            </Link>
                        </li>
                    </ul>
                    <div className="py-2">
                        <div className="block px-4 py-2 text-black hover:bg-sky-100" onClick={handleLogout}>
                            Sign out
                        </div>
                    </div>

                </div>
    )
}

export default Appbar
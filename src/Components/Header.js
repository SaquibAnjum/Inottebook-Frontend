import React, { useState, useEffect } from 'react';
import { IoMdClose, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const Header = ({ mode, setmode }) => {
    const [user, setUser] = useState([]);
    const [close, setclose] = useState(false);
    const navigate = useNavigate();

    const handleLogout = ({ params }) => {
        localStorage.removeItem('token');
        navigate('/loginsignup');
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://inotebook-api-cyan.vercel.app/api/auth/user', {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    console.log(data)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    const handledarkmode = () => {
        if (mode === "light") {
            setmode("dark")
        }
        else {
            setmode("light")
        }
    }

    return (
        <div className={` ${mode === "light" ? "bg-[#1b7effd9]" : "bg-[#080917] text-white"} `}>
            <div className='flex justify-between w-full md:w-[90%] lg:w-[90%] mx-auto p-4 px-8 items-center -z-40'>

                <div className={`flex `} >
                    <img className={`text-xl font-semibold rounded-full w-10 h-10 space-x-2 mt-1`} src="https://assetstorev1-prd-cdn.unity3d.com/key-image/41117bb2-a3bd-4a34-95ce-b065df887955.jpg" alt="" />

                    <h1 className="text-2xl font-bold px-4 py-2 tracking-wide hover:text-blue-900 transition duration-300">
  iNotebook
</h1>

                </div>

                <div className='flex gap-6 items-center '>
                    <div className='relative logout flex '>
                        <div className='cursor-pointer font-semibold text-sm  p-2 px-4 rounded hover:rounded-md boxshadowe bg-red-700 text-white ' onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                    <div>
                        <div><FaUserAlt className='text-xl cursor-pointer font-bold ' onClick={() => setclose(!close)} /></div>
                    </div>
                    <div onClick={handledarkmode} className='cursor-pointer'>
                        {mode === 'light' ?
                            <MdDarkMode className='text-xl transition' title="Dark Mode" /> :
                            <FaSun className='text-xl hover:text-yellow-400 transition' title="Light Mode" />
                        }
                    </div>
                </div>
            </div>


            {close && <div className='absolute flex items-center justify-center w-full  mx-auto min-h-[80vh] z-40 '>
                <div className={`${mode === "light" ? "bg-[rgb(66,147,222)]" : "bg-[#fff] text-black"} rounded-lg flex flex-col  gap-3 p-7`}>
                    <IoMdClose onClick={() => setclose(!close)} className='text-xl cursor-pointer font-bold ' />

                    <div className='flex justify-center text-xl font-semibold '>
                        Profile
                    </div>
                    <div className='flex font-semibold  text-sm'>
                        Name : {user.name}
                    </div>
                    <div className='flex font-semibold text-sm '>
                        Email : {user.email}
                    </div>

                </div>
            </div>}
        </div>
    );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { IoMdClose, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
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
        <div className={` ${mode === "light" ? "bg-[#1755a68d]" : "bg-[#080917] text-white"} `}>
            <div className='flex justify-between w-full md:w-4/5 lg:w-2/3 mx-auto p-5  items-center -z-40'>

                <div className={`text-xl font-semibold `} >
                    Inotebook
                </div>

                <div className='flex gap-8 items-center '>
                    <div className='relative logout flex '>
                        <div className='cursor-pointer font-semibold text-xs  px-2 p-1 rounded hover:rounded-md shadow-2xl border ' onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                    <div>
                        <div><CgProfile className='text-2xl cursor-pointer font-bold ' onClick={() => setclose(!close)} /></div>
                    </div>
                    <div>
                        <div><MdDarkMode className='text-2xl cursor-pointer font-bold ' onClick={handledarkmode} /></div>
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

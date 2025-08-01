import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setsignup] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange1 = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert('User created successfully.');
        localStorage.setItem("token", response.authtoken);
        navigate('/');
      } else {
        alert('Error creating user: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className='relative'>
      <div className='w-full mx-auto flex justify-center items-center flex-col px-4 '>
        <div>
          <h1 className='text-2xl font-bold'>Register to Inotebook</h1>
        </div>
        <form className='my-9 w-full flex flex-col gap-9' onSubmit={handleSignUp}>
          <input type="text" name="" id="name" placeholder='Enter Name' className='border-b-2 p-2 border-black outline-none w-full' value={name} onChange={handleNameChange} required minLength={3} />
          <input type="email" name="" id="email" placeholder='Enter Email' className='border-b-2 p-2 border-black outline-none w-full' value={email} onChange={handleEmailChange} required />
          <input type="password" name="" id="password" placeholder='Enter Password' className='border-b-2 p-2 border-black outline-none w-full' value={password} onChange={handlePasswordChange1} required minLength={8} />
          <button type="submit" className='p-2 bg-[#ff9719]  font-semibold rounded-xl'>Register</button>
        </form>
      </div>

      <div className={`absolute  bg-green-400 text-xl p-4 w-full text-center font-semibold top-1 ${signup === true ? "opacity-1" : "opacity-0"}`} style={{ transition: "2s all ease" }}>User Created Successfully.</div>
    </div>

  );
};

export default Signup;

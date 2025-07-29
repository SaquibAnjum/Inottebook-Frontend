import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = ({mode, setmode}) => {
    return (
        <div className={` ${mode === "light" ? "bg-[#feb55b] text-black" : "bg-[#14152d] text-white"} w-full flex  justify-between md:justify-around p-3 items-center py-7`}>
            <div className='text-xl font-semibold'>INotebook</div>
            <div className='flex gap-9'>
                <div><a href="https://www.instagram.com/saquibanjumkhan?igsh=OWh4Z3o5N3Z5aGE4"><FaInstagram className='text-3xl hover:box-shadow'/></a></div>
                <div><a href="https://www.linkedin.com/in/md-saquib-anjum-khan-414510254/"><FaLinkedin className='text-3xl hover:box-shadow'/></a></div>
                <div><a href="https://github.com/SaquibAnjum"><FaGithub className='text-3xl hover:box-shadow'/></a></div>
            </div>
        </div>
    )
}

export default Footer

import React from 'react'
import {assets} from "../assets/assets.js"
import {useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/Appcontext.jsx';

const Navbar = () => {
    // const navigate = useNavigate();
    const {navigate,token} = useAppContext()
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
        <img onClick={()=>navigate("/")} src={assets.logo} className='w-32 sm:w-44 cursor-pointer'/>
        <button onClick={()=>navigate("/admin")}  className='flex justify-between gap-2 items-center px-10 py-2.5 text-sm rounded-full bg-primary text-white cursor-pointer'>
            {token ? 'Dashboard' : 'Login'}
            <img src={assets.arrow} alt="arrow" className='w-3' />
        </button>
    </div>
  )
}

export default Navbar
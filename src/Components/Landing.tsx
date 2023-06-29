import React from 'react'
import { useAuth } from '../Contexts/AppContext'
import { Link } from 'react-router-dom'

export default function Landing() {

    const { isLightToggled } = useAuth()
    return (
        <div className={`font-jakarta p-6 ${isLightToggled ? 'bg-[#f5f4fd]' : 'bg-[#20212C]'} min-h-[100dvh] flex flex-col justify-between`}>
            <div className='flex items-center gap-3'>
                <img src='logo.svg' 
                    className='min-w-[1.5rem] h-8'
                />
                <h2 className={`text-[1.5rem] ${isLightToggled ? 'text-black' : 'text-white'} font-extrabold`}>TaskMate</h2>
            </div>
            <div className='flex items-center justify-between'>
                <div className='md:w-[50%]'>
                    <h1 className={`${isLightToggled ? 'text-black' : 'text-white'} text-[2.5rem] font-[700] tracking-wider mb-4`}>PRO<span className='text-[#635fc7]'>TASK</span>MATE</h1>
                    <img 
                        src='LandingImage.png'
                        className='md:hidden w-full max-w-[500px]'
                    />
                    <p className='text-[#828fa3] text-base'>Easily create, edit, delete boards and tasks, and switch between boards with sidebar navigation. With its sleek and intuitive interface, it’s never been easier to stay on top of your to-do list and keep your projects organized</p>
                    <Link to='/login'>
                        <button  className='text-[0.875rem] text-black p-2 rounded-md shadow-md shadow-[#0003] font-semibold mt-4 bg-slate-300'>LOGIN/REGISTER</button>
                    </Link>
                </div>
                <img 
                    src='LandingImage.png'
                    className='hidden md:block w-[45%]'
                />
            </div>
            <div></div>
        </div>
    )
}

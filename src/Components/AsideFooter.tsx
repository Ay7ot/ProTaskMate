import React, {useEffect} from 'react'
import {MdWbSunny} from 'react-icons/md'
import {RiMoonClearFill, RiDeleteBin2Fill} from 'react-icons/ri'
import {BiHide} from 'react-icons/bi'
import {TbUserOff} from 'react-icons/tb'
import { useAuth } from '../Contexts/AppContext'
import { deleteUserAccount, logout } from '../Functions/Functions'

export default function AsideFooter() {

    const {dispatch, isLightToggled} = useAuth()

    useEffect(()=>{
        if(isLightToggled === true){
            localStorage.setItem('theme', 'light')
        }else {
            localStorage.setItem('theme', 'dark')
        }
    },[isLightToggled])

    function logoutUser(){
        logout()
        dispatch({
            type: 'setLogout'
        })
    }

    function setTheme(){
        dispatch({
            type: 'setIsLightToggled'
        })
    }

    return (
        <div className='md:absolute md:left-10 md:bottom-0 transition-all delay-100 ease-linear'>
            <div className={`flex rounded-md items-center justify-center w-[220px] ${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C] '} py-2 text-[#828fa3] text-[1.3rem] gap-4`}>
                <i><RiMoonClearFill /></i>
                <div className='rounded-full w-[45px] h-[23px] p-1 bg-[#635FC7]' onClick={()=>{setTheme()}}>
                    <div className={`bg-white rounded-full h-[15px] w-[15px] ${isLightToggled ? 'ml-5' : ''}`}></div>
                </div>
                <i><MdWbSunny /></i>
            </div>
            <div className='mt-4 flex flex-col justify-center md:justify-between gap-2 px-4'>
                <div onClick={()=>{dispatch({type: 'setSidebarFalse'})}} className='cursor-pointer hidden md:flex items-center gap-3 text-[0.9rem] font-semibold text-[#828fa3]'>
                    <i className='text-[1.2rem]'><BiHide /></i>
                    <p>Hide Sidebar</p>
                </div>
                <div className='flex cursor-pointer items-center gap-3 text-[0.9rem] font-semibold text-[#828fa3]' onClick={logoutUser}>
                    <i className='text-[1.1rem] text-[#c22d2d]'><TbUserOff /></i>
                    <p className=''>Logout</p>
                </div>
            </div>
        </div>
    )
}

import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AppContext'
import {  loginUser } from '../Functions/Functions'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import GoogleSignIn from './GoogleSignIn'
import {FaUser} from 'react-icons/fa'

export default function Login() {
    
    const { currentUser, isLightToggled, password, email, dispatch, errorMessage } = useAuth()

    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        dispatch({
            type: 'setNoParameter'
        })
    },[])
    
    function useGuest() {
        dispatch({
            type: 'setCurrentUser',
            payload: {
                currentUserPayload: 'Guest'
            }
        })
    }

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
       
        e.preventDefault()
        if(password === '' || email === ''){
            return dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Complete the form'
                }
            })
        }
        
        try{
            setLoading(true)
            await loginUser(email, password)
            
        }catch{
            dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Failed to Log In'
                }
            })
        }finally{
            setLoading(false)
        }
    }


    if(currentUser){
        return <Navigate to ='/' />
    }
    
    
    if(loading){
        return <Loader />
    }
    
    return (
        <div className={`min-h-screen ${isLightToggled ? 'bg-[#f5f4fd]' : 'bg-[#20212C]'} flex flex-col justify-center items-center`}>
            <h2 className='font-bold tracking-wider text-[2rem] mb-6 text-[#635fc7]'>LOG IN</h2>
            {errorMessage !== '' && <p className='p-2 w-[300px] bg-red-400 mb-6 text-white'>{errorMessage}</p>}
            <form className='flex flex-col gap-5' onSubmit={handleLogin}>
                <input 
                    type='email'
                    value={email}
                    name='Email'
                    onChange={e => {
                       return dispatch({
                            type: 'setEmail',
                            payload: {
                                emailPayload: e.target.value
                            }
                        })
                    }}
                    className='p-4 border-[2px] w-[350px] border-none focus:border-[#635fc7] outline-none rounded-md'
                    placeholder='Email'
                />
                <input 
                    type='password'
                    value={password}
                    name='Password'
                    onChange={e => {
                       return dispatch({
                            type: 'setPassword',
                            payload: {
                                passwordPayload: e.target.value
                            }
                        })
                    }}
                    className='p-4 border-[2px] w-[350px] focus:border-[#635fc7] outline-none border-none rounded-md'
                    placeholder='Password'
                />
                <Link to='/forgotPassword' className='text-[#635fc7]'>Forgotten Password?</Link>
                <button disabled={loading} className='text-white w-[350px] p-4 bg-[#635fc7] rounded-lg text-[1.3rem] font-semibold tracking-wide'>Login</button>
                <button type='button' onClick={useGuest} className='text-white w-[350px] p-4 bg-[#635fc7] rounded-lg text-[1.2rem] font-semibold tracking-wide flex items-center justify-center gap-3'><i><FaUser /></i> Browse as Guest</button>
            </form>
            <GoogleSignIn />
            <p className={`mt-6 ${isLightToggled ?'text-black':'text-white'}`}>Need an account? <Link to='/signup' className='text-[#635fc7] '>Sign Up</Link></p>
        </div>
    )
}

import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AppContext'
import {  loginUser } from '../Functions/Functions'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import GoogleSignIn from './GoogleSignIn'

export default function Login() {
    
    const {currentUser, password, email, dispatch, errorMessage } = useAuth()

    const [loading, setLoading] = useState(false)
    
    
    useEffect(()=>{
        dispatch({
            type: 'setNoParameter'
        })
    },[])
    
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
        }
        setLoading(false)
    }

    if(currentUser){
        return <Navigate to ='/' />
    }
    
    if(loading){
        return <Loader />
    }
    
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='font-bold text-[2rem] mb-6 text-blue-400'>LOG IN</h2>
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
                    className='p-2 border-[2px] w-[300px] border-[#808080] focus:border-blue-400 outline-none rounded-md'
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
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#8a8383] rounded-md'
                    placeholder='Password'
                />
                <Link to='/forgotPassword' className='text-blue-400'>Forgotten Password?</Link>
                <button disabled={loading} className='text-white w-[300px] p-4 bg-blue-400 rounded-lg text-[1.3rem] font-bold tracking-wide'>Login</button>
            </form>
            <GoogleSignIn />
            <p className='mt-6 text-white'>Need an account? <Link to='/signup' className='text-blue-400 '>Sign Up</Link></p>
        </div>
    )
}

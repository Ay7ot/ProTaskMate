import { Navigate } from 'react-router-dom'
import {  useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AppContext' 
import { onValue, ref } from '@firebase/database'
import { db } from '../firebase'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'
import { createNewBoard, logout } from '../Functions/Functions'
import { Board } from './Board'
import BoardPage from './BoardPage'

export default function DashBoard() {
    const { currentUser, dispatch , username, Boards, currentBoard } = useAuth()
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        if(username===''){
            onValue(ref(db, '/users'), snapshot=>{
                const data = snapshot.val()
                if(data !== null){
                    for(let key in data) {
                    if(data[key].email === currentUser?.email && data[key].username){
                        dispatch({
                            type: 'setUsername',
                            payload: {
                                usernamePayload: data[key].username
                            }
                        })
                    }else if(data[key].email === currentUser?.email && !data[key].username){
                       if(currentUser?.displayName){
                            dispatch({
                                type: 'setUsername',
                                payload: {
                                    usernamePayload: currentUser?.displayName
                                }
                            })
                       }
                    }
                    }
                }
            }) 
        }
    },[location.pathname])

    useEffect(()=>{
        if(currentUser?.displayName && username === ''){
            dispatch({
                type: 'setUsername',
                payload: {
                    usernamePayload: currentUser.displayName
                }
            })
        }
    },[])

    useEffect(()=>{
        if(username!=='' && Boards.length === 0){

            const reference = ref(db, 'users/'+username+'/tasks')
            onValue(reference, snapshot=>{
                const data = snapshot.val()
                dispatch({
                    type: 'setBoards',
                    payload:{
                        BoardsPayload: data
                    }
                })
            })

        }
    },[username, Boards])

    async function generateBoard(){
        setLoading(true)
        await createNewBoard(username, Board)
        setLoading(false)
    }
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    if(username === ''){
        return <Loader />
    }

    function logoutUser(){
        logout()
        dispatch({
            type: 'setNoUser'
        })
        dispatch({
            type: 'setNoParameter'
        })

        dispatch({
            type: 'setNoBoards'
        })
    }
    
    return (
        <div className=''>
            <BoardPage />
            <button className='bg-blue-100 p-2 text-white rounded-sm' onClick={logoutUser}>Logout</button>
            <button disabled={loading} className='text-white ml-3 bg-blue-600 rounded-md p-2' onClick={generateBoard}>Create New Board</button>
        </div>
    )
}

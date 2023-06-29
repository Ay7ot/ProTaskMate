import { useState, useEffect} from 'react'
import { useAuth } from '../Contexts/AppContext'
import Aside from './Aside';
import {defaultBoard} from '../data'
import Body from './Body';
import Header from './Header';
import AddColumnModal from './Modals/AddColumnModal';
import AddNewTask from './Modals/AddNewTask';
import BoardsModal from './Modals/BoardsModal';
import CreateNewBoard from './Modals/CreateNewBoardModal';
import DeleteBoardModal from './Modals/DeleteBoardModal';
import DeleteTaskModal from './Modals/DeleteTaskModal';
import EditBoardModal from './Modals/EditBoardModal';
import EditModal from './Modals/EditModal';
import EditTaskModal from './Modals/EditTaskModal';
import ShowTaskModal from './Modals/ShowTaskModal';
import SideEye from './Modals/SideEye';
import { onValue, ref } from '@firebase/database';
import { db } from '../firebase';
import Loader from './Loader';

export default function BoardPage() {

    const { Boards, username, currentUser, dispatch, modals, currentBoard } = useAuth()
    
    const [currentBoardSet, setCurrentBoardSet] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(currentUser === 'Guest'){
            setTimeout(()=>{
                dispatch({
                    type: 'setBoards',
                    payload: {
                        BoardsPayload: defaultBoard
                    }
                })
            }, 2000)
        }
    }, [])

    useEffect(()=>{
        if(username !=='' && !Boards || Boards?.length === 0){
            setLoading(true)
            const reference = ref(db, 'users/'+username+'/tasks')
            onValue(reference, snapshot=>{
                const data = snapshot.val()
                if(data!==null){
                    dispatch({
                        type: 'setBoards',
                        payload:{
                            BoardsPayload: data
                        }
                    })
                } else {
                    dispatch({
                        type: 'setBoards',
                        payload:{
                            BoardsPayload: null
                        }
                    })
               }
            })
            setLoading(false)
        }
    },[username, Boards])

    useEffect(()=>{
        if (Boards && Boards.length > 0) {
            const mainboard = Boards.find((item) => {
                return item.isActive === true
            })
            if (mainboard) {
                dispatch({
                    type: 'setCurrentBoard',
                    payload: {
                        currentBoardPayload: mainboard
                    }
                })
                setCurrentBoardSet(true)
            }else {
                const newMainBoard = Boards[0]
                newMainBoard.isActive = true
                dispatch({
                    type: 'setCurrentBoard',
                    payload: {
                        currentBoardPayload: newMainBoard
                    }
                })
            }
        }
    },[Boards, currentBoard])

    
    useEffect(()=>{
        dispatch({
        type: 'setCurrentBoardCopy',
        payload: {
            currentBoardCopyPayload: currentBoard
        }
        })
    }, [currentBoard])

    const {editBoardmodal, addTaskModal, editModal, boardsModal, deleteBoardModal, addColumnModal, showTaskModal, deleteTaskModal, editTaskModal,createBoardModal } = modals
    
    if(currentUser === 'Guest' && Boards?.length === 0){
        return <Loader />
    }
    if(currentBoard === null){
        return <Loader />
    }
    
    return (
        <div className=''>
            <Header />
            {boardsModal && <div className='md:hidden relative'><BoardsModal /></div>}
            {editBoardmodal && <div className='relative'><EditBoardModal /></div>}
            {deleteBoardModal && <div className='relative flex items-center justify-center'><DeleteBoardModal /></div>}
            {addColumnModal && <div className='relative flex items-center justify-center'><AddColumnModal /></div>}
            {editModal && <div className='relative flex items-center justify-center'><EditModal /></div>}
            {addTaskModal && <div className='relative flex items-center justify-center'><AddNewTask /></div>}
            {showTaskModal && <div className='relative flex items-center justify-center'><ShowTaskModal /></div>}
            {deleteTaskModal && <div className='relative flex items-center justify-center'><DeleteTaskModal /></div>}
            {editTaskModal && <div className='relative flex items-center justify-center'><EditTaskModal /></div>}
            {createBoardModal && <div className='relative flex items-center justify-center'><CreateNewBoard /></div>}
            <main className={`flex ${boardsModal || deleteBoardModal || addColumnModal || editModal || addTaskModal ||showTaskModal || deleteTaskModal || editTaskModal ||createBoardModal ? 'opacity-30 delay-100 transition-all ease-linear' : ' delay-100 transition-all ease-linear'}`}>
                <Aside />
                {loading ? <Loader /> : <Body />}
                <SideEye />
            </main>
        </div>
    )
}

import { nanoid } from "nanoid";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { allBoards } from "../data";
import { auth } from "../firebase";
import { generateId, logout } from "../Functions/Functions";
import { appReducer } from "../Reducer/appReducer";
import { AppContextType } from "../Types/types";

function getTheme(){
    const theme = localStorage.getItem("theme");
    if(theme === 'dark'){
        return false
    }else return true
}

const user = localStorage.getItem("user")

const AppContext = createContext<AppContextType>({
    currentUser: user !== null ? JSON.parse(user) : null,
    email: '',
    username: '',
    password: '',
    errorMessage: '',
    dispatch: ()=>{},
    Boards: null,
    currentBoard: null,
    modals: {
        boardsModal: false,
        editBoardmodal: false,
        deleteBoardModal: false,
        addColumnModal: false,
        editModal: false,
        addTaskModal: false,
        showTaskModal: false,
        deleteTaskModal: false,
        editTaskModal: false,
        createBoardModal: false
    },
    currentBoardCopy: null,
    newTask: {
        id: nanoid(),
        description: '',
        title: '',
        status: '',
        statusId: '',
        subtasks: [{
           title: '',
           isCompleted: false ,
           id: nanoid()
        }]
    },
    currentTask: {
        id: '',
        description: '',
        title: '',
        status: '',
        statusId: '',
        subtasks: [{
           title: '',
           isCompleted: false ,
           id: ''
        }]
    },
    isLightToggled: getTheme() || false,
    sideBarShown: true,
    newBoard: null
})

export function useAuth(){
    return useContext(AppContext)
}

export function AppProvider({children}: {children: ReactNode}){
    
    const value = useAuth()
    const [mainState, dispatch] = useReducer(appReducer, value)

    console.log(mainState)
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            dispatch({
                type: 'setCurrentUser',
                payload: {
                    currentUserPayload: user
                }
            })
            if(user){
                localStorage.setItem('user', JSON.stringify(user))
            }
        })
        return unsubscribe
    },[])

    return (
        <AppContext.Provider value={{...mainState, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

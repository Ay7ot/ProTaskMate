import { allBoards } from "../data";
import { AppActionType, AppContextType } from "../Types/types";

export function appReducer(state: AppContextType, action: AppActionType){
    switch(action.type){

        case 'setCurrentUser':
            return {
                ...state,
                currentUser: action.payload?.currentUserPayload ?? null
            }
        case 'setNoUser':
            return {
                ...state,
                currentUser: null
            }
        case 'setNoParameter':
            return {
                ...state,
                username: '',
                password: '',
                email: '',
                errorMessage: ''
            }
        case 'setUsername':
            return {
                ...state,
                username: action.payload?.usernamePayload ?? ''
            }
        case 'setEmail':
            return {
                ...state,
                email: action.payload?.emailPayload ?? ''
            }
        case 'setPassword':
            return {
                ...state,
                password: action.payload?.passwordPayload ?? ''
            }
        case 'setError':
            return {
                ...state,
                errorMessage : action.payload?.errorPayload ?? ''
            }
        case 'setBoards':
            return {
                ...state,
                Boards: action.payload?.BoardsPayload ?? []
            }
        case 'setNoBoards':
            return {
                ...state,
                Boards: []
            }
        case 'setCurrentBoard':
            return {
                ...state,
                currentBoard: action.payload?.currentBoardPayload ?? null
            }
        case 'setNoBoard':
            return {
                ...state,
                currentBoard: null
            }
        case 'setBoardsModalCurrent':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    boardsModal: true
                }
            }
        case 'setBoardsModalFalse':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    boardsModal: false
                }
            }
        case 'setEditBoardsModal':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    editBoardmodal: true
                }
            }
        case 'setEditBoardsModalFalse':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    editBoardmodal: false
                }
            }
        default:
            return state
    }
}
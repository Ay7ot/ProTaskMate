import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import { auth, db } from "../firebase";
import { allboardsType, BoardType } from "../Types/types";

export async function signUpUser(email: string, password: string, username: string, boards: BoardType[]){
    await createUserWithEmailAndPassword(auth, email, password)
    const reference = ref(db, 'users/'+username)
    
    set(reference, {
        email: email,
        username: username,
        tasks: boards
    })
    
}

export async function loginUser(email: string, password: string){
    await signInWithEmailAndPassword(auth, email, password)
}

export function logout(){
    signOut(auth)
}

export async function forgotPassword(email: string){
    await sendPasswordResetEmail(auth, email)
}

export function createInitialTaskDataOnDatabase(username: string, data: allboardsType){
    if(username!==''){
        const reference = ref(db, 'users/'+username+'/tasks')
    
        set(reference, data)
    }
}

export async function deleteUserAccount(username:string){
    const reference = ref(db, 'users/'+username)

    await remove(reference)
}

export async function createNewBoard(username:string, parameter: BoardType){
    const reference = ref(db, 'users/'+username)
    let data: BoardType[] = []
    onValue(reference, snapshot=>{
        const item = snapshot.val()
        data = item.tasks
    })
    const newdata = data.map(item=>{
        return {
            ...item,
            isActive: false
        }
    })
    update(reference, {tasks: [...newdata, parameter]})
}

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { onValue, ref, set, update } from "firebase/database"
import { auth, db } from "../firebase"
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { createBaseBoard } from "./Board"

export default function GoogleSignIn() {

  const [loading, setLoading] = useState(false)

  const location = useLocation()

  async function logInWithGoogle(){
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    setLoading(true)

      await signInWithPopup(auth, provider)
      .then(result=>{
        const reference = ref(db, 'users/'+result.user.displayName)
        const newReference = ref(db, 'users/'+result.user.displayName+'/tasks')
      
        onValue(newReference, snapshot=>{
          const data = snapshot.val() || [] // Use empty array if snapshot.val() is null
          
          // Only update tasks with createBaseBoard() if data is an empty array
          if(data.length === 0){
            update(reference, {
              email: result.user.email,
              username: result.user.displayName,
              tasks: [createBaseBoard()]
            })
          } else {
            update(reference, {
              email: result.user.email,
              username: result.user.displayName,
            })
          }
        })
      })
      .catch(error=>{
        console.log(error)
      })

    setLoading(false)
  }


  return (
    <button disabled={loading} onClick={logInWithGoogle} className='bg-white shadow-sm mt-4 shadow-slate-400 p-4 rounded-lg w-[350px] text-[1.1rem] font-semibold flex items-center justify-center gap-3'>
      <i className='text-[1.8rem]'><FcGoogle /> </i>
      <p>{` Sign ${location.pathname === '/login' ? 'in' : 'up'} with Google`}</p>
    </button>
  )
}

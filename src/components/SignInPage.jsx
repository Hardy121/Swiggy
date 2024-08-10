import { signInWithPopup, signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../utils/authSlice'
import { useNavigate } from 'react-router-dom'
import { Visibility } from '../context/ContextAPI'

const SignInPage = () => {

    const userData = useSelector((state) => state.authSlice.userData)
    const { loginvisible, setloginvisible  } = useContext(Visibility)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)
        const userData = {
            name: data.user.displayName,
            photo: data.user.photoURL
        }
        dispatch(addUserData(userData))
        navigate("/")
        setloginvisible((prev) => !prev)

    }

    async function handleLogOut() {
        await signOut(auth)
        dispatch(removeUserData())
        setloginvisible((prev) => !prev)
       

    }
    return (
        <div>
            {userData ?

                <button onClick={handleLogOut} className='w-full bg-[#FF5200] p-3 text-white font-bold mt-7'> LogOut</button>
                :
                <button onClick={handleAuth} className='w-full bg-[#FF5200] p-3 text-white font-bold mt-7'>Login with Google</button>

            }
        </div>
    )
}

export default SignInPage
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './Login.css'

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from '../../utils/firebaseConfig'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        setEmail('')
        setPassword('')
    },[])

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    const login = async (e) => {
        e.preventDefault()
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                email,
                password
            )
        } catch (error) {
            console.log(error.message)
        }
        setEmail('')
        setPassword('')
        navigate(`/admin?user_id=${user.uid}`)
    }

    // const handleSignUp = () => {
    //     navigate('/sign-up')
    // }

  return (
    <div className='login'>
        {/* <div id="firebaseui-auth-container"></div> */}
        {/* <div id="loader">Loading...</div> */}
        <form onSubmit={login}>
            <h3>Login</h3>
            <label htmlFor='email'>Email:</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' name='email'/>
            <label htmlFor='password'>Password:</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' name='password'/>
            <input type='submit' value='Login'/>
        </form>
        {/* <button onClick={handleSignUp}>Sign Up</button> */}
    </div>
  )
}

export default Login
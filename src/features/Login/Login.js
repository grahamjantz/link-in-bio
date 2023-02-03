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
    const [userData, setUserData] = useState({})
    const [toggleErr, setToggleErr] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setEmail('')
        setPassword('')
    },[])

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserData(currentUser);
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
            navigate(`/admin?user_id=${userData.uid}`)
        } catch (error) {
            console.log(error.message)
            setToggleErr(true)
        }
        setEmail('')
        setPassword('')
    }

  return (
    <div className='login'>
        <form onSubmit={login}>
            <h3>Login</h3>
            {toggleErr === true ? (
                <div className='login-error'>
                    <p>Error! Invalid Login! Check email/password and try again.</p>
                </div>
            ) : ''}
            <label htmlFor='email'>Email:</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' name='email'/>
            <label htmlFor='password'>Password:</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' name='password'/>
            <input type='submit' value='Login'/>
        </form>
    </div>
  )
}

export default Login
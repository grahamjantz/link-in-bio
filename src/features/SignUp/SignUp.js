import React, { useEffect, useState } from 'react'
import './SignUp.css'

import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../utils/firebaseConfig';

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        setEmail('')
        setPassword('')
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser)
        })
      }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        try{
            const user = createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
        } catch (err) {
            console.log(err.message)
        }
        setEmail('')
        setPassword('')
    }

  return (
    <div className='sign-up'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Enter Email:</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' name='email'/>
            <label htmlFor='password'>Password:</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' name='password'/>
            <input type='submit' value='Login'/>
        </form>
    </div>
  )
}

export default SignUp
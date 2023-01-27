import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setEmail('')
        setPassword('')
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        setEmail('')
        setPassword('')
    }

    const handleSignUp = () => {
        navigate('/sign-up')
    }

  return (
    <div className='login'>
        <h3>Login</h3>
        <div id="firebaseui-auth-container"></div>
        {/* <div id="loader">Loading...</div> */}
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Enter Email:</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' name='email'/>
            <label htmlFor='password'>Password:</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' name='password'/>
            <input type='submit' value='Login'/>
        </form>
        <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default Login

import React, { useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { setCredential } from '../features/auth/authSlice'

const Login = () => {

    const userRef=useRef()
    const errRef=useRef()
    const[user,setUser]=useState('')
    const[pwd,setPwd]=useState('')
    const[errMsg,setErrMsg]=useState('')
    const navigate=useNavigate()

    const[login,{isLoading}]=useLoginMutation()
    const dispath=useDispatch()

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const userData = await login({user,pwd}).unwrap()
            dispath(setCredential({...userData,user}))
            setUser('')
            setPwd('')
            navigate('Welcome')
        } catch (error) {
            if(!err?.response){
                setErrMsg('No server Response')
            }else if(err.response?.status===400) {
                setErrMsg('Missing username or password');
            }else if(err.response?.status===401) {
                setErrMsg('Unauthoraize');
            }
            else {
                setErrMsg('Loging Failed!');
            }
            errRef.current.focus();
            
        }
    }

    const handleUserInput=(e)=>setUser(e.target.value)

    const handlePwdInput=(e)=>setPwd(e.target.value)

  return (
    <>
    {isLoading ? <h1>Loading...</h1> :(
        <section className='login'>
            <p ref={errMsg} className={errMsg? "Errmsg":"offscreen"}  aria-l:true></p>
            <h1>Employee Login</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
                type='text'
                id='username'
                ref={userRef}
                value={user}
                onChange={handleUserInput}
                autoComplete='off'
                required
            />
            <label htmlFor='password'>Password:</label>
            <input
                type='password'
                id='password'
                ref={userRef}
                value={pwd}
                onChange={handlePwdInput}
                required
            />
            <button>Sign In</button>
        </form>
        </section>
    )}
    </>
  )
}

export default Login
import React, { useState } from 'react'
import { useAuth } from '../context/authcontext'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const {
      isSignUp, error, 
      setIsSignUp, signUpUser, 
      signInUser
      } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(isSignUp){
          await signUpUser(email, password)
        }else {
          await signInUser(email, password)
          navigate("/taskmaster")
        }

        setEmail("")
        setPassword("")
    }

  return (
    <div style={{maxWidth: "400px", margin: "0 auto", padding: "1rem", textAlign: "center"}}>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
  
        <form 
          onSubmit={handleSubmit}
          action="" 
          style={{ marginBottom: "1rem"}}
        >
          <input
            type="email"
            name='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
          />
          <input
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Task Title'
            style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
          />
          <button 
            type='submit'
            style={{padding: "0.5rem 1rem", marginRight: "0.5rem"}}  
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {
          error && <p>{ error }</p>
        }

        <button 
            style={{padding: "0.5rem 1rem"}}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
          </button>
    </div>
  )
}

export default Auth
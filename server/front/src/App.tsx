import { useState } from 'react'
import './App.css'

import Home from './Home.tsx'
import Problems from './Problems.tsx'
export type page = 'Home' | 'Problems' | 'Login' | 'Create Account';


function App() {
  const [actualPage, setActualPage] = useState<page>('Login')
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
    if(actualPage === 'Login'){
      return (
        <>
          <h2>Login Page</h2>
          <a>Email: </a>
          <input onChange={(e) => setEmail(e.target.value)}></input>
          <br></br>
          <a>Password: </a>
          <input onChange={(e) => setPassword(e.target.value)}></input>
          <br></br>
          <button>Log In</button>
          <p onClick = {() => setActualPage('Create Account')}>I don't have an account</p>
          
       
      </>
      )
    }
    else if(actualPage === 'Create Account') {
      return (
        <>
        <h2>Create Account</h2> 
        <a>Email: </a>
        <input onChange={(e) => setEmail(e.target.value)}></input>
        <br></br>
        <a>Password: </a>
        <input onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <button>Sign Up</button>

    </>
      )
    }
    else {
        return (
          <>
          <div className="nav">
            <a onClick={() => setActualPage('Home')}>Home </a>
            <a onClick={() => setActualPage('Problems')}>Problems </a>
            <button onClick={() => setActualPage('Login')}></button>
          </div>
          {actualPage === 'Home' ? <Home /> : <Problems/>}
          </>
        )
    }
    
}

function SignUp(): any {
    
}


export default App


import { useState } from 'react'
import './App.css'
import Home from './Home.tsx'
import {Problems,Problem} from './Problems.tsx'
export type page = 'Home' | 'Problems' | 'Login' | 'Create Account';




function SignIn( nume: string, prenume: string, email: string, parola: string){
       fetch('http://localhost:3001/signin/', {
        method: 'POST',
        body: JSON.stringify({
          nume,
          prenume,
          email,
          parola
        }), headers: {
          'Content-Type':'application/json'
        }
      }).then()
    
}

function App() {
  const [actualPage, setActualPage] = useState<page>('Problems')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nume, setNume] = useState('')
  const [prenume, setPrenume] = useState('')
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
          <button onClick={() => {
            try {
              fetch('http://localhost:3001/login', {
               method: 'POST',
               headers: 'Content-Type:',
               body: JSON.stringify({email, password})
              })
              .then(data => data.json())
              .then((res) => {
                console.log(res.nume, res.prenume)
              })
            }
            catch {
              alert('Wrong email of password!')
            }
            finally {
              setActualPage('Home')
            }
          }}>Log In</button>
          <p onClick = {() => setActualPage('Create Account')}>I don't have an account</p>
      </>
      )
    }
    else if(actualPage === 'Create Account') {
      return (
        <>
        <h2>Create Account</h2> 
        <a>Nume: </a>
        <input onChange={(e) => setNume(e.target.value)}></input>
        <br></br>
        <a>Prenume: </a>
        <input onChange={(e) => setPrenume(e.target.value)}></input>
        <br></br>
        <a>Email: </a>
        <input onChange={(e) => setEmail(e.target.value)}></input>
        <br></br>
        <a>Password: </a>
        <input onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <button onClick = {() => {SignIn(nume, prenume, email, password), setActualPage('Login')}}>Sign Up</button>

    </>
      )
    }
    else {
        return (
          <>
          <div className="nav">
            <a onClick={() => setActualPage('Home')}>Home </a>
            <a onClick={() => setActualPage('Problems')}>Problems </a>
            <button onClick={() => {fetch('http://localhost:3001/logout'), setActualPage('Login')}}>Log Out</button>
          </div>
          {actualPage === 'Home' ? <Home /> : <Problems/>}
          </>
        )
    }
    
}




export default App


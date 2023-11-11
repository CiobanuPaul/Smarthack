import { useState } from 'react'
import './App.css'
import Login from './Login.tsx'
import Home from './Home.tsx'
import Problems from './Problems.tsx'
type page = 'Home' | 'Problems';


function App() {
  const [actualPage, setActualPage] = useState<page>('Home')
  const [loggedIn, setLoggedIn] = useState<boolean>(true)
    if(!loggedIn){
      
      return <Login />
    }
    else {
        return (
          <>
          <div className="nav">
            <a onClick={() => setActualPage('Home')}>Home </a>
            <a onClick={() => setActualPage('Problems')}>Problems </a>
          </div>
          {actualPage === 'Home' ? <Home /> : <Problems/>}
          </>
        )
    }
    
}

export default App


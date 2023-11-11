import {useState} from 'react'



function Login() {
    const [count, setCount] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
          <p>I don't have an account</p>
          
       
      </>
    )
}


export default Login
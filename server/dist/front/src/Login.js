"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function Login() {
    const [count, setCount] = (0, react_1.useState)(0);
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    return (<>
        
        <h2>Login Page</h2>
        
         
          <a>Email: </a>
          <input onChange={(e) => setEmail(e.target.value)}></input>
          <br></br>
          <a>Password: </a>
          <input onChange={(e) => setPassword(e.target.value)}></input>
          <br></br>
          <button>Log In</button>
          <p>I don't have an account</p>
          
       
      </>);
}
exports.default = Login;

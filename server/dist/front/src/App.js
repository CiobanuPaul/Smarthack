"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
const Home_tsx_1 = __importDefault(require("./Home.tsx"));
const Problems_tsx_1 = __importDefault(require("./Problems.tsx"));
function App() {
    const [actualPage, setActualPage] = (0, react_1.useState)('Login');
    const [count, setCount] = (0, react_1.useState)(0);
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    if (actualPage === 'Login') {
        return (<>
          <h2>Login Page</h2>
          <a>Email: </a>
          <input onChange={(e) => setEmail(e.target.value)}></input>
          <br></br>
          <a>Password: </a>
          <input onChange={(e) => setPassword(e.target.value)}></input>
          <br></br>
          <button>Log In</button>
          <p onClick={() => setActualPage('Create Account')}>I don't have an account</p>
          
       
      </>);
    }
    else if (actualPage === 'Create Account') {
        return (<>
        <h2>Create Account</h2> 
        <a>Email: </a>
        <input onChange={(e) => setEmail(e.target.value)}></input>
        <br></br>
        <a>Password: </a>
        <input onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <button>Sign Up</button>

    </>);
    }
    else {
        return (<>
          <div className="nav">
            <a onClick={() => setActualPage('Home')}>Home </a>
            <a onClick={() => setActualPage('Problems')}>Problems </a>
            <button onClick={() => setActualPage('Login')}></button>
          </div>
          {actualPage === 'Home' ? <Home_tsx_1.default /> : <Problems_tsx_1.default />}
          </>);
    }
}
function SignUp() {
}
exports.default = App;

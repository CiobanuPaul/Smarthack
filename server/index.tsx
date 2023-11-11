//oare va merge?
import express, { Express, Request, Response } from "express";
const crypto = require("crypto") 
const app: Express = express()
const session = require("express-session");
app.use(session({
  secret: "The quick brown fox jumps over the lazy dog",
  resave: true,
  saveUninitialized: true
}));
let gc: Number = 0;


var dotenv=require('dotenv')
dotenv.config()

let algorithm = "sha256"

var mysql = require('mysql');


var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });
con.connect(function(err:any) {
    if (err) throw err;
  });
  
app.get('/', (req: Request, res: Response) => {
    res.redirect("/index.html")
});
app.post('/signin',(req: Request, res: Response)=>{
  let password:any = crypto.createHash(algorithm).update(req.body.password).digest("base64") 
  con.query('UPDATE sequence_users SET id=LAST_INSERT_ID(id+1)')
  con.query(`insert into users values(select id from sequence_users),${req.body.nume},${req.body.prenume},${req.body.email},now(),${password}`,function(err:any,result:any){
    if (err) throw err;
    res.send("Succes");
  })

})
app.post('/login',(req: Request, res: Response) => {
  let password:any = crypto.createHash(algorithm).update(req.body.password).digest("base64") 
  let username = req.body.email
con.query(`SELECT id_user,pass, nume, prenume FROM users where email=${req.body.email}`, function (err:any, result:any, fields:any) {
    if(result.pass==password){
      let id:String = result.id_user.toString()
      session.username = id;
      res.send(result.nume+" "+result.prenume)
    }else{
      session.username = false;
      res.send("error");
    }
});
});

app.get('/logout', function(req, res) {    
  session.destroy(); 
  res.send();   
});

app.get('/problems',function(req,res){
  con.query('select nume from problem',function(err:any, result:any, fields:any) {
    if (err) throw err;
    res.send(result);
  });
})
app.get("/stea", (req: Request, res: Response) => {
    con.query("SELECT * FROM employees where employee_id=102", function (err:any, result:any, fields:any) {
        if (err) throw err;
        res.send(result);
      });
});

app.listen(3001);
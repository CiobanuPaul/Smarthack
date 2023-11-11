//oare va merge?
import express, { Express, Request, Response } from "express";
const crypto = require("crypto") 
const path = require('path');
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
    res.send("hello")
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
  con.query('select id_pb,nume from problem',function(err:any, result:any, fields:any) {
    if (err) throw err;
    res.send(result);
  });
}) 

app.get('/tipuripb',function(req,res){
  con.query('select nume from categorie',function(err:any, result:any, fields:any) {
    if (err) throw err;
    res.send(result);
  });
}) 

app.post('/pbanume',function(req,res){
  con.query(`select c.id_pb,c.nume, pb.difficulty from pb_cat pb, problem p,categorie c where pb.id_pb=p.id and pb.id_cat=c.id_cat and p.nume=${req.body.name}`, function (err:any, result:any, fields:any){
    if (err) throw err;
    res.send(result);
  })
})

app.post('/filter',function(req,res){
  let str: String = ""
  for(let i =0;i<10;i++){
    if(req.body.filters[i]!=-1){
      str+=" and " + " pc.id_cat = " +  req.body.filters[i];
    }
  }
  con.query(`select p.nume from problem p, pb_cat pc where p.id_pb=pc.od_pb and exists (select p.nume from problem p1, pb_cat pc1 where p.id_pb=pc.od_pb and p.nume=p1.nume and ${str})`,function(err:any, result:any, fields:any){
    if (err) throw err;
    res.send(result);
  })
})

app.get('/selectpb',function(req,res){
  res.sendFile(`./probleme/id_${req.query.id}`);
})
app.get('/selectpb1',function(req,res){
  const options = {
    root: path.join(__dirname)
};
  res.sendFile(`/probleme/id_10/description.md`,options);
})
app.get("/stea", (req: Request, res: Response) => {
    con.query("SELECT * FROM employees where employee_id=102", function (err:any, result:any, fields:any) {
        if (err) throw err;
        res.send(result);
      });
});

app.listen(3001);
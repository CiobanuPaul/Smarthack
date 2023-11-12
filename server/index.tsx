//oare va merge?
import express, { Express, Request, Response } from "express";
const bcrypt = require("bcrypt")
const path = require('path');
const bodyParser = require('body-parser')
var cors = require('cors')
const app: Express = express()
const session = require("express-session");
app.use(express.static("html"));
app.use(express.json());
app.use(session({
  secret: "The quick brown fox jumps over the lazy dog",
  resave: true,
  saveUninitialized: true
}));
app.use(cors())
let gc: Number = 0;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const originfix = (req: Request, res: Response, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}

var dotenv = require('dotenv')
dotenv.config()

var mysql = require('mysql');


var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
con.connect(function (err: any) {
  if (err) throw err;
});

app.get('/', originfix, (req: Request, res: Response) => {
  res.send("hello")
});
app.post('/signin', originfix, urlencodedParser, (req: Request, res: Response) => {
  // req.body; // JavaScript object containing the parse JSON
  // res.json(req.body);
  bcrypt.hash(req.body.parola.toString(), 8,function(err:any, hash:any) {
    console.log(hash)
    con.query(
      `
        insert into users 
        (nume, prenume, email, data_inscriere, pass)
        values (
          '${req.body.nume.toString()}',
          '${req.body.prenume.toString()}',
          '${req.body.email.toString()}',
          now(),
          '${hash}')
      `
    ,function(err:any,result:any){
     if (err){
      res.send(err);
     } else{
      res.send("Succes");
     }
  })
    // res.send("ok")
});
  
  // res.send("ok")
})
app.post('/login', originfix, urlencodedParser, (req: Request, res: Response) => {
  bcrypt.hash(req.body.parola.toString(), 8,function(err:any, hash:any) {
  let username = req.body.email.toString()
  con.query(`
      SELECT id_user,pass, nume, prenume 
      FROM users 
      where email=${username}
      `, function (err: any, result: any, fields: any) {
    console.log(result)
    if (result.pass == hash) {
      let id: String = result.id_user.toString()
      session.username = id;
      res.send({id:result.id_user,nume:result.nume, prenume: result.prenume})
    } else {
      session.username = false;
      res.send("error");
    }
  });})
});

app.get('/logout', function (req, res) {
  session.destroy();
  res.send();
});

app.get('/problems', function (req, res) {
  con.query('select id_pb,nume from problem', function (err: any, result: any, fields: any) {
    if (err) throw err;
    res.send(result);
  });
})

app.get('/tipuripb', function (req, res) {
  con.query('select nume from categorie', function (err: any, result: any, fields: any) {
    if (err) throw err;
    res.send(result);
  });
})

app.post('/pbanume', function (req, res) {
  con.query(`
          select c.id_pb,c.nume, pb.difficulty 
          from pb_cat pb, problem p,categorie c 
          where pb.id_pb=p.id 
          and pb.id_cat=c.id_cat 
          and p.nume=${req.body.name}
          `, function (err: any, result: any, fields: any) {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/filter', function (req, res) {
  let str: String = ""
  for (let i = 0; i < 10; i++) {
    if (req.body.filters[i] != -1) {
      str += " and " + " pc.id_cat = " + req.body.filters[i];
    }
  }
  con.query(`select p.nume from problem p, pb_cat pc where p.id_pb=pc.od_pb and exists (select p.nume from problem p1, pb_cat pc1 where p.id_pb=pc.od_pb and p.nume=p1.nume and ${str})`, function (err: any, result: any, fields: any) {
    if (err) throw err;
    res.send(result);
  })
})

app.get('/selectpb', function (req, res) {
  res.sendFile(`./probleme/id_${req.query.id}`);
})
app.get('/selectpb1', function (req, res) {
  const options = {
    root: path.join(__dirname)
  };
  res.sendFile(`/probleme/id_10/description.md`, options);
})
app.get("/stea", (req: Request, res: Response) => {
  con.query("SELECT * FROM employees where employee_id=102", function (err: any, result: any, fields: any) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3001);
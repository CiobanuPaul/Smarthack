//oare va merge?
import express, { Express, Request, Response } from "express";
import passport from 'passport';
import session from 'express-session';
import eval_cpp from './evaluator'
import evaluate from './ai'
import bcrypt from 'bcrypt'

//const path = require('path');

import bodyParser from "body-parser";
//const bodyParser = require('body-parser') 
//var cors = require('cors')
import cors from 'cors'
const app: Express = express()

app.use(express.static("html"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: "The quick brown fox jumps over the lazy dog",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
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

import dotenv from 'dotenv'
//var dotenv = require('dotenv')
dotenv.config()

import mysql from 'mysql'
//var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
con.connect(function (err: any) {
  if (err) throw err;
});

app.get('/', (req: any, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.username}!`);
  } else {
    res.send('Not authenticated.');
  }
});

app.post('/signin', originfix, urlencodedParser, (req: Request, res: Response) => {
  // req.body; // JavaScript object containing the parse JSON
  // res.json(req.body);
  bcrypt.genSalt(8).then(salt => {

    console.log(req.body.parola.toString().trim())
    bcrypt.hash(req.body.parola.toString().trim(), salt, function (err: any, hash: any) {
      console.log(hash)
      con.query(
        `
        insert into users 
        (nume, prenume, email, data_inscriere, pass, salt)
        values (
          '${req.body.nume.toString()}',
          '${req.body.prenume.toString()}',
          '${req.body.email.toString()}',
          now(),
          '${hash}',
          '${salt}')
          `
        , function (err: any, result: any) {
          if (err) {
            res.send(err);
          } else {
            res.send("Success");
          }
        })
    })
    // res.send("ok")
  });

  // res.send("ok")
})
function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
app.post('/login', (req, ress) => {
  ress.send({'token':20});/*
  let mail = req.body.email.toString()
  //console.log(mail);
  con.query(`
        SELECT id_user,pass, nume, prenume 
        FROM users 
        where email='${mail}';
        `,  (err: any, result: any, fields: any)=> {
          bcrypt.compare(req.body.parola, result.pass, (err:any, res:any)=>{
            let x: any = makeid(50);
            console.log(`
        
        
        ----
        ${JSON.parse(JSON.stringify(result[0]))}
        ----
        
        
        
        `)
            con.query(`insert into sessions(id_user,token) values(${result[0].id_user},'${x}')`);
          })

  })*/
})

app.get('/logout', function (req, res) {
    if(req.headers['authorization'])con.query(`delete from sessions where token=${req.headers['authorization']}`)
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

app.get('/test-auth', verifyToken, (req, res) => { res.send('auth works') })

app.get('/descpb', function (req, res) {
  con.query(`select cod from problem where id_pb = ${req.query.selected}`, (err: any, result, fields: any) => {
    res.send(result[0].cod)
  })
}
)
const sum = (...arr: number[]) => [...arr].reduce((acc, val) => acc + val, 0);


app.post('/sendsol', (req, res) => {
  eval_cpp(req.body.id_pb, req.body.cod).then((resultat) => {

    con.query(`insert into rulare(id_user,id_pb,time,nota_rulare) 
              values(${req.body.id_user},${req.body.id_pb - 9},now(),${sum(...resultat.tests)})`)
    con.query(`select max(id_rulare) as a 
              from rulare`, (err, result, fetch) => {
      evaluate(req.body.cod).then((rez: String) => {
        var arr = JSON.parse(rez.toString());
        const a=result
        
        for (var i: number = 0; i < 4; i++) {
          con.query(`insert into noteai values(${a[0].a},${i + 1},${arr.result[i]})`);
        }
      })
    })

    res.send(resultat);
  }
  );
})

 

app.post('/month',(req: Request, res: Response) => {
  let structure:any = []
    con.query(`select time, count(*) as a from rulare where id_user = ${req.body.id_user } and time between DATE_SUB(now(), INTERVAL 28 DAY) AND DATE_ADD(now(),INTERVAL 1 DAY) group by time`,(err,data)=>{
      console.log(err,data)
      for(let i of data){
        structure.push(i)
      }
      console.log(structure)
      res.send(structure)
    });
  }
)

app.get('/grafic1',(req: Request, res: Response) => {
  con.query('select time, sum(nota_rulare)/count(*) as a from rulare where id_user = 20 and time between DATE_SUB(now(), INTERVAL 28 DAY) AND DATE_ADD(now(),INTERVAL 1 DAY) group by time;',(err,data)=>{
    res.send(data);
  })
})

app.get('/code_cleanliness',(req: Request, res: Response) => {
  con.query('select r.time,(n.nota)/count(*) as a from rulare r, noteai n, aireqs a where r.id_user = 20 and r.id_rulare=n.id_rulare and n.id_req = a.id_req and time between DATE_SUB(now(), INTERVAL 28 DAY) AND DATE_ADD(now(),INTERVAL 1 DAY) and a.nume= '+' "code cleanliness" '+' group by r.time;',(err,data)=>{
    res.send(data);
  })
})
app.get('/comments',(req: Request, res: Response) => {
  con.query('select r.time,(n.nota)/count(*) as a from rulare r, noteai n, aireqs a where r.id_user = 20 and r.id_rulare=n.id_rulare and n.id_req = a.id_req and time between DATE_SUB(now(), INTERVAL 28 DAY) AND DATE_ADD(now(),INTERVAL 1 DAY) and a.nume='+' "comments" '+' group by r.time;',(err,data)=>{
    res.send(data);
  })
})
app.get('/error_handling',(req: Request, res: Response) => {
  con.query('select r.time, (n.nota)/count(*) as a from rulare r, noteai n, aireqs a where r.id_user = 20 and r.id_rulare=n.id_rulare and n.id_req = a.id_req and time between DATE_SUB(now(), INTERVAL 28 DAY) AND DATE_ADD(now(),INTERVAL 1 DAY) and a.nume='+' "error handling" '+' group by r.time;',(err,data)=>{
    res.send(data);
  })
})
app.get('/good_practices',(req: Request, res: Response) => {
  con.query('select r.time,(n.nota)/count(*) as a from rulare r, noteai n, aireqs a where r.id_user = 20 and r.id_rulare=n.id_rulare and n.id_req = a.id_req and time between DATE_SUB(now(), INTERVAL 28 DAY) AND DATE_ADD(now(),INTERVAL 1 DAY) and a.nume='+' "good practices"'+' group by r.time;',(err,data)=>{
    res.send(data);
  })
})

app.get("/stea", (req: Request, res: Response) => {
  con.query("SELECT * FROM employees where employee_id=102", function (err: any, result: any, fields: any) {
    if (err) throw err;
    res.send(result);
  });
});

function verifyToken(req: any, res: any, next: any) {


  const token = req.headers['authorization'];
  var isTokenValid = false;
  con.query(`select * from sessions where token=${req.headers['authorization']}`, function (err: any, result: any, fields: any) {
    if (result.length == 1) isTokenValid = true;
  })

  if (isTokenValid) {

    next();

  } else {
    res.sendStatus(401);
  }

}


app.listen(3001);

function callback(err: any): any {
  throw new Error("Function not implemented.");
}

//oare va merge?
import express, { Express, Request, Response } from "express";

const app: Express = express()

let gc: Number = 0;

var mysql = require('mysql');
var dotenv=require('dotenv')
dotenv.config()

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
    res.send("Hello Hell!")
});

app.get("/stea", (req: Request, res: Response) => {
    con.query("SELECT * FROM employees where employee_id=102", function (err:any, result:any, fields:any) {
        if (err) throw err;
        res.send(result);
      });
});

app.listen(3001);
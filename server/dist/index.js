"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//oare va merge?
const express_1 = __importDefault(require("express"));
const crypto = require("crypto");
const app = (0, express_1.default)();
const session = require("express-session");
app.use(session({
    secret: "The quick brown fox jumps over the lazy dog",
    resave: true,
    saveUninitialized: true
}));
let gc = 0;
var dotenv = require('dotenv');
dotenv.config();
let algorithm = "sha256";
var mysql = require('mysql');
var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
con.connect(function (err) {
    if (err)
        throw err;
});
app.get('/', (req, res) => {
    res.redirect("/index.html");
});
app.post('/signin', (req, res) => {
    let password = crypto.createHash(algorithm).update(req.body.password).digest("base64");
    con.query('UPDATE sequence_users SET id=LAST_INSERT_ID(id+1)');
    con.query(`insert into users values(select id from sequence_users),${req.body.nume},${req.body.prenume},${req.body.email},now(),${password}`, function (err, result) {
        if (err)
            throw err;
        res.send("Succes");
    });
});
app.post('/login', (req, res) => {
    let password = crypto.createHash(algorithm).update(req.body.password).digest("base64");
    let username = req.body.email;
    con.query(`SELECT id_user,pass, nume, prenume FROM users where email=${req.body.email}`, function (err, result, fields) {
        if (result.pass == password) {
            let id = result.id_user.toString();
            session.username = id;
            res.send(result.nume + " " + result.prenume);
        }
        else {
            session.username = false;
            res.send("error");
        }
    });
});
app.get('/logout', function (req, res) {
    session.destroy();
    res.send();
});
app.get('/problems', function (req, res) {
    con.query('select nume from problem', function (err, result, fields) {
        if (err)
            throw err;
        res.send(result);
    });
});
app.get("/stea", (req, res) => {
    con.query("SELECT * FROM employees where employee_id=102", function (err, result, fields) {
        if (err)
            throw err;
        res.send(result);
    });
});
app.listen(3001);

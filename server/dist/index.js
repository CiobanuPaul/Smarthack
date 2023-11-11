"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//oare va merge?
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let gc = 0;
var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config();
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
    res.send("Hello Hell!");
});
app.get("/stea", (req, res) => {
    con.query("SELECT * FROM employees where employee_id=102", function (err, result, fields) {
        if (err)
            throw err;
        res.send(result);
    });
});
app.listen(3001);

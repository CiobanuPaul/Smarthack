var mysql = require('mysql');
var dotenv=require('dotenv')
dotenv.config()

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

con.connect(function(err) {
  if (err) throw err;
});
con.query("SELECT * FROM employees where employee_id=102", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});
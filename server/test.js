var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "lab",
  password: "stefan",
  database: "hr"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM employees where employee_id=102", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
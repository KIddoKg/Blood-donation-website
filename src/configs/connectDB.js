// get the client
// const mysql = require("mysql2");
import mysql from "mysql2";
require("dotenv").config();

//create the connection to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// simple query
connection.query("SELECT * FROM `donor`", function (err, results, fields) {
  console.log(">>> check mysql");
  console.log(results);
  // console.log(results); // results contains rows returned by server
  // console.log(fields); // fields contains extra meta data about results, if available
});

export default connection;

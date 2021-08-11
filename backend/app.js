const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config({path: './config/.env'})

const app = express();

//routes

//Database
const mySQLConnection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  database: process.env.DB_NAME,
  multipleStatements: true
})

mySQLConnection.connect((error) => {
  if(!error) console.log("connected")
  else console.log("connection failed" + error)
})

app.use(bodyParser.json());

module.exports = app;
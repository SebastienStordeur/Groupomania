const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config({path: './config/.env'})

const app = express();

//routes
const userRoutes = require('./routes/userRoutes');


//Database
const mySQLConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  database: process.env.DB_NAME,
  multipleStatements: true
})

mySQLConnection.connect((error) => {
  if(!error) console.log("connected")
  else console.log("connection failed" + error)
})


//Request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", userRoutes);



module.exports = app;
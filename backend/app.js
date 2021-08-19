const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

//routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');


//Database
const mySQLConnection = require('./mysqlConnection');

mySQLConnection.connect((error) => {
  if(!error) console.log("connected to the database")
  else console.log("connection failed" + error)
}) 

/* mySQLConnection.query(
  "SELECT * FROM `users`",
  function (err, rows, fields) {
    if (err) throw err;
    console.log("The solution is: ", rows[0].solution);
  }) */

app.use(helmet());
 
//Request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);


module.exports = app;
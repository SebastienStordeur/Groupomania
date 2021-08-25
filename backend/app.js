const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

app.use(helmet());

//Database
const db = require("./models")
db.sequelize.sync();


//routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');



/* const mySQLConnection = require('./mysqlConnection');

mySQLConnection.connect((error) => {
  if(!error) console.log("connected to the database")
  else console.log("connection failed" + error)
})  */

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Access the API from any origin
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //Add headers to requests to the API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //Methods allowed
  next();
});

 
//Request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);


module.exports = app;
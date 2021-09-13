const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const helmet = require('helmet');
const path = require("path");

require('dotenv').config({path: './config/.env'})

const app = express();

app.use(helmet());

//Database
const db = require("./models")
db.sequelize.sync();

//headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*'); //Access the API from any origin
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

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000', //Localtion of the react app we're conencting to
    credentials: true,
  })
);  
app.use(
  session({
    secret: process.env.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SECRET_CODE));
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport-config')(passport);

app.use("/images", express.static(path.join(__dirname, 'images')));

//Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
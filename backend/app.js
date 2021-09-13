const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require('cors');


require('dotenv').config({path: './config/.env'})
app.use(helmet());

//Database
const db = require("./models")
db.sequelize.sync();

//headers
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
app.use(
  cors({
    orgin: 'http://localhost:3000', //Localtion of the react app we're conencting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passport-config")(passport);


app.use("/images", express.static(path.join(__dirname, "images")));

//Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));


app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  //failureFlash: true  //display message in case of error
}))





module.exports = app;
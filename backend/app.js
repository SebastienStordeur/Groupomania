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
const User = db.users
db.sequelize.sync();

//headers
 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});   

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000', //Location of the react app we're conencting to
    credentials: true,
  })
);  
app.use(
  session({
    secret: process.env.SESSION_SECRET + User,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // = 1day
    },
  })
);
app.use(cookieParser(process.env.SESSION_SECRET + User));
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport-config')(passport);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/user', (req, res) => {
  res.send(req.user); //req.user stores the entire user that has been authenticated inside of it
});

//Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
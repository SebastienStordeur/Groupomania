const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const helmet = require("helmet");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

//Imports
require("dotenv").config({ path: "./config/.env" });
require("./middleware/passport-config")(passport);

const app = express();

app.use(helmet());

//Database
const db = require("./models")
const User = db.users
db.sequelize.sync();

//Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);  
app.use(session({
    secret: process.env.SESSION_SECRET + User,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // = 1day
    },
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

//Static directory
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

module.exports = app;
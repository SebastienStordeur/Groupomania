//const User = require('../models/user');
const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if(err) throw err;
        if(!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if(err) throw err;
          if(result === true) return done(null, user);
          else return done(null, false);
        });
      });
    })
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findOne({ id: id }, (err, user) => {
      callback(err, user);
    });
  });

};
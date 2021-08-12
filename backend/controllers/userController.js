const bcrypt = require('bcrypt');
const mySQLConnection = require('../app');
const { User } = require('../models/userModel');

exports.register = (req,res,next) => {
/*   create: (data, callback) => {
    `insert into users(firstName, lastName, email, password)`, 
    [
      data.firstName,
      data.lastName,
      data.email,
      data.password
    ],
    (error, results, fields) => {
      if (error) callback(error)
      return callback(null, results)
    }
  } */
  //bcrypt.hash(req.body.password, 10)
    //.then(hash => {
      const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
      });
      user.save()
      .then(() => res.status(201).json({ message: "Utilisateur crée" }))
      .catch(error => res.status(400).json({ message: "Impossible de créer l'utilisateur" + error }));
    //)
}

exports.login = (req,res,next) => {

}
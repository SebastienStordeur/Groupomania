const bcrypt = require('bcrypt');
const mySQLConnection = require('../app');
const jwt = require('jsonwebtoken');
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
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash
      });
      user.save()
      .then(() => res.status(201).json({ message: "Utilisateur crée." }))
      .catch(error => res.status(400).json({ message: "Impossible de créer l'utilisateur " + error }));
    })
}

exports.login = (req,res,next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) return res.status(401).json({ message: "Impossible de trouver cet utilisateur."})
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid) res.status(401).json({ message: "Mot de passe incorrect." })
          res.status(200).json({
            userId: user.id,
            token: "TOKEN"
          })
        })
    })
    .catch(error => res.status(500).json({ message: "Impossible de vous connecter " + error }));
}

exports.getProfile = (req,res, next) => {
  User.findOne({ id: req.params.id }) 
    .then((user) => res.status(200).json(user))
    .catch(error => res.status(404).json({ message: "Impossible de trouver ce profile" + error }));
}
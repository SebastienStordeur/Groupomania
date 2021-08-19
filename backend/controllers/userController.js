const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const mySQLConnection = require('../mysqlConnection');

exports.register = (req,res,next) => {
  console.log(req.body);
  //bcrypt.hash(req.body.password, 10)
    const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
      });

      console.log(user);

      mySQLConnection.query('INSERT INTO users (lastName, firstName, email, password) VALUES (?,?,?,?)', 
      [
        user.lastName,
        user.firstName,
        user.email,
        user.password
      ],
      function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
      });
      /* user.save()
      .then(() => res.status(201).json({ message: "Utilisateur crée." }))
      .catch(error => res.status(400).json({ message: "Impossible de créer l'utilisateur " + error })); */
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

exports.updateProfile = (req,res,next) => {
  User.updateOne({ id: req.params.id })
    .then((user) => {
      
    })
}
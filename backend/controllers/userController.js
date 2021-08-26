const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

//Register a new User
exports.register = (req, res) => {
  //Create User
  bcrypt
    .hash(req.body.password, 15) //hash password
    .then((hash) => {
      const user = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
      };
      //Save in database
      User.create(user)
        .then(() => res.status(201).json({ message: "Utilisateur crée." }))
        .catch((error) => res.status(500).json({ message: "Impossible de créer l'utilisateur. " + error })
        );
    });
};

//Login
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(401).json({ message: "Impossible de trouver cet utilisateur." });
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) res.status(401).json({ message: "Mot de passe incorrect." });
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id }, 
              "RANDOM_TOKEN_PHRASE", 
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ message: "Impossible de vous connecter " + error }));
};
/*
exports.getProfile = (req,res, next) => {
  User.findOne({ id: req.params.id }) 
    .then((user) => res.status(200).json(user))
    .catch(error => res.status(404).json({ message: "Impossible de trouver ce profile" + error }));
}

exports.updateProfile = (req,res,next) => {
  User.updateOne({ id: req.params.id })
    .then((user) => {
      
    })
} */

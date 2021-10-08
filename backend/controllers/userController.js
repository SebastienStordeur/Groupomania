const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport")

require("dotenv").config();

//Register a new User
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hash,
    };
    User.create(user)
      .then(() => res.status(201).json({ message: "Utilisateur crée." }))
      .catch((error) => res.status(500).json({ message: "Impossible de créer l'utilisateur. " + error }));
  });
};

//Login
/* exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Impossible de trouver cet utilisateur");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        //res.send('Authentification réussie.');
        const session = req.session;
        session.user = req.user;
        res.send(user);
        console.log(req.session)
      });
    }
  })(req, res, next);
}; */

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then( user => {
      if(!user) return res.status(401).json({ message: "Impossible de trouver cet utilisateur."});
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid) return res.status(401).json({ message: "Mot de passe invalide."});
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id}, process.env.SECRET_TOKEN_JWT, { expiresIn: "24h" })
          });
        })
        .catch(error => res.status(401).json({ message: "1" + error }));
    })
    .catch(error => res.status(401).json({ message: "2" + error }));
};

exports.logout = (req, res) => {
  req.logOut();
  res.redirect("/");
};

exports.getProfile = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(401).json({ message: "Impossible de trouver ce profile" + error })
    );
};

exports.updateProfile = (req, res, next) => {
  //bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
    };
    User.update(user)
      .then(() => res.status(201).json({ message: "Profil mis à jour."}))
      .catch(error => res.status(500).json({ message: "Impossible de mettre à jour votre profil. " + error }));
};

exports.deleteProfile = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).json({ message: "Utilisateur supprimé." }))
    .catch(error => res.status(401).json({ message: "Impossible de supprimer cet utilisateur. " + error }))
}
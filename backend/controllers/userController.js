const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const passport = require("passport");
const { BiCookie } = require("react-icons/bi");

//Register a new User
exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 15).then((hash) => {
    const user = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hash,
    };
    User.create(user)
      .then(() => {
        res.status(201).json({ message: "Utilisateur crée." });
      })
      .catch((error) => {
        res.status(500).json({ message: "Impossible de créer l'utilisateur. " + error });
      });
  });
};

//Login
exports.login = (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Impossible de trouver cet utilisateur");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        //res.send('Authentification réussie.');
        res.send(user);
        console.log("req?user=", req.user);
        console.log(user.dataValues.id);
      });
    }
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logOut();
  req.redirect("/login");
};

exports.getProfile = (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) =>
      res
        .status(404)
        .json({ message: "Impossible de trouver ce profile" + error })
    );
};

exports.updateProfile = (req, res, next) => {
  User.updateOne({ id: req.params.id }).then((user) => {});
};

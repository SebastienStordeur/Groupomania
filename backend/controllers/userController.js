const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const passport = require("passport")

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
      .then(() => {
      res.status(201).json({ message: "Utilisateur crée." })
/*         res.redirect(301, 'http://localhost:3000/login'); */
      })
      .catch((error) => res.status(500).json({ message: "Impossible de créer l'utilisateur. " + error }));
  });
};

//Login
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Impossible de trouver cet utilisateur");
    else {
      //genere token/cookie bdd
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
};

//test user
exports.getUser = (req, res, next) => {
    res.send(req.user)
}

exports.logout = (req, res) => {
  req.logOut();
  res.redirect("/");
};

exports.getProfile = (req, res) => {
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

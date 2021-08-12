const bcrypt = require('bcrypt');
const mySQLConnection = require('../app');

exports.register = (req,res,next) => {
  create: (data, callback) => {
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
  }
  bcrypt.hash(req.body.password, 10)
    //.then(hash => {
      const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash
      });
      user.save()
      .then(() => res.status(201).json({ message: "utilisateur crée" }))
      .catch(error => res.status(500).json({ message: "Impossible de créer l'utilsateur" + error }));
    //)
}

exports.login = (req,res,next) => {

}
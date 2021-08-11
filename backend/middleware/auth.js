const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken= jwt.verify(token, "SECRET_PHRASE");
    const userId = decodedToken.userId;
    if(req.body.userId && req.body.userId !== userId) throw 'UserId non valide'
    else next();
  } catch(err) {
    res.status(401).json({ message: "Requête non identifiée" + err});
  }
}
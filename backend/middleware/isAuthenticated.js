/* module.exports = (req, res, next) => {
  //if user is authenticated in the session next
  if(req.user) next()
  else console.log('not login');
} */


module.exports = {
  //If not authenticated
  ensureAuthenticated: (req, res, next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
  },
  //If authenticated
  forwardAuthenticated: (req, res, next) => {
    if(!req.isAuthenticated()) return next();
    res.redirect('/dashboard');
  }
};
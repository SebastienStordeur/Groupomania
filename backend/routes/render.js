const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/isAuthenticated');

//Login
router.get('/login', (req, res) => res.render('login'));

//Dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    user: req.user
  })
});

module.exports = router;
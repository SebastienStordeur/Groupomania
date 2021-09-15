const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pswChecking = require('../middleware/passwordChecking');
const passport = require('passport');
const checkAuthenticated = require('../middleware/checkAuthenticated');

router.post('/register', pswChecking, userController.register); //Create a new User
router.post('/login', passport.authenticate('local') /* { failureRedirect: '/login', successRedirect: '/dashboard' }) */, userController.login);
router.delete('/logout', userController.logout);

router.get('/:id', userController.getProfile);
router.put('/:id', userController.updateProfile);

module.exports = router;
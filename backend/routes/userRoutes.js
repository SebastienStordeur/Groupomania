const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pswChecking = require('../middleware/passwordChecking');
const passport = require('passport');

//Basic routes
router.post("/signup", pswChecking, userController.signup);
router.post("/login", passport.authenticate('local'/* , { successRedirect: '/dashboard', failureRedirect:'/login' }  */), userController.login);

//Specific routes
router.delete("/logout", userController.logout);
router.get("/:id", userController.getProfile);
router.put("/:id", userController.updateProfile);
router.get("/logout", userController.logout);

module.exports = router;
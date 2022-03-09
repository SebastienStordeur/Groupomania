const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pswChecking = require('../middleware/passwordChecking');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const passport = require('passport');

//Basic routes
router.post("/signup", /* pswChecking, */ userController.signup);
//router.post("/login", passport.authenticate('local'/* , { successRedirect: '/dashboard', failureRedirect:'/login' }  */), userController.login);
router.post("/login", userController.login);

//Specific routes
router.get("/:id", auth, userController.getProfile);
router.put("/:id/updateProfile", auth, pswChecking, userController.updateProfile);
router.put("/:id/updateBio", auth, userController.updateBio);
router.put("/:id/updateJob", auth, userController.updateJob);
router.delete("/:id", auth, userController.deleteProfile);
router.put("/:id/manageProfilePicture",  auth, multer, userController.manageProfilePicture)

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pswChecking = require('../middleware/passwordChecking');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const passport = require('passport');

//Basic routes
router.post("/signup", pswChecking, userController.signup);
//router.post("/login", passport.authenticate('local'/* , { successRedirect: '/dashboard', failureRedirect:'/login' }  */), userController.login);
router.post("/login", userController.login);

//Specific routes
router.delete("/logout", userController.logout);
router.get("/:id", userController.getProfile);
router.put("/:id/updateProfile",  userController.updateProfile);
router.delete("/:id", auth, userController.deleteProfile);
router.post("/:id/manageProfilePicture",  multer, userController.manageProfilePicture)
router.get("/logout", auth, userController.logout);

module.exports = router;
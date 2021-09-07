const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pswChecking = require('../middleware/passwordChecking');

router.post('/register', pswChecking, userController.register); //Create a new User
router.post('/login', userController.login);
router.delete('/logout', userController.logout);
/*
router.get('/:id', userController.getProfile);
router.put('/:id', userController.updateProfile);
 */
//Need auth + multer

module.exports = router;
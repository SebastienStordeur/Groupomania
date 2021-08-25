const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register); //Create a new User
/* router.post('/login', userController.login);

router.get('/:id', userController.getProfile);
router.put('/:id', userController.updateProfile);
 */
//Need auth + multer

module.exports = router;
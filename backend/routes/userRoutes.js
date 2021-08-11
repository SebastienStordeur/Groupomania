const express = express('express');
const router = express.router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('login', userController.login);

module.exports = router;
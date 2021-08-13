const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/* router.get('/', postController.getAllPost);
router.get('/:id', postController.getThisPost); */

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);

module.exports = router;
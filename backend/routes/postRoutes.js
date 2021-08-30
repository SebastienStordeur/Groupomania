const express = require('express');
const { routes } = require('../app');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPost);
//router.get('/:id', postController.getThisPost); 

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

//Likes && dislikes
router.post('/:id/like', postController.likePost);

module.exports = router;
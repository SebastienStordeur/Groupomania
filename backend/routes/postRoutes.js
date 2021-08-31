const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('../middleware/multer-config');

router.get('/', postController.getAllPost);
//router.get('/:id', postController.getThisPost); 

router.post('/',  postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

//Likes && dislikes
router.post('/:id/like', postController.likePost);

module.exports = router;
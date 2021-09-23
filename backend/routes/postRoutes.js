const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const multer = require("../middleware/multer-config");
const passport = require("passport");
const isAuthenticated = require("../middleware/isAuthenticated");

//Posts
router.post('/', multer, postController.createPost);
router.get('/', postController.getAllPost);
router.get('/:userId', postController.getPostWithUserId); 

router.delete('/:id', postController.deletePost);

//Likes && dislikes
router.post('/:id/like', postController.likePost);

//Comments
router.post('/:id/comment', postController.createComment);
router.get('/:id/comment', postController.getComments);
//router.delete('/:id/comment/:commentId', postController.deleteComment);

module.exports = router;
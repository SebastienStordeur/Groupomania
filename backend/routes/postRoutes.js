const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

//Posts
router.post("/", auth, multer, postController.createPost);
router.get("/",  postController.getAllPost);
router.get("/:userId", auth, postController.getPostWithUserId); 

router.delete('/:id', auth, postController.deletePost);

//Likes && dislikes
router.post("/:id/like", auth, postController.like);
router.post("/:id/dislike", auth, postController.dislike);

//Comments
router.post("/:id/comment", auth, postController.createComment);
router.get("/:id/comment",  auth, postController.getComments);

module.exports = router;
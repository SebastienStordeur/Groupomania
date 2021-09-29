const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

//router.get("/:id", commentController.getComments);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
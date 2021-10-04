const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
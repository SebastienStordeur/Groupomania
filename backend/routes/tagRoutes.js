const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

router.post("/createTag", tagController.createTag);
router.get("/getTags", tagController.getTags);
router.delete("/:id/deleteTag", tagController.deleteTag);

module.exports = router;
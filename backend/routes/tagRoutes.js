const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

router.post("/createTag", tagController.createTag);

module.exports = router;
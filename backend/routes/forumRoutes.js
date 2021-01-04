const express = require("express");
const forumController = require("../controllers/forumController");
const router = express.Router();

router.post("", forumController.createForum);
router.get("", forumController.forumParamSearch);
router.delete("/:id", forumController.deleteForum);

module.exports = router;

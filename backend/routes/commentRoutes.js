const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.get("", commentController.commentParamSearch);
router.post("", commentController.createComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;

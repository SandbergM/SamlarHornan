const express = require("express");
const threadController = require("../controllers/threadController");
const router = express.Router();

router.get("", threadController.threadParamSearch);
router.post("", threadController.createThread);
router.put("/:id", threadController.updateThread);

module.exports = router;

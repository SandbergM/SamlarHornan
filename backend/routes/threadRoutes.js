const express = require("express");
const threadController = require("../controllers/threadController");
const router = express.Router();

router.post("", threadController.createThread);
router.get("", threadController.threadParamSearch);
router.put("/:id", threadController.updateThread);
router.delete("/:id", threadController.updateThread);

module.exports = router;

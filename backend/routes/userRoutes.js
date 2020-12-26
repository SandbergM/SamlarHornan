const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("", userController.memberSearch);
router.post("", userController.registerAccount);
router.put("", userController.updateAccount);

module.exports = router;

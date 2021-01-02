const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("", authController.signIn);
router.get("", authController.whoami);
router.delete("", authController.logout);

module.exports = router;

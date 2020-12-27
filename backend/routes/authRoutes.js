const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("", authController.signIn);
router.delete("", authController.logout);
router.get("", authController.whoami);

module.exports = router;

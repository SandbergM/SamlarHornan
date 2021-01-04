const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const RateLimit = require("express-rate-limit");

const limit = (maxAttempts) => {
  return new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: maxAttempts,
  });
};

router.post("", limit(5), authController.signIn);
router.get("", authController.whoami);
router.delete("", authController.logout);

module.exports = router;

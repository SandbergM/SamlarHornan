const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

const RateLimit = require("express-rate-limit");

const limit = (maxAttempts) => {
  return new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: maxAttempts,
  });
};

router.get("", userController.userParamSearch);
router.post("", limit(5), userController.registerAccount);
router.put("/:id", userController.updateAccount);
router.delete("/:id", userController.deleteAccount);

module.exports = router;

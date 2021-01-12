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
router.post("", userController.registerAccount);
router.put("/upgrade", userController.upgradeAccount);
router.put("/downgrade", userController.downgradeAccount);
router.delete("/:id", userController.deleteAccount);

module.exports = router;

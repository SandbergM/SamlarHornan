const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("", userController.userParamSearch);
router.post("", userController.registerAccount);
router.put("/:id", userController.updateAccount);
router.delete("/:id", userController.deleteAccount);

module.exports = router;

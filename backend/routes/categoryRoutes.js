const express = require("express");
const authController = require("../controllers/categoryController");
const router = express.Router();

router.get("", authController.getCategories);

module.exports = router;

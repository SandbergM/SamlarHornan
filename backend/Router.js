const express = require("express");
const router = express.Router();

router.use("/api/v1/users", require("./routes/userRoutes"));
router.use("/api/v1/auth", require("./routes/authRoutes"));

module.exports = router;

const express = require("express");
const router = express.Router();

router.use("/api/v1/users", require("./routes/userRoutes"));

module.exports = router;

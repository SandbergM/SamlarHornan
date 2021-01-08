const express = require("express");
const router = express.Router();

router.use("/api/v1/users", require("./routes/userRoutes"));
router.use("/api/v1/auth", require("./routes/authRoutes"));
router.use("/api/v1/forums", require("./routes/forumRoutes"));
router.use("/api/v1/categories", require("./routes/categoryRoutes"));
router.use("/api/v1/threads", require("./routes/threadRoutes"));
router.use("/api/v1/comments", require("./routes/commentRoutes"));

module.exports = router;

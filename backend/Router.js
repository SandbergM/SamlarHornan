const express = require("express");
const router = express.Router();

// Add Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

router.use("/api/v1/users", require("./routes/userRoutes"));
router.use("/api/v1/auth", require("./routes/authRoutes"));
router.use("/api/v1/forums", require("./routes/forumRoutes"));
router.use("/api/v1/categories", require("./routes/categoryRoutes"));
router.use("/api/v1/threads", require("./routes/threadRoutes"));
router.use("/api/v1/comments", require("./routes/commentRoutes"));
router.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./swagger.json"))
);

module.exports = router;

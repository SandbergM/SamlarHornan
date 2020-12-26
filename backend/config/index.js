require("dotenv").config();

module.exports = {
  PORT: process.env.APP_PORT,
  SECRET: process.env.APP_SECRET,
  SALT: process.env.APP_SALT,
};

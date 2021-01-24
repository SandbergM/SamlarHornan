require("dotenv").config();
module.exports = {
  SECRET: process.env.APP_SECRET,
  SALT: process.env.APP_SALT,
};

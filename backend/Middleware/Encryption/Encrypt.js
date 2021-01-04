const crypto = require("crypto");
const { SALT } = require("../../config");

module.exports = class Encrypt {
  static encrypt(password) {
    return crypto.createHmac("sha256", SALT).update(password).digest("hex");
  }

  static multiEncrypt(password, encryptTimes = 9999) {
    while (encryptTimes--) {
      password = this.encrypt(password);
    }
    return password;
  }
};

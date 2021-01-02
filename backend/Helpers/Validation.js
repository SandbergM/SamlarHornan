const missingField = (fields) => {
  for (let [key, val] of Object.entries(fields)) {
    if (!val) {
      return key;
    }
  }
};

const isNumber = (fields) => {
  for (let [key, val] of Object.entries(fields)) {
    if (isNaN(val)) {
      return key;
    }
  }
};

const sqliteBoolean = (bool) => {
  switch (bool.toLowerCase()) {
    case "true":
      return 0;
    case "false":
      return 1;
  }
};

const validEmail = (email) => {
  let validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.match(validEmailPattern);
};

const validPassword = (password) => {
  let start = `Password needs to contain at least`;
  if (!password.match(/[a-z]+/)) return `${start} one lowercase letter`;
  if (!password.match(/[A-Z]+/)) return `${start} one uppercase letter`;
  if (!password.match(/[0-9]+/)) return `${start} one digit`;
  if (!password.match(/[$@#&!]+/)) return `${start} one special character`;
  if (password.length < 7) return `${start} 8 characters`;
  return false;
};

module.exports = {
  missingField,
  sqliteBoolean,
  validEmail,
  isNumber,
  validPassword,
};

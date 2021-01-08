const requiredFields = (fields) => {
  for (let [key, val] of Object.entries(fields)) {
    if (val === undefined) {
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

const validateDataTypes = ({ NUMBER, STRING, BOOLEAN }) => {
  if (NUMBER) {
    for (let [key, val] of Object.entries(NUMBER)) {
      if (!Number(val)) {
        return `${key} needs to be of type Number`;
      }
    }
  }

  if (STRING) {
    for (let [key, val] of Object.entries(STRING)) {
      if (typeof val !== "string") {
        return `${key} needs to be of type String`;
      }
    }
  }

  if (BOOLEAN) {
    for (let [key, val] of Object.entries(BOOLEAN)) {
      if (typeof val !== "Boolean") {
        return `${key} needs to be of type Boolean`;
      }
    }
  }
};

module.exports = {
  requiredFields,
  sqliteBoolean,
  validEmail,
  isNumber,
  validPassword,
  validateDataTypes,
};

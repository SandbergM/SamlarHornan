/*
Checks if any field is undefined and sends back an response if a value is missing
*/
const requiredFields = (fields) => {
  for (let [key, val] of Object.entries(fields)) {
    if (val === undefined) {
      return key;
    }
  }
};

/*
Checks if the datatype is correct
*/
const requiredDataTypes = (data) => {
  for (let [dataType, fields] of Object.entries(data)) {
    if (fields) {
      for (let [key, val] of Object.entries(fields)) {
        if (val && typeof val !== dataType) {
          return `${key} requires type ${dataType.toUpperCase()}`;
        }
      }
    }
  }
};

/*
Pattern used to check if an email is valid or not
*/
const validEmail = (email) => {
  let validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.match(validEmailPattern);
};

/*
Rules / Requirements for a valid password
*/
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
  requiredFields,
  requiredDataTypes,
  validEmail,
  validPassword,
};

const missingField = (fields) => {
  console.log(fields);
  for (let [key, val] of Object.entries(fields)) {
    if (!val) {
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
  let validEmailPattern = /^[^ ]+@[^ ]+\-[a-z]{2,3}$/;
  return email.matches(validEmailPattern);
};

module.exports = {
  missingField,
  sqliteBoolean,
  validEmail,
};

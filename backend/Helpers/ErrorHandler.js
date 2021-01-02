const missingField = (fields) => {
  for (let field of Object.entries(fields)) {
    if (!field[1]) {
      return field[0];
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

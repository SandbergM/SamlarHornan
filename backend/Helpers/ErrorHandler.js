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

module.exports = {
  missingField,
  sqliteBoolean,
};

const missingField = (fields) => {
  for (let field of Object.entries(fields)) {
    if (!field[1]) {
      return field[0];
    }
  }
};

module.exports = {
  missingField,
};

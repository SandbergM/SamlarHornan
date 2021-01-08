const { categorySearch } = require("../Queries/CategoryQueries");

/*
# CREATE
*/
const createCategory = (req, res) => {};

/*
# CREATE
*/
const getCategories = (req, res) => {
  let categories = categorySearch();
  let found = categories.length;
  res.status(found ? 200 : 404).send(found ? categories : `Not found`);
};

module.exports = {
  getCategories,
};

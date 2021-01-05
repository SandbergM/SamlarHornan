const { forumSearch, removeForum } = require("../Queries/ForumQueries");

/*
# CREATE
*/
const createCategory = (req, res) => {};

/*
# CREATE
*/
const getCategories = (req, res) => {
  let forums = forumSearch(req.query);
  let found = forums.length;
  res.status(found ? 200 : 404).send(found ? forums : `Not found`);
};

module.exports = {};

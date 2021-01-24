const { forumSearch, removeForum } = require("../Queries/ForumQueries");
const { requiredFields, requiredDataTypes } = require("../Helpers/Validation");
const Forum = require("../models/Forum");
const { findBy, saveToDb } = require("../Queries/SharedQueries");

/*
# CREATE
*/
const createForum = (req, res) => {
  const { name, description, url, categoryId } = req.body;
  let requestIncomplete = requiredFields({
    name,
    description,
    url,
    categoryId,
  });

  let categoryExists = findBy("categories", { id: categoryId });

  if (!categoryExists) {
    return res.status(404).send(`Category not found`);
  }

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  let badRequest = validateDataInput(req.body);

  if (badRequest) {
    return res.status(400).send(badRequest);
  }

  if (findBy("forums", { name, url })) {
    return res.status(409).send(`Name or url already taken`);
  }
  let forum = saveToDb("forums", new Forum({ ...req.body }));
  saveToDb("roles", { type: "MODERATOR", forumId: forum.lastInsertRowid });
  res.status(forum ? 201 : 400).send(forum ? forum : `Bad request`);
};

/*
# READ
*/
const forumParamSearch = (req, res) => {
  let forums = forumSearch(req.query);
  let found = forums.length;
  res.status(found ? 200 : 404).send(found ? forums : `Not found`);
};

/*
# UPDATE
*/
const updateForum = () => {};

/*
# DELETE
*/
const deleteForum = (req, res) => {
  if (!findBy("forums", { id: req.params.id })) {
    return res.status(404).send(`Not found`);
  }
  res.status(200).send({ deletedForum: removeForum(req.params.id) });
};

// Check for bad input - validate that the datatypes provided are of the type that is expected
const validateDataInput = (params) => {
  const { id, name, description, url, categoryId } = params;
  return requiredDataTypes({
    string: { name, description, url },
    number: { id, categoryId },
  });
};

module.exports = {
  createForum,
  forumParamSearch,
  updateForum,
  deleteForum,
};

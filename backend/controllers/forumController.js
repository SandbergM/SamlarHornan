const { forumSearch, removeForum } = require("../Queries/ForumQueries");
const { missingField } = require("../Helpers/Validation");
const Forum = require("../models/Forum");
const { existsBy, saveToDb } = require("../Queries/SharedQueries");

/*
# CREATE
*/
const createForum = (req, res) => {
  const { name, description, url } = req.body;
  let requestIncomplete = missingField({ name, description, url });

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  if (existsBy("forums", { name, url })) {
    return res.status(409).send(`Name or url already taken`);
  }

  let forum = saveToDb("forums", new Forum({ name, description, url }));
  saveToDb("roles", { type: "MODERATOR", forumId: forum.lastInsertRowid });
  res.status(forum ? 200 : 400).send(forum ? forum : `Bad request`);
};

/*
# CREATE
*/
const forumParamSearch = (req, res) => {
  let forums = forumSearch(req.query);
  let found = forums.length;
  res.status(found ? 200 : 400).send(found ? forums : `Not found`);
};

/*
# CREATE
*/
const updateForum = () => {};

/*
# DELETE
*/
const deleteForum = (req, res) => {
  if (!existsBy("forums", { id: req.params.id })) {
    return res.status(404).send(`Not found`);
  }
  res.status(200).send({ deletedForum: removeForum(req.params.id) });
};

module.exports = {
  createForum,
  forumParamSearch,
  updateForum,
  deleteForum,
};

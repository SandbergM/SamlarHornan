const { forumSearch } = require("../Queries/ForumQueries");
const { existsBy, saveToDb } = require("../Queries/SharedQueries");
const { missingField } = require("../Helpers/ErrorHandler");
const Forum = require("../models/Forum");

const createForum = (req, res) => {
  const { name, description, url } = req.body;
  let requestIncomplete = missingField({ name, description, url });

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  let taken = checkUniqueFields(req.body);
  if (taken) {
    return res.status(409).send(taken);
  }

  let forum = saveToDb("forums", new Forum({ name, description, url }));
  res.status(forum ? 200 : 400).send(forum ? forum : `Bad request`);
};

const forumParamSearch = (req, res) => {
  let forums = forumSearch(req.query);
  let found = forums.length;
  res.status(found ? 200 : 400).send(found ? forums : `Not found`);
};

const updateForum = () => {};

const checkUniqueFields = (params) => {
  const { url, name } = params;
  return existsBy("forums", { url, name });
};

module.exports = {
  createForum,
  forumParamSearch,
  updateForum,
};

const { userSearch, removeUser } = require("../queries/UserQueries");
const { existsBy, saveToDb } = require("../Queries/SharedQueries");
const { missingField, validEmail } = require("../Helpers/ErrorHandler");
const User = require("../models/User");

/*
# CREATE
*/
const registerAccount = (req, res) => {
  const { email, username } = req.body;
  let requestIncomplete = missingField({ email, username });

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  if (!validEmail(email)) {
    return res.status(400).send(`Invalid email`);
  }

  if (existsBy("users", { email, username })) {
    return res.status(409).send(`Username or email already taken`);
  }

  let user = saveToDb("users", new User({ ...req.body }));
  res.status(user ? 200 : 401).send(user ? user : `Could not process request`);
};

/*
# READ
*/
const userParamSearch = (req, res) => {
  let users = userSearch(req.query);
  let found = users.length;
  res.status(found ? 200 : 404).json(found ? users : `Not found`);
};

/*
# UPDATE
*/
const updateAccount = (req, res) => {};

/*
# DELETE
*/
const deleteAccount = (req, res) => {
  if (!existsBy("users", { id: req.params.id })) {
    return res.status(404).send(`Not found`);
  }

  res.status(200).send({ deletedUser: removeUser(req.params.id) });
};

module.exports = {
  userParamSearch,
  registerAccount,
  updateAccount,
  deleteAccount,
};

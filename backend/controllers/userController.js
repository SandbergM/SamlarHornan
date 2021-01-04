const { userSearch, removeUser } = require("../queries/UserQueries");
const { findBy, saveToDb } = require("../Queries/SharedQueries");
const {
  requiredFields,
  validEmail,
  validPassword,
} = require("../Helpers/Validation");
const User = require("../models/User");

/*
# CREATE
*/
const registerAccount = (req, res) => {
  const { email, username, password } = req.body;
  let requestIncomplete = requiredFields({ email, username });
  let weakPassword = validPassword(password);

  if (weakPassword) {
    return res.status(400).send(weakPassword);
  }

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  if (!validEmail(email)) {
    return res.status(400).send(`Invalid email`);
  }

  if (findBy("users", { email, username })) {
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
  const { id } = req.params;
  if (!findBy("users", { id })) {
    return res.status(404).send(`Not found`);
  }

  let deleted = removeUser({ id });

  res.status(200).send({ deletedUser: deleted });
};

module.exports = {
  userParamSearch,
  registerAccount,
  updateAccount,
  deleteAccount,
};

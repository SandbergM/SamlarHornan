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
    res.statusMessage = weakPassword;
    res.status(400).end();
  }

  if (requestIncomplete) {
    res.statusMessage = `Missing : ${requestIncomplete}`;
    res.status(400).end();
  }

  if (!validEmail(email)) {
    res.statusMessage = `Invalid Email`;
    res.status(400).end();
  }

  if (findBy("users", { email })) {
    res.statusMessage = `Email already registered`;
    res.status(409).end();
  }

  if (findBy("users", { username })) {
    res.statusMessage = `Username already registered`;
    res.status(409).end();
  }

  let user = saveToDb("users", new User({ ...req.body }));
  res.status(user ? 200 : 404).send(user);
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
    res.statusMessage = `No user with id : ${id}`;
    res.status(404).end();
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

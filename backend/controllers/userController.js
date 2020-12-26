const { userSearch, existsBy, createUser } = require("../queries/UserQueries");
const User = require("../models/User");

const memberSearch = (req, res) => {
  let users = userSearch(req.query);
  if (users.length === 0) {
    return res.status(404).json("Not found");
  }
  res.status(200).json(users);
};

const updateAccount = (req, res) => {};

const registerAccount = (req, res) => {
  if (checkUniqueFields(req.body)) {
    return res.status(409).send(`Username or email already taken`);
  }
  if (missingField(req.body)) {
    return res.status(400).send(`Missing : ${missingField(req.body)}`);
  }
  res.status(200).send(createUser(new User({ ...req.body })));
};

const checkUniqueFields = ({ email, username }) => {
  return existsBy({ email: email }) || existsBy({ username: username });
};

const missingField = ({ email, password, username }) => {
  if (!email) return "email";
  if (!password) return "password";
  if (!username) return "username";
  return false;
};

module.exports = {
  memberSearch,
  registerAccount,
  updateAccount,
};

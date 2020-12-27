const {
  userSearch,
  existsBy,
  createUser,
  updateUser,
} = require("../queries/UserQueries");
const User = require("../models/User");

const memberSearch = (req, res) => {
  let users = userSearch(req.query);
  let found = users.length;
  res.status(found ? 200 : 404).json(found ? users : `Not found`);
};

const updateAccount = (req, res) => {
  let oldUser = userSearch({ id: req.params.id })[0];
  let newUser = new User({ ...req.body });
  if (!oldUser) {
    return res.status(400).send(`Not found`);
  }
};

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

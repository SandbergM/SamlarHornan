const {
  userSearch,
  removeUser,
  removeRole,
  addRole,
} = require("../queries/UserQueries");
const { findBy, saveToDb } = require("../Queries/SharedQueries");
const {
  requiredFields,
  requiredDataTypes,
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

  let badInput = validateDataInput(req.body);

  if (badInput) {
    return res.status(400).send(badInput);
  }

  if (!validEmail(email)) {
    return res.status(400).send(`Invalid Email`);
  }

  if (findBy("users", { email })) {
    return res.status(409).send(`Email already registered`);
  }

  if (findBy("users", { username })) {
    return res.status(409).send(`Username already registered`);
  }

  let user = saveToDb("users", new User({ ...req.body }));
  console.log("DONE");
  res.status(user ? 201 : 404).send({ userCreated: user ? true : false });
};

/*
# READ
*/
const userParamSearch = (req, res) => {
  const { user } = req.session;
  let admin = user && user.roles.includes("ADMIN");
  let users = userSearch(req.query, admin);
  let found = users.length;
  res.status(found ? 200 : 404).json(found ? users : `Not found`);
};

/*
# UPDATE
*/
const upgradeAccount = (req, res) => {
  const { userId, forumId } = req.body;

  let requestIncomplete = requiredFields({ id: userId, forumId });

  let badInput = validateDataInput(req.body);

  if (requestIncomplete || badInput) {
    return res.status(400).send(requestIncomplete || badInput);
  }

  let user = findBy("users", { id: userId });
  let forum = findBy("forums", { id: forumId });

  if (!user || !forum) {
    return res.status(404).send(`Not found`);
  }

  let role = findBy("roles", { forumId });

  try {
    addRole({ userId, roleId: role.id });
  } catch (e) {
    return res.status(400).send({ accountUpdated: false });
  }
  res.status(200).send({ accountUpdated: true });
};

const downgradeAccount = (req, res) => {
  const { userId, roleId } = req.body;
  let user = findBy("users", { id: userId });
  let role = findBy("roles", { forumId: roleId });

  let requestIncomplete = requiredFields({ userId, roleId });

  let badInput = validateDataInput(req.body);

  if (requestIncomplete || badInput) {
    return res.status(400).send(requestIncomplete || badInput);
  }

  if (!user || !role) {
    return res.status(400).send(`Not found`);
  }
  removeRole({ userId, roleId: role.id });
  res.status(200).send({ roleRemoved: true });
};

/*
# DELETE
*/
const deleteAccount = (req, res) => {
  const { id } = req.params;
  if (!findBy("users", { id })) {
    return res.status(404).send(`No user with id : ${id}`);
  }

  let deleted = removeUser({ id });
  res.status(200).send({ deletedUser: deleted });
};

const validateDataInput = (params) => {
  const { id, username, email, password, firstName, lastName, roleId } = params;
  return requiredDataTypes({
    string: { username, email, password, firstName, lastName },
    number: { id, roleId },
  });
};

module.exports = {
  userParamSearch,
  registerAccount,
  upgradeAccount,
  downgradeAccount,
  deleteAccount,
};

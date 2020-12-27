const SearchQuery = require("./QueryBuilders/SearchQuery");
const Encrypt = require("../middleware/Encryption/Encrypt");
const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

/*
General user-search
The SearchQuery-class filters and only use buildes with the fields where the value is not undefined
*/
const userSearch = ({ username, email, id, page, sortBy, orderBy }) => {
  let users = new SearchQuery({
    TABLE: "users",
    LIKE: { username },
    EQUAL: { email, id },
    LIMIT: 100,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();

  users.forEach((user) => {
    delete user.password;
    delete user.email;
    delete user.id;
  });

  return users;
};

/* User-login */
const userAuthentication = ({ email, password }) => {
  console.log({ email, password });
  if (!email || !password) return null;
  let user = new SearchQuery({
    TABLE: "users",
    EQUAL: { email, password: Encrypt.multiEncrypt(password) },
  }).run();

  user = user[0];
  if (user) {
    user.roles = getUserRoles(user.id);
    delete user.password;
  }
  return user;
};

/* Fetches what forums a user is moderator in */
const getUserRoles = (id) => {
  let roles = ["USER"];
  let statement = db.prepare(`
  SELECT type FROM roles, usersXroles
  WHERE usersXroles.userId = $id 
  AND roles.id = usersXroles.roleId
  GROUP BY type
  `);
  let result = statement.all({ id: id });
  result.forEach((val) => {
    roles.push(val.type);
  });
  return roles;
};

module.exports = {
  userSearch,
  userAuthentication,
};

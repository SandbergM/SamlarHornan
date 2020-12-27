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
    delete user.isAdmin;
    delete user.id;
  });

  return users;
};

/* 
Used to check if email or username is already registered to a user
Made dynamic 
 */

const existsBy = (param) => {
  let res = new SearchQuery({
    TABLE: "users",
    EQUAL: {
      [Object.keys(param)[0].toString()]: Object.values(param)[0].toString(),
    },
  }).run();
  return res.length !== 0;
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
    user.roles = getUserRoles(user);
    delete user.password;
  }
  return user;
};

const createUser = (user) => {
  user.isAdmin = 0;
  user.password = Encrypt.multiEncrypt(user.password);
  return db
    .prepare(
      `INSERT INTO users (${Object.keys(user)})
       VALUES (${Object.keys(user).map((x) => "$" + x)})`
    )
    .run({ ...user });
};

/* Fetches what forums a user is moderator in */
const getModeratorRights = (id) => {
  let editorPermissions = [];
  let statement = db.prepare(`
  SELECT url FROM moderatorsXforums, forums
  WHERE userId = $id 
  AND forums.id = moderatorsXforums.forumId
  GROUP BY url
  `);
  let result = statement.all({ id: id });
  result.forEach((val) => {
    editorPermissions.push(val.url);
  });
  return editorPermissions;
};

const getUserRoles = (user) => {
  let roles = {
    USER: true,
  };
  let editorPermissions = getModeratorRights(user.id);
  if (editorPermissions.length) {
    roles["MODERATOR"] = editorPermissions;
  }
  if (user.isAdmin) {
    roles["ADMIN"] = true;
  }

  return roles;
};

module.exports = {
  userSearch,
  getModeratorRights,
  userAuthentication,
  createUser,
  existsBy,
};

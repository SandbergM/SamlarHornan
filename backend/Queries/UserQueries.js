const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");
const SearchQuery = require("./QueryBuilders/SearchQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");
const InsertQuery = require("./QueryBuilders/InsertQuery");

const userSearch = (params, admin) => {
  const { username, email, id, page, sortBy, orderBy } = params;
  let users = new SearchQuery({
    TABLE: "users",
    SELECT: `${
      admin
        ? "id, email, username, firstName, lastName"
        : "username, firstName, lastName"
    }`,
    LIKE: { username },
    EQUAL: { email, id },
    LIMIT: 25,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();

  if (admin) {
    users.forEach((user) => {
      let { roles, permissions } = getUserRolesAndPermissions(user.id);
      user.roles = roles;
      user.permissions = permissions;
    });
  }

  return users;
};

const removeRole = (params) => {
  const { userId, roleId } = params;
  new DeleteQuery({
    TABLE: "usersXroles",
    ENTITY: { userId, roleId },
  }).run();
  return true;
};

const addRole = (params) => {
  const { userId, roleId } = params;
  new InsertQuery({
    TABLE: "usersXroles",
    ENTITY: { userId, roleId },
  }).run();
  return true;
};

const removeUser = (params) => {
  const { id } = params;
  new DeleteQuery({ TABLE: "usersXroles", ENTITY: { userId: id } }).run();
  new DeleteQuery({ TABLE: "comments", ENTITY: { userId: id } }).run();
  new DeleteQuery({ TABLE: "users", ENTITY: { id } }).run();
  return true;
};

const getUserRolesAndPermissions = (id) => {
  let roles = ["USER"];
  let permissions = {};
  let statement = db.prepare(`
      SELECT * FROM roles, usersXroles
      LEFT JOIN forums ON roles.forumId = forums.id
      WHERE usersXroles.userId = ${id} 
      AND usersXroles.roleId = roles.id 
      GROUP BY roles.id
    `);
  let result = statement.all({ id: id });
  result.forEach((val) => {
    roles.push(val.type);
    if (val.url) {
      permissions[val.url] = val.forumId;
    }
  });
  return { roles: [...new Set(roles)], permissions };
};

module.exports = {
  userSearch,
  removeUser,
  removeRole,
  addRole,
  getUserRolesAndPermissions,
};

const SearchQuery = require("./QueryBuilders/SearchQuery");
const Encrypt = require("../middleware/Encryption/Encrypt");
const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

const userAuthentication = (params) => {
  const { email, password } = params;
  let user = new SearchQuery({
    TABLE: "users",
    EQUAL: { email, password: Encrypt.multiEncrypt(password) },
  }).run();

  user = user[0];
  if (user) {
    let { roles, permissions } = getUserRolesAndPermissions(user.id);
    user.roles = roles;
    user.permissions = permissions;
    delete user.password;
  }
  return user;
};

const getUserRolesAndPermissions = (id) => {
  let roles = ["USER"];
  let permissions = {};
  let statement = db.prepare(`
    SELECT * FROM roles, usersXroles, forums
    WHERE usersXroles.userId = $id 
    AND usersXroles.roleId = roles.id 
    GROUP BY forumId
    `);
  let result = statement.all({ id: id });
  result.forEach((val) => {
    roles.push(val.type);
    permissions[val.url] = val.forumId;
  });
  return { roles: [...new Set(roles)], permissions };
};

module.exports = {
  userAuthentication,
};

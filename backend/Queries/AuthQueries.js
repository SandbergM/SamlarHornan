const SearchQuery = require("./QueryBuilders/SearchQuery");
const Encrypt = require("../middleware/Encryption/Encrypt");
const { getUserRolesAndPermissions } = require("./UserQueries");

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

module.exports = {
  userAuthentication,
};

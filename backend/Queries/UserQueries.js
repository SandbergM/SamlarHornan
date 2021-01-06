const SearchQuery = require("./QueryBuilders/SearchQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");

const userSearch = (params) => {
  const { username, email, id, page, sortBy, orderBy } = params;
  let users = new SearchQuery({
    TABLE: "users",
    LIKE: { username },
    EQUAL: { email, id },
    LIMIT: 25,
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

const removeUser = (params) => {
  const { id } = params;
  new DeleteQuery({ TABLE: "usersXroles", ENTITY: { userId: id } }).run();
  new DeleteQuery({ TABLE: "comments", ENTITY: { userId: id } }).run();
  new DeleteQuery({ TABLE: "users", ENTITY: { id } }).run();
  return true;
};

module.exports = {
  userSearch,
  removeUser,
};

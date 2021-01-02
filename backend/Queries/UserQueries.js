const SearchQuery = require("./QueryBuilders/SearchQuery");

const userSearch = (params) => {
  const { username, email, id, page, sortBy, orderBy } = params;
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

module.exports = {
  userSearch,
};

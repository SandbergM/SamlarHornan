const SearchQuery = require("./QueryBuilders/SearchQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");

const commentSearch = (params) => {
  const { threadId, userId, message, page, sortBy, orderBy } = params;
  return new SearchQuery({
    TABLE: "comments",
    LIKE: { message },
    EQUAL: { threadId, userId },
    LIMIT: 100,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();
};

const removeComment = (id) => {
  return new DeleteQuery({ TABLE: "comments", ENTITY: { id } });
};

module.exports = {
  commentSearch,
  removeComment,
};

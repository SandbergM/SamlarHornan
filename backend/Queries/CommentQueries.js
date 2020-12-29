const SearchQuery = require("./QueryBuilders/SearchQuery");
const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

const commentSearch = (params) => {
  const { threadId, userId, message, page, sortBy, orderBy } = params;
  let forums = new SearchQuery({
    TABLE: "comments",
    LIKE: { message },
    EQUAL: { threadId, userId },
    LIMIT: 100,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();
  return forums;
};

const deleteComment = (params) => {
  return db
    .prepare(
      `
  DELETE FROM comments
  WHERE id = $id
  `
    )
    .run({ ...params });
};

module.exports = {
  commentSearch,
  deleteComment,
};

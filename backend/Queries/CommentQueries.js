const SearchQuery = require("./QueryBuilders/SearchQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");

const commentSearch = (params) => {
  const { threadId, userId, message, page, sortBy, orderBy } = params;
  let comments =
    new SearchQuery({
      TABLE: "comments",
      LIKE: { message },
      EQUAL: { threadId, userId },
      LIMIT: 25,
      PAGE: { page },
      SORT: { sortBy, orderBy },
    }).run() || [];

  comments.forEach((comment) => {
    comment.sender = appendSenderToComment(userId);
  });

  return comments;
};

const appendSenderToComment = (id) => {
  return new SearchQuery({
    TABLE: "users",
    SELECT: "username, firstName, lastName",
    EQUAL: { id },
  }).run();
};

const removeComment = (id) => {
  return new DeleteQuery({ TABLE: "comments", ENTITY: { id } }).run();
};

module.exports = {
  commentSearch,
  removeComment,
};

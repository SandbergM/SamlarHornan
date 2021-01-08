const SearchQuery = require("./QueryBuilders/SearchQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");

const threadSearch = (params) => {
  const { id, title, forumId, page, sortBy, orderBy } = params;
  let threads =
    new SearchQuery({
      TABLE: "threads",
      LIKE: { title },
      EQUAL: { id, forumId },
      LIMIT: 25,
      PAGE: { page },
      SORT: { sortBy, orderBy },
    }).run() || [];

  threads.forEach((thread) => {
    thread.comments = appendNumberOfThreads(thread.id);
  });

  return threads;
};

const appendNumberOfThreads = (id) => {
  let comments = new SearchQuery({
    TABLE: "comments",
    SELECT: "COUNT(comments.id), id",
    EQUAL: { threadId: id },
  }).run()[0];
  return parseInt(Object.values(comments));
};

const removeThread = (id) => {
  let comments = new DeleteQuery({
    TABLE: "comments",
    ENTITY: { threadId: id },
  }).run();
  let thread = new DeleteQuery({ TABLE: "threads", ENTITY: { id } }).run();
  return thread && comments;
};

module.exports = {
  threadSearch,
  removeThread,
};

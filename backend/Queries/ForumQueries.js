const SearchQuery = require("./QueryBuilders/SearchQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");

const forumSearch = (params) => {
  const { name, description, url, page, sortBy, orderBy, categoryId } = params;
  let forums =
    new SearchQuery({
      TABLE: "forums",
      LIKE: { name, description, url },
      EQUAL: { categoryId },
      LIMIT: 25,
      PAGE: { page },
      SORT: { sortBy, orderBy },
    }).run() || [];

  forums.forEach((forum) => {
    forum.threads = appendNumberOfThreads(forum.id);
  });

  return forums;
};

const appendNumberOfThreads = (id) => {
  let threads = new SearchQuery({
    TABLE: "threads",
    SELECT: "COUNT(threads.id), id",
    EQUAL: { forumId: id },
  }).run()[0];
  return parseInt(Object.values(threads));
};

// Remove the forum and all of the associated entities from the DB
const removeForum = (id) => {
  let threadsToDelete = new SearchQuery({
    TABLE: "threads",
    EQUAL: { forumId: id },
  }).run();

  for (let thread of threadsToDelete) {
    new DeleteQuery({
      TABLE: "comments",
      ENTITY: { threadId: thread.id },
    }).run();
  }
  let role = new SearchQuery({
    TABLE: "roles",
    EQUAL: { forumId: id },
  }).run()[0];
  new DeleteQuery({
    TABLE: "usersXroles",
    ENTITY: { roleId: role.id },
  }).run();
  new DeleteQuery({ TABLE: "threads", ENTITY: { forumId: id } }).run();
  new DeleteQuery({ TABLE: "roles", ENTITY: { forumId: id } }).run();
  new DeleteQuery({ TABLE: "forums", ENTITY: { id: id } }).run();
  return true;
};

module.exports = {
  forumSearch,
  removeForum,
};

const SearchQuery = require("./QueryBuilders/SearchQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");

const forumSearch = (params) => {
  const { name, description, url, page, sortBy, orderBy } = params;
  let forums = new SearchQuery({
    TABLE: "forums",
    LIKE: { name, description, url },
    LIMIT: 100,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();
  return forums;
};

// Remove the forum and all of the associated entities from the DB
const removeForum = (id) => {
  let threadsToDelete = new SearchQuery({
    TABLE: "threads",
    EQUAL: { forumId: id },
  }).run();

  for (let thread of threadsToDelete) {
    new DeleteQuery({ TABLE: "comments", ENTITY: { threadId: thread.id } }).run();
  }
  let role = new SearchQuery({ TABLE: "roles", EQUAL: { forumId: id } }).run();
  new DeleteQuery({ TABLE: "usersXroles", ENTITY: { forumId: role.forumId } }).run();
  new DeleteQuery({ TABLE: "threads", ENTITY: { forumId: id } }).run();
  new DeleteQuery({ TABLE: "roles", ENTITY: { forumId: id } }).run();
  new DeleteQuery({ TABLE: "forums", ENTITY: { id: id } }).run();
  return true;
};

module.exports = {
  forumSearch,
  removeForum,
};

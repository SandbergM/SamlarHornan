const SearchQuery = require("./QueryBuilders/SearchQuery");

const threadSearch = (params) => {
  const { title, forumId, page, sortBy, orderBy } = params;
  let threads = new SearchQuery({
    TABLE: "threads",
    LIKE: { title },
    EQUAL: { forumId },
    LIMIT: 100,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();
  return threads;
};

const updateThread = (params) => {};

module.exports = {
  threadSearch,
  updateThread,
};

const SearchQuery = require("./QueryBuilders/SearchQuery");

const threadSearch = (params) => {
  const { title, forumId, page, sortBy, orderBy } = params;
  let threads = new SearchQuery({
    TABLE: "threads",
    LIKE: { title },
    EQUAL: { forumId },
    LIMIT: 25,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();
  return threads;
};

module.exports = {
  threadSearch,
};

const SearchQuery = require("./QueryBuilders/SearchQuery");

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

module.exports = {
  forumSearch,
};

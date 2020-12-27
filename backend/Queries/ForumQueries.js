const SearchQuery = require("./QueryBuilders/SearchQuery");

const forumSearch = ({ name, description, url, page, sortBy, orderBy }) => {
  let forums = new SearchQuery({
    TABLE: "forums",
    LIKE: { name, description, url },
    LIMIT: 100,
    PAGE: { page },
    SORT: { sortBy, orderBy },
  }).run();
  return forums;
};

const existsBy = (param) => {
  let res = new SearchQuery({
    TABLE: "users",
    EQUAL: {
      [Object.keys(param)[0].toString()]: Object.values(param)[0].toString(),
    },
  }).run();
  return res.length;
};

module.exports = {
  forumSearch,
  existsBy,
};

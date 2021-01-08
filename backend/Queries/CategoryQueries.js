const SearchQuery = require("./QueryBuilders/SearchQuery");

const categorySearch = () => {
  let categories =
    new SearchQuery({
      TABLE: "categories",
    }).run() || [];

  return categories;
};

module.exports = {
  categorySearch,
};

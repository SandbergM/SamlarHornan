const SearchQuery = require("./QueryBuilders/SearchQuery");
const InsertQuery = require("./QueryBuilders/InsertQuery");
const DeleteQuery = require("./QueryBuilders/DeleteQuery");
const Encrypt = require("../Middleware/Encryption/Encrypt");

const existsBy = (table, params) => {
  for (let param of Object.entries(params)) {
    if (param[1]) {
      let res = new SearchQuery({
        TABLE: table,
        EQUAL: {
          [param[0]]: param[1],
        },
      }).run();
      if (res.length) {
        return res[0];
      }
    }
  }
  return false;
};

const saveToDb = (table, params) => {
  if (params.password) {
    params.password = Encrypt.multiEncrypt(params.password);
  }
  let result = new InsertQuery({ TABLE: table, ENTITY: { ...params } }).run();
  delete result.password;
  return result;
};

const removeFromDb = (table, params) => {
  return new DeleteQuery({
    TABLE: table,
    ENTITY: { ...params },
  }).run();
};

module.exports = {
  existsBy,
  saveToDb,
  removeFromDb,
};

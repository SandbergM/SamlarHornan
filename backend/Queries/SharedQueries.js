const SearchQuery = require("./QueryBuilders/SearchQuery");
const Encrypt = require("../Middleware/Encryption/Encrypt");
const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

const existsBy = (table, params) => {
  for (let param of Object.entries(params)) {
    let res = new SearchQuery({
      TABLE: table,
      EQUAL: {
        [param[0]]: param[1],
      },
    }).run();
    if (res.length) {
      return true;
    }
  }
  return false;
};

const saveToDb = (table, entity) => {
  if (entity.password) {
    entity.password = Encrypt.multiEncrypt(entity.password);
  }
  return db
    .prepare(
      `INSERT INTO ${table} (${Object.keys(entity)})
       VALUES (${Object.keys(entity).map((x) => "$" + x)})`
    )
    .run({ ...entity });
};

module.exports = {
  existsBy,
  saveToDb,
};

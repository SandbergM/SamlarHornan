const SearchQuery = require("./QueryBuilders/SearchQuery");
const Encrypt = require("../Middleware/Encryption/Encrypt");
const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

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

const saveToDb = (table, entity) => {
  if (entity && entity.password) {
    entity.password = Encrypt.multiEncrypt(entity.password);
  }

  let statement = db.prepare(
    `INSERT INTO ${table} (${Object.keys(entity)})
     VALUES (${Object.keys(entity).map((x) => "$" + x)})`
  );
  let result = statement.run({ ...entity });
  delete entity.password;
  return result;
};

module.exports = {
  existsBy,
  saveToDb,
};

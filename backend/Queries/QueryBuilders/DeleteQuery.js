const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

module.exports = class DeleteQuery {
  #query = "";
  #params = {};

  constructor({ TABLE, PARAMS }) {
    this.#query += ` DELETE FROM ${TABLE} `;
    this.#query += this.#conditions(PARAMS);
    this.#params = { ...PARAMS };
  }

  #conditions(params) {
    let res = "";
    if (params) {
      Object.entries(params).map(([key, val]) => {
        if (val) {
          res += res.length ? `AND ` : `WHERE `;
          res += ` ${key} = $${key} `;
        }
      });
    }
    return res;
  }

  run() {
    if (Object.keys(this.#params).length) {
      return db.prepare(this.#query).run({ ...this.#params });
    }
    return false;
  }
};

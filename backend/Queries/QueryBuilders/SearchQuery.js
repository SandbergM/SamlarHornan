const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

module.exports = class SearchQuery {
  #search = "";
  #query = "";
  #select = "";
  #sortByQuery = "";
  #pagination = "";
  #limitNumber = "";
  #limitQuery = "";
  #bannedParams = ["password", "isAdmin"];
  #params = {};

  constructor({ TABLE, LIKE, EQUAL, LIMIT, PAGE, SORT }) {
    this.#search = `SELECT * FROM ${TABLE.split(",")} `;
    this.#search += this.#searchCriterias({ LIKE, EQUAL });
    this.#limitQuery = this.#limit(LIMIT || false) || "";
    this.#pagination = this.#page(PAGE || false) || "";
    this.#sortByQuery = this.#sortBy(SORT || false) || "";
    this.#params = { ...LIKE, ...EQUAL, ...LIMIT, ...PAGE, ...SORT };
  }

  #searchCriterias(criteras) {
    let res = "";
    Object.entries(criteras).map(([type, params]) => {
      if (params) {
        Object.entries(params).map(([key, val]) => {
          if (val) {
            res += res.length ? `AND ` : `WHERE `;
            res += this.#getSearchType(type, key);
          }
        });
      }
    });
    return res;
  }

  #sortBy({ sortBy, orderBy }) {
    if (this.#bannedParams.includes(sortBy)) return "";
    if (sortBy) {
      if (orderBy) {
        orderBy = orderBy.toUpperCase() === "ASC" ? " ASC" : " DESC";
      }
      return `ORDER BY ${sortBy} ${orderBy} `;
    }
  }

  #limit(limit) {
    if (limit) {
      this.#limitNumber = limit;
      return `LIMIT ${limit} `;
    }
  }

  #page({ page }) {
    if (page) {
      return `OFFSET ${(this.#limitNumber || 0) * (page - 1)} `;
    }
  }

  #getSearchType = (type, val) => {
    switch (type) {
      case "LIKE":
        return `${val} LIKE ( '%' || $${val} || '%') `;
      case "EQUAL":
        return `${val} = $${val} `;
    }
  };

  run() {
    this.#query += this.#select;
    this.#query += this.#search;
    this.#query += this.#sortByQuery;
    this.#query += this.#limitQuery;
    this.#query += this.#pagination;
    console.log(db.prepare(this.#query));
    return db.prepare(this.#query).all({ ...this.#params });
  }
};

module.exports = class Forum {
  static name;
  static description;
  static url;

  constructor({ name, description, url }) {
    this.name = name;
    this.description = description;
    this.url = url;
  }
};

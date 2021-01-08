module.exports = class Forum {
  static title;
  static forumId;
  static published;
  static isLocked;

  constructor({ title, forumId, published, isLocked }) {
    this.title = title;
    this.forumId = forumId;
    this.published = published;
    this.isLocked = isLocked ? 0 : 1;
  }
};

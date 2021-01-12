module.exports = class Forum {
  static title;
  static message;
  static forumId;
  static published;
  static isLocked;

  constructor({ title, message, forumId, published, isLocked }) {
    this.title = title;
    this.message = message;
    this.forumId = forumId;
    this.published = published;
    this.isLocked = isLocked ? 1 : 0;
  }
};

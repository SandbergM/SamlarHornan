module.exports = class Comment {
  static message;
  static userId;
  static highlighted;
  static threadId;
  static published;

  constructor({ message, userId, highlighted, threadId, published }) {
    this.message = message;
    this.userId = userId;
    this.highlighted = highlighted === true ? 1 : 0;
    this.threadId = threadId;
    this.published = published;
  }
};

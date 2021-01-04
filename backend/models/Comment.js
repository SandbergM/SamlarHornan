module.exports = class Forum {
  static message;
  static userId;
  static highlighted;
  static threadId;
  static published;

  constructor({ message, userId, highlighted, threadId, published }) {
    this.message = message;
    this.userId = userId;
    this.highlighted = highlighted;
    this.threadId = threadId;
    this.published = published;
  }
};

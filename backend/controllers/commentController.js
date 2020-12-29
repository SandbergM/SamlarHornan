const { existsBy, saveToDb } = require("../Queries/SharedQueries");
const { commentSearch, deleteComment } = require("../Queries/CommentQueries");
const { missingField } = require("../Helpers/ErrorHandler");
const Comment = require("../models/Comment");
const { timestampCurrentTime } = require("../Helpers/TimeStamp");

const createComment = (req, res) => {
  const { message, highlighted, threadId } = req.body;
  let requestIncomplete = missingField({ message, highlighted, threadId });
  let thread = existsBy("threads", { id: threadId });

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  if (!thread || thread.isLocked === 1) {
    return res.status(400).send(`Could not post to thread`);
  }

  let comment = new Comment({
    ...req.body,
    userId: req.session.user.id,
    published: timestampCurrentTime(),
  });
  let savedComment = saveToDb("comments", comment);

  if (!savedComment) {
    return res.status(400).send(`Could not complete request`);
  }

  res
    .status(201)
    .send(existsBy("comments", { id: savedComment.lastInsertRowid }));
};

const commentParamSearch = (req, res) => {
  let comments = commentSearch(req.query);
  if (comments.length === 0) {
    return res.status(404).send(`Not found`);
  }
  res.status(200).send(comments);
};

const removeComment = (req, res) => {
  const { id } = req.params;
  let comment = existsBy("comments", { id: id });
  let thread = existsBy("threads", { id: comment.threadId });
  let forum = existsBy("forums", { id: thread.forumId });
  let { user } = req.session;
  let isAdmin = user.roles.includes("ADMIN");
  let hasPermission = user.permissions[forum.url];

  if (!isAdmin) {
    if (!hasPermission) {
      return res.status(401).send(`Unauthorized`);
    }
  }

  if (!comment) {
    return res.status(404).send(`Not found`);
  }
  res.status(200).send(deleteComment({ id: id }));
};

module.exports = {
  createComment,
  commentParamSearch,
  removeComment,
};

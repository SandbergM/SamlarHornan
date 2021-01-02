const { commentSearch, removeComment } = require("../Queries/CommentQueries");
const { missingField } = require("../Helpers/ErrorHandler");
const { timestampCurrentTime } = require("../Helpers/TimeStamp");
const { existsBy, saveToDb } = require("../Queries/SharedQueries");
const Comment = require("../models/Comment");

/*
# CREATE
*/
const createComment = (req, res) => {
  const { message, highlighted, threadId } = req.body;

  let requestIncomplete = missingField({ message, highlighted, threadId });
  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  let thread = existsBy("threads", { id: threadId });
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

/*
# READ
*/
const commentParamSearch = (req, res) => {
  let comments = commentSearch(req.query);
  let found = comments.length;
  res.status(found ? 200 : 404).send(found ? comments : `Not found`);
};

/*
# UPDATE
*/

/*
# DELETE
*/
const deleteComment = (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  let comment = existsBy("comments", { id: id });

  if (!hasPermission(user, comment)) {
    return res.status(401).send(`Unauthorized`);
  }

  if (!comment) {
    return res.status(404).send(`Not found`);
  }

  let deleted = removeComment(id);

  res.status(deleted ? 200 : 400).send(deleted);
};

const hasPermission = (user, comment) => {
  let thread = existsBy("threads", { id: comment.threadId });
  let forum = existsBy("forums", { id: thread.forumId });
  let isAdmin = user.roles.includes("ADMIN");
  let isSubModerator = user.permissions[forum.url];
  return isAdmin || isSubModerator;
};

module.exports = {
  createComment,
  commentParamSearch,
  deleteComment,
};

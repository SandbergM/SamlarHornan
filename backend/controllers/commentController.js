const { commentSearch, removeComment } = require("../Queries/CommentQueries");
const { requiredFields, requiredDataTypes } = require("../Helpers/Validation");
const { timestampCurrentTime } = require("../Helpers/TimeStamp");
const { findBy, saveToDb } = require("../Queries/SharedQueries");
const Comment = require("../models/Comment");

/*
# CREATE
*/
const createComment = (req, res) => {
  const { message, highlighted, threadId } = req.body;

  let requestIncomplete = requiredFields({ message, highlighted, threadId });
  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  let badRequest = validateDataInput(req.body);

  if (badRequest) {
    return res.status(400).send(badRequest);
  }

  let thread = findBy("threads", { id: threadId });
  if (!thread || thread.isLocked) {
    return res.status(400).send(`Could not post to thread`);
  }

  if (!hasPermission(req.session.user, thread.id)) {
    req.body.highlighted = false;
  }

  let comment = new Comment({
    ...req.body,
    userId: req.session.user.id,
    published: timestampCurrentTime(),
  });

  let savedComment = saveToDb("comments", comment);
  if (!savedComment) {
    return res.status(500).send(`Could not complete request`);
  }

  res
    .status(201)
    .send(findBy("comments", { id: savedComment.lastInsertRowid }));
};

/*
# READ
*/
const commentParamSearch = (req, res) => {
  let comments = commentSearch(req.query);
  let found = comments.length;

  if (!found) {
    return res.status(404).send(`Not found`);
  }

  res.status(200).send(comments);
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

  if (!hasPermission(user, req.body.threadId)) {
    res.statusMessage(`Unauthorized`);
    res.status(401);
    return;
  }

  let comment = findBy("comments", { id: id });

  if (!comment) {
    res.statusMessage(`A comment with ${id} was not found`);
    res.status(404);
    return;
  }

  let deleted = removeComment(id);
  res.status(deleted ? 200 : 400).send(deleted);
};

const hasPermission = (user, threadId) => {
  let thread = findBy("threads", { id: threadId });
  let forum = findBy("forums", { id: thread.forumId });
  let isAdmin = user.roles.includes("ADMIN");
  let isSubModerator = user.permissions[forum.url];
  return isAdmin || isSubModerator;
};

const validateDataInput = (params) => {
  const { id, message, userId, highlighted, published, threadId } = params;
  return requiredDataTypes({
    string: { message },
    number: { id, threadId, userId, published },
    boolean: { highlighted },
  });
};

module.exports = {
  createComment,
  commentParamSearch,
  deleteComment,
};

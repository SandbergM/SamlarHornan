const { threadSearch, removeThread } = require("../Queries/ThreadQueries");
const { findBy, saveToDb, updateDb } = require("../Queries/SharedQueries");
const { requiredFields, requiredDataTypes } = require("../Helpers/Validation");
const { timestampCurrentTime } = require("../Helpers/TimeStamp");
const Thread = require("../models/Thread");

/*
# CREATE
*/
const createThread = (req, res) => {
  const { title, forumUrl, message } = req.body;

  // A thread is required to have a title, forumUrl and a message
  // This is small helper-method that checks if any of the values are missing
  let requestIncomplete = requiredFields({ title, forumUrl, message });
  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  // To prevent the database/server from crashing, i have a small
  // helper-method that checks that the provided data has the correct type
  let badInput = validateDataInput(req.body);
  if (badInput) {
    return res.status(400).send(badInput);
  }

  // Checks if the forumUrl provided is in the db, and then fetches the
  // forum id to be used as a FK to the threads forumId
  req.body.forumId = findBy("forums", { url: forumUrl }).id || -1;
  if (!findBy("forums", { id: req.body.forumId })) {
    return res.status(400).send(`A forum with that id was not found`);
  }

  req.body.published = timestampCurrentTime();
  let thread = new Thread({
    ...req.body,
    forumId: req.body.forumId,
    isLocked: false,
  });

  let savedThread = saveToDb("threads", thread);
  if (!savedThread) {
    return res.status(400).send(`Could not complete request`);
  }

  res.status(201).send(savedThread);
};

/*
# READ
*/
const threadParamSearch = (req, res) => {
  let { forumUrl } = req.query;
  let requestIncomplete = requiredFields({ forumUrl });

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  req.query.forumId = findBy("forums", { url: forumUrl }).id || -1;

  let threads = threadSearch(req.query);
  let found = threads.length;
  res.status(found ? 200 : 400).send(found ? threads : `Not found`);
};

/*
# UPDATE
*/
const updateThread = (req, res) => {
  let thread = findBy("threads", { id: req.params.id });

  // Checks if the user is an admin or sub-forum-moderator
  if (!hasPermission(req.session.user, thread)) {
    return res.status(401).send(`Unauthorized`);
  }

  // Check for bad datatypes
  let badRequest = validateDataInput(req.body);
  if (badRequest) {
    return res.status(400).send(badRequest);
  }

  if (!thread) {
    return res.status(404).send(`Not found`);
  }

  let update = updateDb(
    "threads",
    thread.id,
    new Thread({ ...req.body, forumId: undefined })
  );

  if (!update) {
    return res.status(400).send(`Couldn't finalize update`);
  }

  res.status(200).send({ threadUpdated: true });
};

/*
# DELETE
*/
const deleteThread = (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  let thread = findBy("threads", { id: id });

  // Checks if the user is an admin or sub-forum-moderator
  if (!hasPermission(user, thread)) {
    return res.status(401).send(`Unauthorized`);
  }

  if (!thread) {
    return res.status(404).send(`Not found`);
  }

  let deleted = removeThread(id);

  res.status(deleted ? 200 : 400).send(deleted);
};

// Check for bad input - validate that the datatypes provided are of the type that is expected
const validateDataInput = (params) => {
  const { id, title, forumId, isLocked, published } = params;
  return requiredDataTypes({
    string: { title, forumId },
    number: { id, published },
    boolean: { isLocked },
  });
};

// Checks if the current user is admin or moderator in the forum
const hasPermission = (user, thread) => {
  let forum = findBy("forums", { id: thread.forumId });
  let isAdmin = user.roles.includes("ADMIN");
  let isSubModerator = forum && user.permissions[forum.url];
  return isAdmin || isSubModerator;
};

module.exports = {
  createThread,
  threadParamSearch,
  updateThread,
  deleteThread,
};

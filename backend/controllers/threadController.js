const { threadSearch, removeThread } = require("../Queries/ThreadQueries");
const { findBy, saveToDb, updateDb } = require("../Queries/SharedQueries");
const { requiredFields, requiredDataTypes } = require("../Helpers/Validation");
const { timestampCurrentTime } = require("../Helpers/TimeStamp");
const Thread = require("../models/Thread");

/*
# CREATE
*/
const createThread = (req, res) => {
  const { title, forumUrl } = req.body;
  let requestIncomplete = requiredFields({ title, forumUrl });

  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  req.body.published = timestampCurrentTime();
  let thread = new Thread({ ...req.body });

  let badInput = validateDataInput(thread);
  if (badInput) {
    return res.status(400).send(badInput);
  }

  req.body.forumId = findBy("forums", { url: forumUrl }).id || -1;
  if (!findBy("forums", { id: req.body.forumId })) {
    return res.status(400).send(`A forum with that id was not found`);
  }

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

  if (!hasPermission(req.session.user, thread)) {
    return res.status(401).send(`Unauthorized`);
  }

  let badRequest = validateDataInput({ ...req.body });
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

  if (!hasPermission(user, thread)) {
    return res.status(401).send(`Unauthorized`);
  }

  if (!thread) {
    return res.status(404).send(`Not found`);
  }

  let deleted = removeThread(id);

  res.status(deleted ? 200 : 400).send(deleted);
};

// Used to compare the data from the user is the correct type
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

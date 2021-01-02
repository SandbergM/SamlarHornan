const { threadSearch } = require("../Queries/ThreadQueries");
const { existsBy, saveToDb, updateDb } = require("../Queries/SharedQueries");
const { missingField } = require("../Helpers/Validation");
const { timestampCurrentTime } = require("../Helpers/TimeStamp");
const Thread = require("../models/Thread");

/*
# CREATE
*/
const createThread = (req, res) => {
  const { title, forumId } = req.body;
  let requestIncomplete = missingField({ title, forumId });
  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  if (!existsBy("forums", { id: forumId })) {
    return res.status(400).send(`A forum with that id was not found`);
  }

  req.body.published = timestampCurrentTime();
  req.body.isLocked = 0;
  let thread = new Thread({ ...req.body });

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
  let threads = threadSearch(req.query);
  let found = threads.length;
  res.status(found ? 200 : 400).send(found ? threads : `Not found`);
};

/*
# UPDATE
*/
const updateThread = (req, res) => {
  const { id } = req.params;
  let { user } = req.session;

  let thread = existsBy("threads", { id: id });
  let forum = existsBy("forums", { id: thread.forumId });

  let isAdmin = user.roles.includes("ADMIN");
  let hasPermission = user.permissions[forum.url];

  if (!isAdmin && !hasPermission) {
    return res.status(401).send(`Unauthorized`);
  }

  if (!thread) {
    return res.status(404).send(`Not found`);
  }

  let update = updateDb("threads", id, {
    ...new Thread({ ...req.body, forumId: undefined }),
  });

  if (!update) {
    return res.status(400).send(`Couldn't finalize update`);
  }

  res.status(200).send({ threadUpdated: true });
};

/*
# DELETE
*/

module.exports = {
  createThread,
  threadParamSearch,
  updateThread,
};

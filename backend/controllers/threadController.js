const { threadSearch } = require("../Queries/ThreadQueries");
const { findBy, saveToDb, updateDb } = require("../Queries/SharedQueries");
const { requiredFields } = require("../Helpers/Validation");
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
  req.body.forumId = findBy("forums", { url: forumUrl }).id || -1;
  if (!findBy("forums", { id: req.body.forumId })) {
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
  const { id } = req.params;
  let { user } = req.session;

  let thread = findBy("threads", { id: id });
  let forum = findBy("forums", { id: thread.forumId });

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

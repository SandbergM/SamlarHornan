const { threadSearch } = require("../Queries/ThreadQueries");
const { existsBy, saveToDb } = require("../Queries/SharedQueries");
const { missingField } = require("../Helpers/ErrorHandler");
const { timestampCurrentTime } = require("../Helpers/TimeStamp");
const Thread = require("../models/Thread");

const createThread = (req, res) => {
  const { title, forumId } = req.body;
  let requestIncomplete = missingField({ title, forumId });
  if (requestIncomplete) {
    return res.status(400).send(`Missing : ${requestIncomplete}`);
  }

  if (!existsBy("forums", { id: forumId })) {
    return res.status(400).send(`A forum with that id was not found`);
  }

  let thread = saveToDb(
    "threads",
    new Thread({ ...req.body, isLocked: 0, published: timestampCurrentTime() })
  );
  res.status(201).send(thread);
};

const threadParamSearch = (req, res) => {
  let threads = threadSearch(req.query);
  let found = threads.length;
  res.status(found ? 200 : 400).send(found ? threads : `Not found`);
};

const updateThread = () => {};

module.exports = {
  createThread,
  threadParamSearch,
  updateThread,
};

const ACLJson = require("./acl.json");

module.exports = (req, res, next) => {
  let userRoles = ["*"];

  if (req.session.user) {
    userRoles = [...userRoles, ...(req.session.user.roles || [])];
  } else {
    userRoles.push("ANONYMOUS");
  }

  let requestedPath = trimUrl(req.path);

  let permissions = Object.entries(ACLJson).filter(([key, val]) => {
    /*
    let subUrl = getSubforumUrl(key, requestedPath);
    let threadId = getThreadId(key, requestedPath);
    key = key.replace("{subforum-url}", subUrl);
    key = key.replace("{threadId}", threadId);
    */
    if (requestedPath.startsWith(key)) {
      for (let role of val[req.method].split(", ")) {
        if (userRoles.includes(role)) {
          return role;
        }
      }
    }
  });

  if (Object.keys(permissions).length) {
    next();
  } else {
    res.status(403).send(`Forbidden`);
  }
};

const trimUrl = (path) => {
  return path.endsWith("/")
    ? path.slice(path.length - 1).toLowerCase()
    : path.toLowerCase();
};

const getSubforumUrl = (url, requestedPath) => {
  url = url.split("{")[0];
  requestedPath = requestedPath.replace(url, "");
  return requestedPath.split("/")[0];
};

const getThreadId = (url, requestedPath) => {
  url = url.split("{")[0];
  requestedPath = requestedPath.replace(url, "");
  return requestedPath.split("/")[0];
};

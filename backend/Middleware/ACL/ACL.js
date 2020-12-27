const ACLJson = require("./acl.json");

module.exports = (req, res, next) => {
  let userRoles = ["*"];

  if (req.session.user) {
    userRoles = [...userRoles, ...Object.keys(req.session.user.roles || {})];
  } else {
    userRoles.push("ANONYMOUS");
  }

  let requestedPath = trimUrl(req.path);

  let permissions = Object.entries(ACLJson).filter(([key, val]) => {
    if (requestedPath.startsWith(key.split("*"[0]))) {
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

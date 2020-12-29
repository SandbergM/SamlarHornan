const { userAuthentication } = require("../queries/UserQueries");
const { missingField } = require("../Helpers/ErrorHandler");

const signIn = (req, res) => {
  const { email, password } = req.body;

  let requestIncomplete = missingField({ email, password });
  if (requestIncomplete) {
    return res.status(403).send(`Missing : ${requestIncomplete}`);
  }

  let user = userAuthentication(req.body);

  if (user) {
    req.session.user = user;
    return res.status(200).send({ authenticated: true });
  }

  res.status(401).send(`Unauthorized, wrong password or email`);
};

const logout = (req, res) => {
  req.session.user = null;
  res.json({ loggedOut: true });
};

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

module.exports = {
  signIn,
  logout,
  whoami,
};

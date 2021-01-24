const { userAuthentication } = require("../queries/AuthQueries");
const { requiredFields, requiredDataTypes } = require("../Helpers/Validation");

const signIn = (req, res) => {
  const { email, password } = req.body;

  let requestIncomplete = requiredFields({ email, password });
  if (requestIncomplete) {
    return res.status(403).send(`Missing : ${requestIncomplete}`);
  }

  let badRequest = requiredDataTypes({
    string: { email, password },
  });

  if (badRequest) {
    return res.status(400).send(badRequest);
  }

  let user = userAuthentication(req.body);

  if (user) {
    req.session.user = user;
    return res.status(201).send({ authenticated: true });
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

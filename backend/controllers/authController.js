const { userAuthentication } = require("../queries/UserQueries");

const signIn = (req, res) => {
  let user = userAuthentication(req.body);
  req.session.user = user;
  if (user) {
    return res.status(200).send({ authenticated: true });
  }
  res.status(401).send(`Not found`);
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

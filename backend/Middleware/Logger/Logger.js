module.exports = logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl} - ${req.method}`
  );
  next();
};

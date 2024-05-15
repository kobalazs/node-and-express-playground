module.exports = (err, _req, res, _next) => {
  res.status(err.status || 500);
  // Errors do not publish message by default
  res.send({ message: err.message, ...err });
};

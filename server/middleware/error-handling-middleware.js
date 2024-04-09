function errorHandler(err, req, res, next) {
  err.status ||= 500;
  err.message ||= "Internal Server Error";
  if (!err.code) {
    err.code = err.name || null;
  }

  if (err.status >= 500) {
    console.error(err);
  }

  res.status(err.status).json({ error: err });
}

module.exports = {
  errorHandler,
};

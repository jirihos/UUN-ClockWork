const jwt = require("jsonwebtoken");
const terminalDao = require("../dao/terminal-mongo");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = null;
    next();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      err.status = 401;
      next(err);
    } else {
      req.user = decoded;
      next();
    }
  });
}

async function authenticateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    req.terminal = null;
    next();
    return;
  }

  const terminal = await terminalDao.findByApiKey(apiKey);

  req.terminal = terminal;
  next();
}

module.exports = {
  authenticateToken,
  authenticateApiKey,
};

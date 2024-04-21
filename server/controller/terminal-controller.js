const router = require("express").Router();
const {
  authenticateToken,
} = require("../middleware/authentication-middleware");

const TerminalAbl = require("../abl/terminal-abl");

router.post("/create", authenticateToken, async (req, res, next) => {
  try {
    await TerminalAbl.create(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

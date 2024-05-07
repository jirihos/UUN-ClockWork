const router = require("express").Router();
const {
  authenticateApiKey,
} = require("../middleware/authentication-middleware");

const EventAbl = require("../abl/event-abl");

router.post("/create", authenticateApiKey, async (req, res, next) => {
  try {
    await EventAbl.create(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

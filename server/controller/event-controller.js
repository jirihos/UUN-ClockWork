const router = require("express").Router();

const EventAbl = require("../abl/event-abl");

router.post("/create", async (req, res, next) => {
    try {
      await EventAbl.create(req, res);
    } catch (e) {
      next(e);
    }
  });

  module.exports = router;
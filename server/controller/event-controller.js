const router = require("express").Router();
const {
  authenticateApiKey,
  authenticateToken,
} = require("../middleware/authentication-middleware");

const EventAbl = require("../abl/event-abl");

router.post("/create", authenticateApiKey, async (req, res, next) => {
  try {
    await EventAbl.create(req, res);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/listShiftsByEmployeeCode",
  authenticateToken,
  async (req, res, next) => {
    try {
      await EventAbl.listShiftsByEmployeeCode(req, res);
    } catch (e) {
      next(e);
    }
  },
);

module.exports = router;

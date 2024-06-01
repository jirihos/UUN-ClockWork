const router = require("express").Router();
const {
  authenticateApiKey,
  authenticateToken,
} = require("../middleware/authentication-middleware");

const EventAbl = require("../abl/event-abl");

router.post(
  "/create",
  authenticateApiKey,
  authenticateToken,
  async (req, res, next) => {
    try {
      await EventAbl.create(req, res);
    } catch (e) {
      next(e);
    }
  },
);

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

router.post("/delete", authenticateToken, async (req, res, next) => {
  try {
    await EventAbl.delete(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/exportAllShifts", authenticateToken, async (req, res, next) => {
  try {
    await EventAbl.exportAllShifts(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

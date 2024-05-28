const router = require("express").Router();
const {
  authenticateToken,
} = require("../middleware/authentication-middleware");

const UserAbl = require("../abl/user-abl");

router.post("/login", async (req, res, next) => {
  try {
    await UserAbl.login(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/create", authenticateToken, async (req, res, next) => {
  try {
    await UserAbl.create(req, res);
  } catch (e) {
    next(e);
  }
});

router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    await UserAbl.me(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/deleteByUsername", authenticateToken, async (req, res, next) => {
  try {
    await UserAbl.delete(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

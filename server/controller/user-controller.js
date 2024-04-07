const router = require("express").Router();

const UserAbl = require("../abl/user-abl");
const {
  authenticateToken,
} = require("../middleware/authentication-middleware");

router.post("/login", async (req, res, next) => {
  try {
    await UserAbl.login(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/createUser", authenticateToken, async (req, res, next) => {
  try {
    await UserAbl.createUser(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

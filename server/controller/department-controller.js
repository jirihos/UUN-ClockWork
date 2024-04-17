const router = require("express").Router();
const {
  authenticateToken,
} = require("../middleware/authentication-middleware");

const DepartmentAbl = require("../abl/department-abl");

router.get("/list", authenticateToken, async (req, res, next) => {
  try {
    await DepartmentAbl.list(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await DepartmentAbl.create(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    await DepartmentAbl.delete(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

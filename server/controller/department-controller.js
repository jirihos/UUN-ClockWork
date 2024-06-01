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

router.post("/create", authenticateToken, async (req, res, next) => {
  try {
    await DepartmentAbl.create(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/delete", authenticateToken, async (req, res, next) => {
  try {
    await DepartmentAbl.delete(req, res);
  } catch (e) {
    next(e);
  }
});

router.get("/findById", authenticateToken, async (req, res, next) => {
  try {
    await DepartmentAbl.findById(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

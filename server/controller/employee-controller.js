const router = require("express").Router();
const {
  authenticateToken,
} = require("../middleware/authentication-middleware");

const EmployeeAbl = require("../abl/employee-abl");

router.get("/findByCode", authenticateToken, async (req, res, next) => {
  try {
    await EmployeeAbl.findByCode(req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/create", authenticateToken, async (req, res, next) => {
  try {
    await EmployeeAbl.create(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

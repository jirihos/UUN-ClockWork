const departmentDao = require("../dao/department-mongo");
const schemas = require("../schema/index");
const { validate } = require("../validation");
const errors = require("../errors");

class DepartmentAbl {
  async list(req, res) {
    let { pageIndex, pageSize } = req.query;
    pageIndex = parseInt(pageIndex || 0);
    pageSize = parseInt(pageSize || 20);

    // validation
    if (Number.isNaN(pageIndex) || Number.isNaN(pageSize)) {
      throw new errors.QueryParametersValidationError();
    }

    // authorization
    if (req.user == null) {
      throw new errors.NotAuthorized();
    }

    let output = await departmentDao.list(pageIndex, pageSize);

    res.json(output);
  }
}

module.exports = new DepartmentAbl();

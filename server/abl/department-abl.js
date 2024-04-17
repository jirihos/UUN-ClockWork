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

  async create(req, res) {
    // validation
    await validate(schemas.departmentCreateSchema, req.body);

    // authorize admin
    if (req.user?.role !== "admin") {
      throw new errors.NotAuthorized();
    }

    let result = await departmentDao.findById(req.body);

    if (!result) {
      let newDepartment = await departmentDao.create(req.body);
      res.json(newDepartment);
    } else {
      throw new errors.UserAlreadyExists();
    }
  }

  async delete(req, res) {
    // validation
    await validate(schemas.departmentCreateSchema, req.body);

    // authorize admin
    if (req.user?.role !== "admin") {
      throw new errors.NotAuthorized();
    }

    let result = await departmentDao.findById(req.body);

    if (result) {
      // If department exists, delete it
      await departmentDao.delete(req.body);
      res.json({ message: "Department deleted successfully" });
    } else {
      throw new errors.UserDoesNotExist();
    }
  }
}

module.exports = new DepartmentAbl();

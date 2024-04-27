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

    // authorization
    if (req.user == null) {
      throw new errors.NotAuthorized();
    }

    let result = await departmentDao.getByName(req.body.name);

    if (!result) {
      let department = {
        name: req.body.name,
      };
      let newDepartment = await departmentDao.create(department);
      res.json(newDepartment);
    } else {
      throw new errors.DepartmentAlreadyExists();
    }
  }

  async delete(req, res) {
    // validation
    await validate(schemas.departmentDeleteSchema, req.body);

    // authorization
    if (!req.user) {
      throw new errors.NotAuthorized();
    }
    // Find department by ID
    const { ObjectId } = require("mongodb");

    // Convert the _id string to ObjectId
    const _id = new ObjectId(req.body._id);
    const result = await departmentDao.getById(_id);
    if (result) {
      // If department exists, delete it
      await departmentDao.delete(_id);
      res.json(req.body);
    } else {
      throw new errors.DepartmentDoesNotExist();
    }
  }
}

module.exports = new DepartmentAbl();

const employeeDao = require("../dao/employee-mongo");
const departmentDao = require("../dao/department-mongo");
const schemas = require("../schema/index");
const { validate } = require("../validation");
const errors = require("../errors");

class EmployeeAbl {
  async create(req, res) {
    // validation
    await validate(schemas.employeeCreateSchema, req.body);

    // authorization
    if (req.user == null) {
      throw new errors.NotAuthorized();
    }

    const { departmentId, firstName, lastName } = req.body;

    // test whether departmentId exists
    let deptResult = await departmentDao.getById(departmentId);
    if (deptResult == null) {
      throw new errors.DepartmentDoesNotExist();
    }

    // make a list of unused codes
    const existingCodes = await employeeDao.getAllExistingCodes();
    const unusedCodes = [];
    for (let i = 0; i < 10000; i++) {
      if (!existingCodes.includes(i)) {
        unusedCodes.push(i);
      }
    }

    if (unusedCodes.length === 0) {
      throw new errors.MaximumNumberOfEmployeesReached();
    }

    // get a random unused code
    const randomIndex = Math.floor(Math.random() * unusedCodes.length);
    const code = unusedCodes[randomIndex];

    // store a new employee
    const newEmployee = await employeeDao.create({
      departmentId,
      code,
      firstName,
      lastName,
    });

    res.json(newEmployee);
  }

  async findByCode(req, res) {
    if (req.user == null) {
      throw new errors.NotAuthorized();
    }

    //validace inputu
    await validate(schemas.employeeFindByCodeSchema, req.body);

    let result = await employeeDao.findByCode(req.body.code);

    if (result) {
      res.json(result);
    } else {
      throw new errors.EmployeeCodeNotFound();
    }
  }

  async list(req, res) {
    // authorize terminal
    if (!req.terminal) {
      throw new errors.NotAuthorized();
    }

    let result = await employeeDao.list();

    let itemList = { items: result };

    res.json(itemList);
  }
}

module.exports = new EmployeeAbl();

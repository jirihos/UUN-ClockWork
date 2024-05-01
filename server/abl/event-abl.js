const eventDao = require("../dao/event-mongo");
const employeeDao = require("../dao/employee-mongo");
const schemas = require("../schema/index");
const { validate } = require("../validation");
const errors = require("../errors");

class eventAbl {
  async create(req, res) {
    //validace inputu
    await validate(schemas.eventCreateSchema, req.body);

    // TODO authorize terminal

    let result = await employeeDao.findByCode(req.body.employeeCode);

    if (result) {
      let newEvent = await eventDao.create(req.body);
      res.json(newEvent);
    } else {
      throw new errors.EmployeeCodeNotFound();
    }
  }
}

module.exports = new eventAbl();

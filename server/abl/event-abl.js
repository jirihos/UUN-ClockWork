const eventDao = require("../dao/event-mongo");
const employeeDao = require("../dao/employee-mongo");
const schemas = require("../schema/index");
const { validate } = require("../validation");
const errors = require("../errors");

class eventAbl {
  async create(req, res) {
    //validace inputu
    await validate(schemas.eventCreateSchema, req.body);

    // authorize terminal
    if (!req.terminal && !req.user) {
      throw new errors.NotAuthorized();
    }

    let terminalId;

    if (!req.terminal) {
      terminalId = null;
    } else {
      terminalId = req.terminal._id.toString();
    }

    let { employeeCode, type, timestamp } = req.body;

    employeeCode = Number(employeeCode) 

    let result = await employeeDao.findByCode(employeeCode);

    if (result) {
      let newEvent = await eventDao.create({
        terminalId,
        employeeCode,
        type,
        timestamp: new Date(timestamp),
      });
      res.json(newEvent);
    } else {
      throw new errors.EmployeeCodeNotFound();
    }
  }

  async listShiftsByEmployeeCode(req, res) {
    let { employeeCode, pageIndex, pageSize } = req.query;
    employeeCode = parseInt(employeeCode);
    pageIndex = parseInt(pageIndex || 0);
    pageSize = parseInt(pageSize || 20);

    // validation
    if (
      Number.isNaN(employeeCode) ||
      Number.isNaN(pageIndex) ||
      Number.isNaN(pageSize)
    ) {
      throw new errors.QueryParametersValidationError();
    }

    // authorization
    if (!req.user) {
      throw new errors.NotAuthorized();
    }

    const shifts = await eventDao.listShiftsByEmployeeCode(
      employeeCode,
      pageIndex,
      pageSize,
    );

    res.json(shifts);
  }

  async delete(req, res) {
    //validace inputu
    await validate(schemas.eventDeleteSchema, req.body);

    // authorize user
    if (!req.user) {
      throw new errors.NotAuthorized();
    }

    let result = await eventDao.delete(req.body._id);

    res.json("Successfully deleted " + result.deletedCount + " entry/ies.");
  }
}

module.exports = new eventAbl();

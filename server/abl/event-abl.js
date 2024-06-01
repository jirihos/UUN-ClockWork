const eventDao = require("../dao/event-mongo");
const employeeDao = require("../dao/employee-mongo");
const schemas = require("../schema/index");
const papa = require("papaparse");
const { validate } = require("../validation");
const errors = require("../errors");
const { string } = require("joi");

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

    employeeCode = Number(employeeCode);

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

  async exportAllShifts(req, res) {
    //validace inputu
    await validate(schemas.eventExportschema, req.body);

    // authorization
    if (!req.user) {
      throw new errors.NotAuthorized();
    }

    // authorize roles
    if (req.user?.role !== "admin" && req.user?.role !== "manager") {
      throw new errors.NotAuthorized();
    }

    const shifts = await eventDao.listShifts(
      req.body.timestampFrom, // todo
      req.body.timestampTo,
    );

    // Convert JSON to CSV
    const csv = papa.unparse(shifts);
    // Set response headers to indicate a CSV file
    res.header("Content-Type", "text/csv");
    res.send(csv);

    //res.json(shifts);
  }
}

module.exports = new eventAbl();

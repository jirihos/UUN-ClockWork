const userSchema = require("./user-schema");
const eventSchema = require("./event-schema");
const employeeSchema = require("./employee-schema");
const departmentSchema = require("./department-schema");
const terminalSchema = require("./terminal-schema");

module.exports = {
  ...userSchema,
  ...eventSchema,
  ...employeeSchema,
  ...departmentSchema,
  ...terminalSchema,
};

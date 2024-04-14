const userSchema = require("./user-schema");
const eventSchema = require("./event-schema");
const employeeSchema = require("./employee-schema");

module.exports = {
  ...userSchema,
  ...eventSchema,
  ...employeeSchema,
};

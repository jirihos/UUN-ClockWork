const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.employeeCreateSchema = Joi.object({
  departmentId: Joi.objectId().required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
});

exports.employeeFindByCodeSchema = Joi.object({
  code: Joi.number().min(0).max(9999).required(),
});

const Joi = require("joi");

exports.eventCreateSchema = Joi.object({
  terminalId: Joi.string().alphanum().min(16).max(16).required(),
  employeeCode: Joi.number().min(1).max(9999).required(),
  type: Joi.string().valid("arrival", "leave").min(16).max(16).required(),
});
const Joi = require("joi");

exports.employeeCreateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(1).max(72).required(),
  employeeCode: Joi.number().min(1).max(9999).required(),
});

exports.employeeFindByCodeSchema = Joi.object({
    employeeCode: Joi.number().min(1).max(9999).required(),
  });
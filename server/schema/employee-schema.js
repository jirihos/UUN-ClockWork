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

exports.employeeSearchSchema = Joi.object({
  firstName: Joi.string().min(0).max(50).allow(null, ""),
  lastName: Joi.string().min(0).max(50).allow(null, ""),
  departmentId: Joi.objectId().allow(null, ""),
  pageInfo: {
    pageIndex: Joi.number().min(0).max(999),
    pageSize: Joi.number().min(0).max(50),
  },
});

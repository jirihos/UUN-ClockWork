const Joi = require("joi");

exports.eventCreateSchema = Joi.object({
  employeeCode: Joi.number().min(1).max(9999).required(),
  type: Joi.string().valid("arrival", "leave").min(16).max(16).required(),
  timestamp: Joi.date().iso().required(),
});
exports.eventDeleteSchema = Joi.object({
  _id: Joi.objectId().required(),
});
exports.eventExportschema = Joi.object({
  timestampFrom: Joi.date().iso().required(),
  timestampTo: Joi.date().iso().required(),
});

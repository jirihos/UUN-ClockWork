const Joi = require("joi").extend(require("@hapi/joi-date"));

exports.eventCreateSchema = Joi.object({
  employeeCode: Joi.number().min(1).max(9999).required(),
  type: Joi.string().valid("arrival", "leave").min(16).max(16).required(),
  timestamp: Joi.date().iso().required(),
});
exports.eventDeleteSchema = Joi.object({
  _id: Joi.objectId().required(),
});
exports.eventExportschema = Joi.object({
  timestampFrom: Joi.date().format("iso").required(),
  timestampTo: Joi.date().format("iso").required(),
});

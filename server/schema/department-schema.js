const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.departmentCreateSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});
exports.departmentDeleteSchema = Joi.object({
  _id: Joi.objectId().required(),
});
exports.departmentFindByIdSchema = Joi.object({
  _id: Joi.objectId().required(),
});

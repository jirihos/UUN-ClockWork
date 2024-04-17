const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Example validation of Mongo object ID
// Joi.object({
//   id: Joi.objectId(),
// });

exports.departmentsCreateSchema = Joi.object({
  id: Joi.ObjectId(),
  name: Joi.string().alphanum().min(2).max(50).required(),
});

exports.departmentFindByNameSchema = Joi.object({
  departmentName: Joi.string().alphanum().min(2).max(50).required(),
});

exports.departmentFindByIdSchema = Joi.object({
  id: JoiObjectId(),
});

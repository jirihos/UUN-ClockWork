const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Example validation of Mongo object ID
// Joi.object({
//   id: Joi.objectId(),
// });

exports.departmentCreateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(1).max(72).required(),
  id: Joi.objectId(),
  name: Joi.string().alphanum().min(2).max(50).required(),
});

exports.departmentFindByNameSchema = Joi.object({
  departmentName: Joi.string().alphanum().min(2).max(50).required(),
});

exports.departmentFindByIdSchema = Joi.object({
  id: Joi.objectId(),
});

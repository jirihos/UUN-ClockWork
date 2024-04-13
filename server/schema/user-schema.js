const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Example validation of Mongo object ID
// Joi.object({
//   id: Joi.objectId(),
// });

exports.userLoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(1).max(72).required(),
});

exports.userCreateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(1).max(72).required(),
  role: Joi.string().valid("manager", "admin").required(),
});

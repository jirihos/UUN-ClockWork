const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.userLoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(1).max(72).required(),
});

exports.userCreateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(1).max(72).required(),
  role: Joi.string().valid("manager", "admin").required(),
});

exports.userDeleteByUsernameSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
});

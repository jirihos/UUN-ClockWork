const Joi = require("joi");

exports.terminalCreate = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(),
});

const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const userEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

const schemas = {
  register: registerSchema,
  login: loginSchema,
  userEmailSchema
};

module.exports = { schemas };
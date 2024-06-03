const Joi = require("joi");
const schemas = {
  userRegister: Joi.object().keys({
    user_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  }),
  userLogin: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  }),
  tasks: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      priority: Joi.string().valid("Low", "Medium", "High").required(),
      status: Joi.string()
        .valid("NOT_STARTED", "STARTED", "PENDING", "IN_PROGRESS", "COMPLETED")
        .required(),
        user_id: Joi.number(),

    })
  ),
  updateTasks: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    priority: Joi.string().valid("Low", "Medium", "High"),
    status: Joi.string().valid(
      "NOT_STARTED",
      "STARTED",
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED"
    ),
    user_id: Joi.number(),
  }),
};
module.exports = schemas;

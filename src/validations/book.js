const Joi = require("joi");
const { INVALID_ID } = require("../constants/message");

module.exports.validateData = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": `Title should be a type text`,
        "string.empty": `Title cannot be an empty field`,
        "any.required": `Title is a required field`,
      }),

    content: Joi.optional(),

    author: Joi.string().trim().required()
    .messages({
        "string.base": `Author should be a type text`,
        "string.empty": `Author cannot be an empty field`,
        "any.required": `Author is a required field`,
      }),
  });
  return schema.validate(data);
};

module.exports.validateId = (id) => {
  const schema = Joi.object({
    id: Joi.number().messages({"number.base": INVALID_ID.message}),
  });
  return schema.validate(id);
};

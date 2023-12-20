const Joi = require("joi");
const HttpError = require("./httpError");

exports.contactValidation = (data) => {
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  return Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
     password:''
    })
    .validate(data);
};
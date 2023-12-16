const Joi = require("joi");
const HttpError = require("./httpError");

exports.contactValidation = (data) => {
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string()
        .required()
        .messages({ "any.required": "missing required name field" }),
      email: Joi.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
      phone: Joi.string()
        .pattern(phonePattern, "Phone number format: (XXX) XXX-XXXX")
        .required()
        .messages({ "any.required": "missing required phone field" }),
      favorite: Joi.boolean(),
    })
    .validate(data);
};

exports.contactStatusValidation = (data) => {
  return Joi.object()
    .keys({
      favorite: Joi.boolean()
        .required()
        .messages({ "any.required": "missing required favorite field" }),
    })
    .validate(data);
};

exports.isBodyEmpty = (body) => {
  const isEmpty = Object.keys(body).length === 0;

  if (isEmpty) throw new HttpError(400, "missing fields");
};

exports.isStatusBodyEmpty = (body) => {
  const isEmpty = Object.keys(body).length === 0;

  if (isEmpty) throw new HttpError(400, "missing field favorite");
};

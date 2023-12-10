const Joi = require("joi");
const HttpError = require("./httpError");

exports.addNewContactValidation = (data) => {
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(phonePattern, "Phone number format: (XXX) XXX-XXXX")
        .required(),
    })
    .validate(data);
};

exports.updateContactValidation = (data) => {
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(phonePattern, "Phone number format: (XXX) XXX-XXXX")
        .required(),
    })
    .validate(data);
};

exports.isBodyEmpty = (body) => {
  const isEmpty = Object.keys(body).length === 0;

  if (isEmpty) throw new HttpError(400, "missing fields");
};

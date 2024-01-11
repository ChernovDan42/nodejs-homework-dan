const Joi = require("joi");

const { regex, userSubscriptionEnum } = require("../constants");

exports.userDataValidation = (data) => {
  return Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
      password: Joi.string()
        .pattern(
          regex.PASSWD_REGEX,
          "Your password must meet the following criteria: At least one lowercase letter (a-z); At least one uppercase letter (A-Z);At least one digit (0-9);At least one special character (!@#_$%^&);Minimum length of 8 characters"
        )
        .required()
        .messages({
          "any.required": "missing required password field",
        }),
      subscription: Joi.string().valid(...Object.values(userSubscriptionEnum)),
    })
    .validate(data);
};

exports.validateEmail = (data) => {
  return Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
    })
    .validate(data);
};

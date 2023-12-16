const { contactsServices } = require("../services");

const { catchAsync, contactsValidation, HttpError } = require("../utils");

exports.checkContactId = catchAsync(async (req, res, next) => {
  await contactsServices.checkContactExistsById(req.params.contactId);

  next();
});

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { value, error } = contactsValidation.contactValidation(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  await contactsServices.checkContactExists(
    { email: value.email },
    { phone: value.phone }
  );

  req.body = value;

  next();
});

exports.checkUpdateContactData = catchAsync(async (req, res, next) => {
  contactsValidation.isBodyEmpty(req.body);

  const { value, error } = contactsValidation.contactValidation(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  req.body = value;

  next();
});

exports.checkUpdateStatusData = catchAsync(async (req, res, next) => {
  contactsValidation.isStatusBodyEmpty(req.body);

  const { value, error } = contactsValidation.contactStatusValidation(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  req.body = value;

  next();
});

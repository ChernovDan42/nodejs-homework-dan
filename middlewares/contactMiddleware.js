const { getContactById } = require("../models/contacts");

const { catchAsync, HttpError } = require("../utils");

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) throw new HttpError(404, "Not found");

  req.contact = contact;
  next();
});

const { catchAsync } = require("../utils");

const { contactsServices } = require("../services");

exports.getContacts = catchAsync(async (req, res) => {
  const allContacts = await contactsServices.getAllContacts();

  res.status(200).json(allContacts);
});

exports.getContact = catchAsync(async (req, res) => {
  const contact = await contactsServices.getContactById(req.params.contactId);
  res.status(200).json(contact);
});

exports.createContact = catchAsync(async (req, res) => {
  const newContact = await contactsServices.createNewContact(req.body);
  res.status(201).json(newContact);
});

exports.deleteContact = catchAsync(async (req, res) => {
  await contactsServices.deleteContact(req.params.contactId);

  res.status(200).json({
    msg: "Contact deleted",
  });
});

exports.updateContact = catchAsync(async (req, res) => {
  const updatedContact = await contactsServices.updateContact(
    req.params.contactId,
    req.body
  );

  res.status(200).json(updatedContact);
});

exports.updateStatus = catchAsync(async (req, res) => {
  const contact = await contactsServices.updateStatusContact(
    req.params.contactId,
    req.body
  );

  res.status(200).json(contact);
});

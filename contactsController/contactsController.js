const { catchAsync, contactsValidation, HttpError } = require("../utils");
const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { v4: uuidv4 } = require("uuid");

exports.getContacts = catchAsync(async (req, res) => {
  const allContacts = await listContacts();

  res.status(200).json({
    message: "Success!",
    contacts: allContacts,
  });
});

exports.getContact = (req, res) => {
  res.status(200).json({
    msg: "Success!",
    contact: req.contact,
  });
};

exports.createContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidation.addNewContactValidation(req.body);

  if (error) throw new HttpError(400, error);

  const { name, email, phone } = value;

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  await addContact(newContact);

  res.status(201).json({
    newContact: newContact,
  });
});

exports.deleteContact = catchAsync(async (req, res) => {
  const { id } = req.contact;

  await removeContact(id);

  res.status(200).json({
    msg: "Contact deleted",
  });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidation.updateContactValidation(req.body);

  if (error) throw new HttpError(400, error);

  const { id } = req.contact;

  const updatedContact = await updateContact(id, value);

  res.status(200).json({
    contact: updatedContact,
  });
});

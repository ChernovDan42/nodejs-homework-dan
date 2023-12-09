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

  res.status(200).json(allContacts);
});

exports.getContact = (req, res) => {
  res.status(200).json(req.contact);
};

exports.createContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidation.addNewContactValidation(req.body);

  if (error) {
    const er = error.details[0].message.split(" ");
    throw new HttpError(400, `missing required ${er[0]} field`);
  }

  const { name, email, phone } = value;

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  await addContact(newContact);

  res.status(201).json(newContact);
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

  if (error) {
    const er = error.details[0].message.split(" ");
    throw new HttpError(400, `missing required ${er[0]} field`);
  }

  const { id } = req.contact;

  const updatedContact = await updateContact(id, value);

  res.status(200).json(updatedContact);
});

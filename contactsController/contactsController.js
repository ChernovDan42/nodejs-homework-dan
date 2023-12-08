const { catchAsync } = require("../utils");
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
  const { name, email, phone } = req.body;

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  await addContact(newContact);

  res.status(201).json({
    msg: "Success!",
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
  const { id } = req.contact;

  const updatedContact = await updateContact(id, req.body);

    res.status(200).json({
      contact: updatedContact,
    });
});

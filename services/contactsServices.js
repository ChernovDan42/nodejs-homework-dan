const { Types } = require("mongoose");

const { Contact } = require("../models");
const { HttpError } = require("../utils");

exports.getAllContacts = () => Contact.find();

exports.getContactById = (id) => Contact.findById(id);

exports.createNewContact = async (contactData) => {
  const newContact = Contact.create(contactData);
  return newContact;
};

exports.deleteContact = async (id) => await Contact.findByIdAndDelete(id);

exports.updateContact = async (id, contactData) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, contactData, {
    new: true,
  });
  return updatedContact;
};

exports.updateStatusContact = async (id, contactData) => {
  const contact = await Contact.findById(id);
  contact.favorite = contactData.favorite;

  return contact.save();
};

exports.checkContactExists = async (filter) => {
  const contactExists = await Contact.exists(filter);

  if (contactExists) throw new HttpError(409, "Contact exists");
};

exports.checkContactExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new HttpError(404, "User not found..");

  const userExists = await Contact.exists({ _id: id });

  if (!userExists) throw new HttpError(404, "User not found..");
};

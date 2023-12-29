const { Types } = require("mongoose");

const { Contact } = require("../models");
const { HttpError } = require("../utils");

exports.getAllContacts = async (query, ownerId) => {
  const filterOptions = query.favorite
    ? { favorite: query.favorite, owner: ownerId }
    : { owner: ownerId };

  const contactsQuery = Contact.find(filterOptions);

  const paginationPage = query.page ? +query.page : 1;
  const paginationLimit = query.limit ? +query.limit : 20;
  const contactsToSkip = (paginationPage - 1) * paginationLimit;

  contactsQuery.skip(contactsToSkip).limit(paginationLimit);

  return await contactsQuery;
};

exports.getContactById = (id, ownerId) =>
  Contact.findOne({ _id: id, owner: ownerId });

exports.createNewContact = async (contactData, ownerId) => {
  const newContact = await Contact.create({ ...contactData, owner: ownerId });
  return newContact;
};

exports.deleteContact = async (id, ownerId) =>
  await Contact.findOneAndDelete({
    _id: id,
    owner: ownerId,
  });

exports.updateContact = async (id, ownerId, contactData) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: ownerId },
    contactData,
    {
      new: true,
    }
  );
  return updatedContact;
};

exports.updateStatusContact = async (id, ownerId, contactData) => {
  const contact = await Contact.findOne({ _id: id, owner: ownerId });
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

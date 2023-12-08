const fs = require("fs/promises");
const path = require("path");
// const { HttpError } = require("../utils");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath);
    const parsed = JSON.parse(allContacts);
    return parsed;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    return allContacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const updatedAllContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedAllContacts));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    allContacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    const allContacts = await listContacts();
    const targetIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (targetIndex !== -1) {
      allContacts[targetIndex].name = name;
      allContacts[targetIndex].email = email;
      allContacts[targetIndex].phone = phone;

      await fs.writeFile(contactsPath, JSON.stringify(allContacts));
      return allContacts[targetIndex];
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

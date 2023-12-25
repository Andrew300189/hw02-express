const { HttpError } = require('../controllers');
const Contact = require('../models/contact');

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findOne(contactId);
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result !== null;
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  return updatedContact;
};
const updateFavorite = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  return updatedContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite
};

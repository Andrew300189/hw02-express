const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../models/contacts');
const HttpError = require("./HttpError");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error)
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw HttpError(404, "Not Found")}
      res.json(contact);
  } catch (error) {
    next(error)
  }
};

const createContact = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (result) {
      res.json({ message: 'contact deleted' });
    } else {
      throw HttpError(404, "Not Found");
    }
  } catch (error) {
    next(error)
  }
};

const updateContactInfo = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      throw HttpError(404, "Not Found")}
      res.json(updatedContact);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactInfo,
};

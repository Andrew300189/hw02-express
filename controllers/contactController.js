const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../models/contacts');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContactInfo = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const updatedContact = await updateContact(contactId, body);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactInfo,
};

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const createContact = async (req, res, next) => {
  const { body } = req;
  try {
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (result) {
    res.json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const updateContactInfo = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
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

const { Contact } = require('../models/contact');
const { contactSchema } = require('../validators/contactValidator');
const HttpError = require('./HttpError');
const ctrlWrapper = require('./ctrlWrapper');

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      throw HttpError(404, 'Not Found');
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createContact = async (req, res) => {
  try {
    const { body } = req;
    const newContact = await Contact.create(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      throw HttpError(404, 'Not Found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateContactInfo = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, 'Bad Request');
    }

    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!updatedContact) {
      throw HttpError(404, 'Not Found');
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  createContact,
  deleteContact: ctrlWrapper(deleteContact),
  updateContactInfo: ctrlWrapper(updateContactInfo),
};

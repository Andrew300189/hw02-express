const { Contact } = require('../models/contact');
const { contactSchema } = require('../validators/contactValidator');
const HttpError = require("./HttpError");
const ctrlWrapper = require('./ctrlWrapper');

const getContacts = async (req, res) => {

    const contacts = await Contact.find();
    res.json(contacts);
  
};

const getContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      throw HttpError(404, 'Not Found')}
      res.json(contact);
  
};

const createContact = async (req, res) => {
  try {
    const { body } = req;
    const newContact = await Contact.create(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: 'missing required name field' });
  }
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (result) {
      res.json({ message: 'contact deleted' });
    } else {
      throw HttpError(404, 'Not Found');
    }
   
};

const updateContactInfo = async (req, res) => {
  
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, 'missing fields');
    }

    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);

    if (!updatedContact) {
      throw HttpError(404, 'Not Found');
    }

    res.json(updatedContact);
  
};



const updateFavorite = async (req, res) => {
  
  const { contactId } = req.params;
  const { favorite } = req.body
  
  const updatedContact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});

  if (!updatedContact) {
    throw HttpError(404, 'Not Found');
  }

  res.json(updatedContact);

}

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  createContact,
  deleteContact: ctrlWrapper(deleteContact),
  updateContactInfo: ctrlWrapper(updateContactInfo),
  updateFavorite: ctrlWrapper(updateFavorite),
};

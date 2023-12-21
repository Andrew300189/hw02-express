const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');
const { validateContact } = require('../../validators/contactValidator');

router.get('/', controllers.contacts.getContacts);
router.get('/:contactId', controllers.contacts.getContact);
router.post('/', validateContact, controllers.contacts.createContact);
router.delete('/:contactId', controllers.contacts.deleteContact);
router.put('/:contactId', controllers.contacts.updateContactInfo);

module.exports = router;

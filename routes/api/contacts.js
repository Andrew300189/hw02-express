const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

router.get('/', controllers.contacts.getContacts);
router.get('/:contactId', controllers.contacts.getContact);
router.post('/', controllers.contacts.createContact);
router.delete('/:contactId', controllers.contacts.deleteContact);
router.put('/:contactId', controllers.contacts.updateContactInfo);
router.patch('/:contactId/favorite', controllers.contacts.updateFavoriteStatus);

module.exports = router;

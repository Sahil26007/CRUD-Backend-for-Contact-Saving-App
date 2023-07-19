const express = require('express');
const {
        getContacts,
        createContact,
        updateContact,
        deleteContact,
        getContact
} = require('../controller/contactcon');

const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');



router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').put(updateContact).delete(deleteContact).get(getContact);



module.exports = router;
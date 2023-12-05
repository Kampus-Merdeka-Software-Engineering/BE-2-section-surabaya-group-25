// src/routes/contact.js
const express = require('express');
const router = express.Router();
const { createContact, getContacts, getContactById } = require('../controllers/contactController');

router.post('/submit', createContact);
router.get('/getmessage', getContacts);
router.get('/getmessage/:id', getContactById);

module.exports = router;

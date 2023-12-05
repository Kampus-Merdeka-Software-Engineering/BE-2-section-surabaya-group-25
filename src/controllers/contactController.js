// src/controllers/contactController.js
const prisma = require('../config/prisma');

async function createContact(req, res) {
  const { firstname, lastname, email, message } = req.body;

  try {
    const newContact = await prisma.contact.create({
      data: {
        firstname,
        lastname,
        email,
        message,
      },
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getContacts(req, res) {
  try {
    const posts = await prisma.contact.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getContactById(req, res) {
  const postId = parseInt(req.params.id);

  try {
    const post = await prisma.contact.findUnique({
      where: {
        id: postId,
      },
    });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createContact, getContacts, getContactById };

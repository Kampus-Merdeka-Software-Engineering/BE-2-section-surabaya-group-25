const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());


//start contact
app.post('/submit', async (req, res) => {
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
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.contact.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/post/:id', async (req, res) => {
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
});
//selesai contact

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

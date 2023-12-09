// src/controllers/newsController.js
const prisma = require('../config/prisma');
const path = require('path');
const md5 = require('md5');

async function createNews(req, res) {
    const { title, category, body } = req.body;

    try {
        const gambar = req.files ? req.files.gambar : null;

        if (!gambar) {
            return res.status(400).json({ msg: "No File Uploaded" });
        }

        const fileSize = gambar.data.length;
        const ext = path.extname(gambar.name);
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid Images" });
        }

        if (fileSize > 5000000) {
            return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }

        const fileName = md5(gambar.name) + ext;

        gambar.mv('./public/images/' + fileName, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }

            try {
                const newPost = await prisma.post.create({
                    data: {
                        title,
                        category,
                        body,
                        gambar: fileName,
                    },
                });

                const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
                res.status(201).json({ ...newPost, gambar: url });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNews(req, res) {
    try {
        const news = await prisma.post.findMany();
        res.status(200).json(news);
        } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getNewsByCategory(req, res) {
    const category = req.params.category;

    try {
        const newsArticles = await prisma.post.findMany({
            where: {
                category: category,
            },
        });

        if (newsArticles.length > 0) {
            res.status(200).json(newsArticles);
        } else {
            res.status(404).json({ error: 'News articles not found in the specified category' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNewsById(req, res) {
    const postId = parseInt(req.params.id);

    try {
        const newsArticle = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        });

        if (newsArticle) {
        res.status(200).json(newsArticle);
        } else {
        res.status(404).json({ error: 'News article not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function putNewsById(req, res) {
    const postId = parseInt(req.params.id);
    const { title, category, body, gambar } = req.body;

    try {
        const updatedPost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            title,
            category,
            body,
            gambar,
            
        },
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteNewsById(req, res) {
    const postId = parseInt(req.params.id);

    try {
        await prisma.post.delete({
        where: {
            id: postId,
        },
        });

        res.status(200).json({ message: 'News article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
  
  module.exports = { createNews, getNews, getNewsById, putNewsById, deleteNewsById, getNewsByCategory };
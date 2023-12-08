// src/controllers/newsController.js
const prisma = require('../config/prisma');

async function createNews(req, res) {
    
    const { title, category, body, detail, gambar } = req.body;

    try {
        const newPost = await prisma.post.create({
        data: {
            title,
            category,
            body,
            detail,
            gambar,
        
            
        },
        });
        res.status(201).json(newPost);
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
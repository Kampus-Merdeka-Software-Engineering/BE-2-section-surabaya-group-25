// ...

const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const path = require('path');

// Routes for news
router.post('/create', newsController.createNews);
router.get('/get', newsController.getNews);
router.get('/get/:id', newsController.getNewsById);
router.put('/update/:id', newsController.putNewsById);
router.delete('/delete/:id', newsController.deleteNewsById);
router.get('/getcategory/:category', newsController.getNewsByCategory);
router.get('/getsearch/:title', newsController.getNewsByBody);

// Serve static files from the 'public' directory
router.use('/public', express.static(path.join(__dirname, '..', 'public')));

module.exports = router;

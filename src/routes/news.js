const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Routes for news
router.post('/create', newsController.createNews);
router.get('/get', newsController.getNews);
router.get('/get/:id', newsController.getNewsById);
router.put('/update/:id', newsController.putNewsById);
router.delete('/delete/:id', newsController.deleteNewsById);

module.exports = router;

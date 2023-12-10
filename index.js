const express = require('express');
const FileUpload = require('express-fileupload');
const contactRoutes = require('./src/routes/contact');
const postRoutes = require('./src/routes/news');
const cors = require('cors');
const path = require('path');  // Add this line

const app = express();
app.use(cors());
app.use(FileUpload())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/contact', contactRoutes);

// Use the 'postRoutes' for news
app.use('/news', postRoutes);

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Jalankan server
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const contactRoutes = require('./src/routes/contact');
const postRoutes = require('./src/routes/news');

const app = express();

app.use(express.json());
app.use('/contact', contactRoutes);
app.use('/news', postRoutes);


// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

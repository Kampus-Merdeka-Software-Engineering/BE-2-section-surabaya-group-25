const express = require('express');
const contactRoutes = require('./src/routes/contact');
const postRoutes = require('./src/routes/news');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/contact', contactRoutes);
app.use('/news', postRoutes);



// Jalankan server
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

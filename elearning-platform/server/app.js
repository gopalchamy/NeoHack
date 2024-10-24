// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const courseRoutes = require('./routes/courses');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/courses', courseRoutes);

mongoose.connect('mongodb://localhost:27017/elearning', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

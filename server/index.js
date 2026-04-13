const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const marketRoutes = require('./routes/marketRoutes');
const authRoutes = require('./routes/authRoutes');
const savedSearchRoutes = require('./routes/savedSearchRoutes');
const cityRoutes = require('./routes/cityRoutes');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Routes
app.use('/api/markets', marketRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/saved', savedSearchRoutes);
app.use('/api/cities', cityRoutes);
// Test route
app.get('/', (req, res) => {
  res.json({ message: 'BrickFi API is running 🏠' });
});
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://brickfi.vercel.app',
    /\.vercel\.app$/
  ],
  methods: ['GET', 'POST', 'DELETE'],
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch(err => console.error(err));
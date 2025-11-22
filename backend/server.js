require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <--- THE BRIDGE
const connectDB = require('./config/db');

// Initialize App
const app = express();

// 1. Connect to MongoDB Atlas
connectDB();

// 2. CORS CONFIGURATION (Crucial for Vercel + Render)
// This allows your frontend to send requests to this backend.
app.use(cors({
  origin: '*', // Allow All Origins (Simplest for deployment)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Middleware to parse JSON data from forms
app.use(express.json());

// 4. Routes
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

// 5. Health Check Route (Click your Render link to see this)
app.get('/', (req, res) => {
  res.send('AB Custom Labels API is Live & Running! 🚀');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
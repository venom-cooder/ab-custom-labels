require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize App
const app = express();

// 1. Connect to MongoDB Atlas
connectDB();

// 2. CORS CONFIGURATION (Crucial for Vercel + Render)
// This allows your frontend (on Vercel) to talk to this backend (on Render)
app.use(cors({
  origin: '*', // Allow requests from any origin (simplest for deployment)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Middleware to parse JSON data from forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Routes
// Orders (From Home/Gallery forms)
app.use('/api/orders', require('./routes/orderRoutes'));

// Products/Gallery (For fetching items & Admin uploads)
// Note: This route handles both public fetching and admin uploading via Cloudinary
app.use('/api/products', require('./routes/productRoutes'));
// Alias for consistency if frontend calls 'admin/gallery'
app.use('/api/admin/gallery', require('./routes/productRoutes')); 

// Careers (Job Applications from candidates)
app.use('/api/applications', require('./routes/applicationRoutes'));

// Job Listings (For Admin to post new jobs)
app.use('/api/careers', require('./routes/careerRoutes'));

// Support (Feedback & Help forms)
app.use('/api/support', require('./routes/supportRoutes'));

// FAQs (For Admin to manage FAQs)
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// 5. Health Check Route (Click your Render link to see this)
app.get('/', (req, res) => {
  res.send('AB Custom Labels API is Live & Running! 🚀');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
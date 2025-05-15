// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const staffRoutes = require('./routes/staffRoutes');
const relatedInfoRoutes = require('./routes/relatedInfoRoutes');


// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming form data (for file uploads)
app.use('/api/related-info', relatedInfoRoutes);

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/staff', staffRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

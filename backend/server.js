// MAIN ENTRY POINT

// backend/server.js
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/database.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
});
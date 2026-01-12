// TASK MODEL

// backend/models/Task.js
import mongoose from 'mongoose';

// Define the schema for a task
const taskSchema = new mongoose.Schema({
  // Task title/description
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true // Removes whitespace from both ends
  },
  
  // Task completion status
  status: {
    type: String,
    enum: ['pending', 'completed'], // Only these two values allowed
    default: 'pending'
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;
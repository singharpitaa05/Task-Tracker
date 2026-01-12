// TASK ROUTES - PHASE 2 ENHANCED

// backend/routes/taskRoutes.js
import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Validation helper function
const validateTaskTitle = (title) => {
  const errors = [];
  
  if (!title) {
    errors.push('Task title is required');
    return { isValid: false, errors };
  }
  
  const trimmedTitle = title.trim();
  
  if (trimmedTitle.length === 0) {
    errors.push('Task title cannot be empty or contain only spaces');
    return { isValid: false, errors };
  }
  
  if (trimmedTitle.length < 3) {
    errors.push('Task title must be at least 3 characters long');
    return { isValid: false, errors };
  }
  
  if (trimmedTitle.length > 200) {
    errors.push('Task title cannot exceed 200 characters');
    return { isValid: false, errors };
  }
  
  // Check for only special characters
  const specialCharOnly = /^[^a-zA-Z0-9]+$/;
  if (specialCharOnly.test(trimmedTitle)) {
    errors.push('Task title must contain at least one letter or number');
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [], trimmedTitle };
};

// GET /api/tasks - Get all tasks
router.get('/', async (req, res) => {
  try {
    // Fetch all tasks sorted by creation date (newest first)
    const tasks = await Task.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
      message: tasks.length === 0 ? 'No tasks found' : 'Tasks retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
});

// GET /api/tasks/:id - Get a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format'
      });
    }
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: task,
      message: 'Task retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message
    });
  }
});

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    // Enhanced validation using helper function
    const validation = validateTaskTitle(title);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors[0],
        errors: validation.errors
      });
    }

    // Check for duplicate task titles (case-insensitive)
    const existingTask = await Task.findOne({ 
      title: { $regex: new RegExp(`^${validation.trimmedTitle}$`, 'i') }
    });
    
    if (existingTask) {
      return res.status(409).json({
        success: false,
        message: 'A task with this title already exists',
        existingTaskId: existingTask._id
      });
    }

    // Create new task
    const task = await Task.create({
      title: validation.trimmedTitle,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format'
      });
    }

    // Find task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Track if any changes were made
    let hasChanges = false;

    // Update title if provided
    if (title !== undefined) {
      const validation = validateTaskTitle(title);
      
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.errors[0],
          errors: validation.errors
        });
      }
      
      // Check if title is actually different
      if (validation.trimmedTitle !== task.title) {
        // Check for duplicate titles (excluding current task)
        const existingTask = await Task.findOne({ 
          _id: { $ne: id },
          title: { $regex: new RegExp(`^${validation.trimmedTitle}$`, 'i') }
        });
        
        if (existingTask) {
          return res.status(409).json({
            success: false,
            message: 'A task with this title already exists',
            existingTaskId: existingTask._id
          });
        }
        
        task.title = validation.trimmedTitle;
        hasChanges = true;
      }
    }

    // Update status if provided
    if (status !== undefined) {
      if (!['pending', 'completed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be "pending" or "completed"'
        });
      }
      
      if (status !== task.status) {
        task.status = status;
        hasChanges = true;
      }
    }

    // If no changes, return current task
    if (!hasChanges) {
      return res.status(200).json({
        success: true,
        message: 'No changes made',
        data: task
      });
    }

    // Save updated task
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Error updating task:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format'
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
});

// GET /api/tasks/filter/:status - Filter tasks by status
router.get('/filter/:status', async (req, res) => {
  try {
    const { status } = req.params;
    
    // Validate status
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "pending" or "completed"'
      });
    }
    
    const tasks = await Task.find({ status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
      message: `${status} tasks retrieved successfully`
    });
  } catch (error) {
    console.error('Error filtering tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Error filtering tasks',
      error: error.message
    });
  }
});

export default router;
// VALIDATION FUNCTIONS

// frontend/validator.js

// Validation utility for form inputs
const validator = {
  
  // Validate task title
  validateTaskTitle(title) {
    const errors = [];
    
    // Check if title exists
    if (!title) {
      errors.push('Task title is required');
      return { isValid: false, errors };
    }

    // Trim whitespace
    const trimmedTitle = title.trim();

    // Check if empty after trimming
    if (trimmedTitle.length === 0) {
      errors.push('Task title cannot be empty or contain only spaces');
      return { isValid: false, errors };
    }

    // Check minimum length
    if (trimmedTitle.length < 3) {
      errors.push('Task title must be at least 3 characters long');
      return { isValid: false, errors };
    }

    // Check maximum length
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
  },

  // Validate task status
  validateTaskStatus(status) {
    const validStatuses = ['pending', 'completed'];
    
    if (!status) {
      return { isValid: false, errors: ['Status is required'] };
    }

    if (!validStatuses.includes(status)) {
      return { 
        isValid: false, 
        errors: [`Invalid status. Must be one of: ${validStatuses.join(', ')}`] 
      };
    }

    return { isValid: true, errors: [] };
  },

  // Check for duplicate task titles
  checkDuplicateTitle(title, existingTasks) {
    const trimmedTitle = title.trim().toLowerCase();
    const duplicate = existingTasks.find(
      task => task.title.trim().toLowerCase() === trimmedTitle
    );

    if (duplicate) {
      return {
        isDuplicate: true,
        message: 'A task with this title already exists'
      };
    }

    return { isDuplicate: false };
  },

  // Sanitize input to prevent XSS
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
};

export default validator;
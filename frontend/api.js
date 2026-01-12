// APPLICATION PROGRAMMING INTERFACE

// frontend/api.js

// Base API URL
const API_BASE_URL = 'http://localhost:5000/api/tasks';

// API Service object with all task-related functions
const api = {
  
  // Fetch all tasks from the server
  async getAllTasks() {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch tasks');
      }
      
      return data.data; // Return the tasks array
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  async createTask(title) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create task');
      }
      
      return data.data; // Return the created task
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task (title or status)
  async updateTask(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update task');
      }
      
      return data.data; // Return the updated task
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete task');
      }
      
      return data.data; // Return the deleted task
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

export default api;
// STORAGE MANAGER

// frontend/storage.js

const STORAGE_KEY = 'tasktracker_tasks';

// Storage utility object
const storage = {
  
  // Save tasks to localStorage
  saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Get tasks from localStorage
  getTasks() {
    try {
      const tasks = localStorage.getItem(STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Clear all tasks from localStorage
  clearTasks() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Add a single task to localStorage
  addTask(task) {
    try {
      const tasks = this.getTasks();
      tasks.push(task);
      return this.saveTasks(tasks);
    } catch (error) {
      console.error('Error adding task to localStorage:', error);
      return false;
    }
  },

  // Update a task in localStorage
  updateTask(taskId, updates) {
    try {
      const tasks = this.getTasks();
      const index = tasks.findIndex(t => t._id === taskId);
      
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        return this.saveTasks(tasks);
      }
      
      return false;
    } catch (error) {
      console.error('Error updating task in localStorage:', error);
      return false;
    }
  },

  // Delete a task from localStorage
  deleteTask(taskId) {
    try {
      const tasks = this.getTasks();
      const filteredTasks = tasks.filter(t => t._id !== taskId);
      return this.saveTasks(filteredTasks);
    } catch (error) {
      console.error('Error deleting task from localStorage:', error);
      return false;
    }
  }
};

export default storage;
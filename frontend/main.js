// MAIN APPLICATION LOGIC - PHASE 2 ENHANCED

// frontend/main.js
import api from './api.js';
import storage from './storage.js';
import toast from './toast.js';
import validator from './validator.js';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksContainer = document.getElementById('tasksContainer');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// Application state
let tasks = [];
let currentFilter = 'all';
let isOnline = true;

// Initialize the application
async function init() {
  try {
    // Show loading indicator
    showLoading(true);
    
    // Fetch tasks from server
    tasks = await api.getAllTasks();
    
    // Save to localStorage for offline support
    storage.saveTasks(tasks);
    
    // Mark as online
    isOnline = true;
    
    // Render tasks
    renderTasks();
    
    // Show success message only if there are tasks
    if (tasks.length > 0) {
      toast.success(`Loaded ${tasks.length} task${tasks.length !== 1 ? 's' : ''} successfully`);
    }
    
  } catch (error) {
    console.error('Failed to load tasks from server, loading from localStorage:', error);
    
    // Mark as offline
    isOnline = false;
    
    // Fallback to localStorage if API fails
    tasks = storage.getTasks();
    renderTasks();
    
    // Show warning toast
    toast.warning('Offline mode: Showing cached tasks', 4000);
    showError('⚠️ Working offline - Changes will sync when connection is restored');
  } finally {
    showLoading(false);
  }
  
  // Set up event listeners
  setupEventListeners();
  
  // Monitor online/offline status
  monitorConnectionStatus();
}

// Set up all event listeners
function setupEventListeners() {
  // Add task button click
  addTaskBtn.addEventListener('click', handleAddTask);
  
  // Enter key in input field
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  });
  
  // Clear error message when user starts typing
  taskInput.addEventListener('input', () => {
    hideError();
    
    // Show character count if getting close to limit
    const length = taskInput.value.length;
    if (length > 180) {
      showError(`${200 - length} characters remaining`);
    }
  });
  
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newFilter = btn.dataset.filter;
      
      // Don't do anything if same filter
      if (newFilter === currentFilter) return;
      
      currentFilter = newFilter;
      
      // Update active button styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
      });
      btn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
      btn.classList.add('bg-indigo-600', 'text-white');
      
      // Show feedback
      const filterNames = { all: 'All', pending: 'Pending', completed: 'Completed' };
      toast.info(`Showing ${filterNames[currentFilter]} tasks`, 1500);
      
      renderTasks();
    });
  });
}

// Monitor online/offline connection status
function monitorConnectionStatus() {
  window.addEventListener('online', async () => {
    isOnline = true;
    toast.success('Back online! Syncing tasks...', 2000);
    
    // Reload tasks from server
    try {
      tasks = await api.getAllTasks();
      storage.saveTasks(tasks);
      renderTasks();
      hideError();
    } catch (error) {
      console.error('Failed to sync tasks:', error);
    }
  });
  
  window.addEventListener('offline', () => {
    isOnline = false;
    toast.warning('You are offline. Changes will be saved locally.', 3000);
    showError('⚠️ Offline - Changes will sync when reconnected');
  });
}

// Handle adding a new task
async function handleAddTask() {
  const title = taskInput.value;
  
  // Validate input using validator utility
  const validation = validator.validateTaskTitle(title);
  
  if (!validation.isValid) {
    showError(validation.errors[0]);
    toast.error(validation.errors[0], 3000);
    taskInput.focus();
    return;
  }
  
  const trimmedTitle = validation.trimmedTitle;
  
  // Check for duplicate titles
  const duplicateCheck = validator.checkDuplicateTitle(trimmedTitle, tasks);
  if (duplicateCheck.isDuplicate) {
    showError(duplicateCheck.message);
    toast.warning(duplicateCheck.message, 3000);
    taskInput.focus();
    taskInput.select();
    return;
  }
  
  try {
    // Disable button to prevent double submission
    addTaskBtn.disabled = true;
    addTaskBtn.textContent = 'Adding...';
    addTaskBtn.classList.add('opacity-50', 'cursor-not-allowed');
    
    // Create task via API
    const newTask = await api.createTask(trimmedTitle);
    
    // Add to local tasks array
    tasks.unshift(newTask); // Add to beginning of array
    
    // Update localStorage
    storage.saveTasks(tasks);
    
    // Clear input
    taskInput.value = '';
    
    // Re-render tasks
    renderTasks();
    
    // Hide error and show success
    hideError();
    toast.success('✓ Task added successfully!', 2000);
    
    // Focus back on input for quick adding
    taskInput.focus();
    
  } catch (error) {
    const errorMsg = error.message || 'Failed to add task. Please try again.';
    showError(errorMsg);
    toast.error(errorMsg, 4000);
    console.error('Error adding task:', error);
  } finally {
    // Re-enable button
    addTaskBtn.disabled = false;
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

// Handle marking task as complete/incomplete
async function handleToggleStatus(taskId, currentStatus) {
  try {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    
    // Optimistic update - update UI immediately
    const index = tasks.findIndex(t => t._id === taskId);
    if (index !== -1) {
      const oldStatus = tasks[index].status;
      tasks[index].status = newStatus;
      renderTasks();
      
      try {
        // Update via API
        const updatedTask = await api.updateTask(taskId, { status: newStatus });
        tasks[index] = updatedTask;
        
        // Update localStorage
        storage.saveTasks(tasks);
        
        // Show success toast
        const statusText = newStatus === 'completed' ? 'completed' : 'marked as pending';
        toast.success(`Task ${statusText}!`, 2000);
        
      } catch (error) {
        // Revert on error
        tasks[index].status = oldStatus;
        renderTasks();
        throw error;
      }
    }
    
  } catch (error) {
    const errorMsg = 'Failed to update task status';
    showError(errorMsg);
    toast.error(errorMsg, 3000);
    console.error('Error toggling status:', error);
  }
}

// Handle editing a task
async function handleEditTask(taskId, currentTitle) {
  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
  const titleElement = taskElement.querySelector('.task-title');
  
  // Store original element for restoration
  const originalElement = titleElement.cloneNode(true);
  
  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentTitle;
  input.className = 'flex-1 px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500';
  input.maxLength = 200;
  
  // Replace title with input
  titleElement.replaceWith(input);
  input.focus();
  input.select();
  
  // Track if save is in progress
  let isSaving = false;
  
  // Save function
  const saveEdit = async () => {
    // Prevent multiple saves
    if (isSaving) return;
    
    const newTitle = input.value.trim();
    
    // Validate new title
    const validation = validator.validateTaskTitle(newTitle);
    
    if (!validation.isValid) {
      showError(validation.errors[0]);
      toast.error(validation.errors[0], 3000);
      input.focus();
      return;
    }
    
    if (validation.trimmedTitle === currentTitle) {
      // No change, just restore original
      input.replaceWith(originalElement);
      return;
    }
    
    // Check for duplicates (excluding current task)
    const otherTasks = tasks.filter(t => t._id !== taskId);
    const duplicateCheck = validator.checkDuplicateTitle(validation.trimmedTitle, otherTasks);
    if (duplicateCheck.isDuplicate) {
      showError(duplicateCheck.message);
      toast.warning(duplicateCheck.message, 3000);
      input.focus();
      input.select();
      return;
    }
    
    isSaving = true;
    input.disabled = true;
    input.classList.add('opacity-50');
    
    try {
      // Update via API
      const updatedTask = await api.updateTask(taskId, { title: validation.trimmedTitle });
      
      // Update local tasks array
      const index = tasks.findIndex(t => t._id === taskId);
      if (index !== -1) {
        tasks[index] = updatedTask;
      }
      
      // Update localStorage
      storage.saveTasks(tasks);
      
      // Re-render tasks
      renderTasks();
      
      hideError();
      toast.success('Task updated successfully!', 2000);
      
    } catch (error) {
      const errorMsg = 'Failed to update task';
      showError(errorMsg);
      toast.error(errorMsg, 3000);
      console.error('Error editing task:', error);
      
      // Restore original on error
      input.replaceWith(originalElement);
    } finally {
      isSaving = false;
    }
  };
  
  // Cancel function
  const cancelEdit = () => {
    input.replaceWith(originalElement);
    hideError();
  };
  
  // Save on Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  });
  
  // Cancel on Escape key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cancelEdit();
    }
  });
  
  // Save on blur (clicking outside)
  input.addEventListener('blur', saveEdit);
}

// Handle deleting a task
async function handleDeleteTask(taskId) {
  // Find task title for confirmation
  const task = tasks.find(t => t._id === taskId);
  const taskTitle = task ? task.title : 'this task';
  
  // Confirm deletion
  if (!confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
    return;
  }
  
  try {
    // Store task for potential undo
    const deletedTask = { ...task };
    
    // Optimistic update - remove from UI immediately
    tasks = tasks.filter(t => t._id !== taskId);
    storage.saveTasks(tasks);
    renderTasks();
    
    // Delete via API
    await api.deleteTask(taskId);
    
    // Show success toast
    toast.success('Task deleted successfully', 2000);
    
  } catch (error) {
    const errorMsg = 'Failed to delete task';
    showError(errorMsg);
    toast.error(errorMsg, 3000);
    console.error('Error deleting task:', error);
    
    // Reload tasks to restore state
    try {
      tasks = await api.getAllTasks();
      storage.saveTasks(tasks);
      renderTasks();
    } catch (reloadError) {
      console.error('Failed to reload tasks:', reloadError);
    }
  }
}

// Render all tasks based on current filter
function renderTasks() {
  // Filter tasks based on current filter
  let filteredTasks = tasks;
  
  if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(t => t.status === 'pending');
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(t => t.status === 'completed');
  }
  
  // Update task count
  updateTaskCount(filteredTasks.length, tasks.length);
  
  // Show empty state if no tasks
  if (filteredTasks.length === 0) {
    tasksContainer.innerHTML = '';
    emptyState.classList.remove('hidden');
    
    // Update empty state message based on filter
    updateEmptyStateMessage();
    return;
  }
  
  // Hide empty state
  emptyState.classList.add('hidden');
  
  // Clear container
  tasksContainer.innerHTML = '';
  
  // Render each task with animation
  filteredTasks.forEach((task, index) => {
    const taskElement = createTaskElement(task);
    
    // Add entrance animation delay
    taskElement.style.opacity = '0';
    taskElement.style.transform = 'translateY(10px)';
    
    tasksContainer.appendChild(taskElement);
    
    // Trigger animation
    setTimeout(() => {
      taskElement.style.transition = 'all 0.3s ease';
      taskElement.style.opacity = '1';
      taskElement.style.transform = 'translateY(0)';
    }, index * 50); // Stagger animation
  });
}

// Update empty state message based on current filter
function updateEmptyStateMessage() {
  const emptyStateContent = emptyState.querySelector('p');
  
  if (currentFilter === 'all') {
    emptyStateContent.textContent = 'No tasks yet. Add your first task above!';
  } else if (currentFilter === 'pending') {
    emptyStateContent.textContent = 'No pending tasks. Great job! 🎉';
  } else if (currentFilter === 'completed') {
    emptyStateContent.textContent = 'No completed tasks yet. Keep working! 💪';
  }
}

// Create a task element
function createTaskElement(task) {
  const isCompleted = task.status === 'completed';
  
  // Create task container
  const taskDiv = document.createElement('div');
  taskDiv.className = `flex items-center gap-3 p-4 border rounded-lg transition-all duration-200 ${
    isCompleted 
      ? 'bg-green-50 border-green-200' 
      : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
  }`;
  taskDiv.dataset.taskId = task._id;
  
  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isCompleted;
  checkbox.className = 'w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer';
  checkbox.addEventListener('change', () => handleToggleStatus(task._id, task.status));
  
  // Task title
  const titleDiv = document.createElement('div');
  titleDiv.className = `task-title flex-1 ${
    isCompleted 
      ? 'line-through text-gray-500' 
      : 'text-gray-800 font-medium'
  }`;
  titleDiv.textContent = task.title;
  
  // Status badge
  const statusBadge = document.createElement('span');
  statusBadge.className = `px-3 py-1 text-xs font-semibold rounded-full ${
    isCompleted
      ? 'bg-green-200 text-green-800'
      : 'bg-yellow-200 text-yellow-800'
  }`;
  statusBadge.textContent = isCompleted ? 'Completed' : 'Pending';
  
  // Edit button
  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️';
  editBtn.className = 'p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200';
  editBtn.title = 'Edit task';
  editBtn.addEventListener('click', () => handleEditTask(task._id, task.title));
  
  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.className = 'p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200';
  deleteBtn.title = 'Delete task';
  deleteBtn.addEventListener('click', () => handleDeleteTask(task._id));
  
  // Append all elements
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(titleDiv);
  taskDiv.appendChild(statusBadge);
  taskDiv.appendChild(editBtn);
  taskDiv.appendChild(deleteBtn);
  
  return taskDiv;
}

// Update task count display
function updateTaskCount(filteredCount, totalCount) {
  let countText = '';
  
  if (currentFilter === 'all') {
    countText = `${totalCount} task${totalCount !== 1 ? 's' : ''}`;
  } else {
    const filterName = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
    countText = `${filteredCount} ${filterName}`;
    
    if (totalCount !== filteredCount) {
      countText += ` of ${totalCount}`;
    }
  }
  
  taskCount.textContent = countText;
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

// Hide error message
function hideError() {
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';
}

// Show/hide loading indicator
function showLoading(show) {
  if (show) {
    loadingIndicator.classList.remove('hidden');
    tasksContainer.classList.add('hidden');
    emptyState.classList.add('hidden');
  } else {
    loadingIndicator.classList.add('hidden');
    tasksContainer.classList.remove('hidden');
  }
}

// Initialize app when DOM is ready
init();
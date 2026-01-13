// MAIN APPLICATION LOGIC - PHASE 4 COMPLETE

// frontend/main.js
import api from './api.js';
import bulkOperations from './bulkOperations.js';
import stats from './stats.js';
import storage from './storage.js';
import toast from './toast.js';
import validator from './validator.js';
import search from './search.js';
import sort from './sort.js';
import exportImport from './exportImport.js';
import keyboard from './keyboard.js';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksContainer = document.getElementById('tasksContainer');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// Statistics Dashboard Elements
const statTotal = document.getElementById('statTotal');
const statPending = document.getElementById('statPending');
const statCompleted = document.getElementById('statCompleted');
const statProgress = document.getElementById('statProgress');
const progressBar = document.getElementById('progressBar');

// Bulk Operations Elements
const selectAllCheckbox = document.getElementById('selectAllCheckbox');
const bulkCompleteBtn = document.getElementById('bulkCompleteBtn');
const bulkPendingBtn = document.getElementById('bulkPendingBtn');
const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');

// Phase 4 Elements
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const searchResultsInfo = document.getElementById('searchResultsInfo');
const searchResultCount = document.getElementById('searchResultCount');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFileInput = document.getElementById('importFileInput');
const keyboardShortcutsBtn = document.getElementById('keyboardShortcutsBtn');

// Application state
let tasks = [];
let currentFilter = 'all';
let currentSearchQuery = '';
let currentSortBy = 'newest';
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
    
    // Render tasks and statistics
    renderTasks();
    updateStatistics();
    
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
    updateStatistics();
    
    // Show warning toast
    toast.warning('Offline mode: Showing cached tasks', 4000);
    showError('⚠️ Working offline - Changes will sync when connection is restored');
  } finally {
    showLoading(false);
  }
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize keyboard shortcuts
  initializeKeyboardShortcuts();
  
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
      handleFilterChange(btn.dataset.filter);
    });
  });
  
  // Select All Checkbox
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
      handleSelectAll(e.target.checked);
    });
  }
  
  // Bulk Complete Button
  if (bulkCompleteBtn) {
    bulkCompleteBtn.addEventListener('click', () => handleBulkComplete());
  }
  
  // Bulk Pending Button
  if (bulkPendingBtn) {
    bulkPendingBtn.addEventListener('click', () => handleBulkPending());
  }
  
  // Bulk Delete Button
  if (bulkDeleteBtn) {
    bulkDeleteBtn.addEventListener('click', () => handleBulkDelete());
  }
  
  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });
  }
  
  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      handleSortChange(e.target.value);
    });
  }
  
  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      handleClearSearch();
    });
  }
  
  // Export button
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      handleExportMenu();
    });
  }
  
  // Import button
  if (importBtn) {
    importBtn.addEventListener('click', () => {
      importFileInput.click();
    });
  }
  
  // Import file input
  if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
      handleImport(e.target.files[0]);
    });
  }
  
  // Keyboard shortcuts button
  if (keyboardShortcutsBtn) {
    keyboardShortcutsBtn.addEventListener('click', () => {
      keyboard.showHelp();
    });
  }
}

// Initialize keyboard shortcuts
function initializeKeyboardShortcuts() {
  keyboard.init({
    newTask: () => {
      taskInput.focus();
      taskInput.select();
    },
    search: () => {
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    },
    selectAll: () => {
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = !selectAllCheckbox.checked;
        handleSelectAll(selectAllCheckbox.checked);
      }
    },
    deleteSelected: () => {
      if (bulkOperations.getSelectedCount() > 0) {
        handleBulkDelete();
      }
    },
    escape: () => {
      // Clear search
      if (search.isSearchActive(currentSearchQuery)) {
        handleClearSearch();
      }
      // Deselect all
      else if (bulkOperations.getSelectedCount() > 0) {
        bulkOperations.clearSelection();
        renderTasks();
        toast.info('Selection cleared', 1500);
      }
      // Blur active input
      else if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    filterAll: () => handleFilterChange('all'),
    filterPending: () => handleFilterChange('pending'),
    filterCompleted: () => handleFilterChange('completed'),
    export: () => handleExportMenu()
  });
}

// Handle filter change
function handleFilterChange(newFilter) {
  // Don't do anything if same filter
  if (newFilter === currentFilter) return;
  
  currentFilter = newFilter;
  
  // Clear selection when changing filters
  bulkOperations.clearSelection();
  
  // Update active button styling
  filterBtns.forEach(b => {
    b.classList.remove('bg-indigo-600', 'text-white');
    b.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
  });
  
  const activeBtn = Array.from(filterBtns).find(b => b.dataset.filter === newFilter);
  if (activeBtn) {
    activeBtn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
    activeBtn.classList.add('bg-indigo-600', 'text-white');
  }
  
  // Show feedback
  const filterNames = { all: 'All', pending: 'Pending', completed: 'Completed' };
  toast.info(`Showing ${filterNames[currentFilter]} tasks`, 1500);
  
  renderTasks();
}

// Handle search
function handleSearch(query) {
  currentSearchQuery = query;
  renderTasks();
  
  // Update search results info
  updateSearchResultsInfo();
}

// Handle clear search
function handleClearSearch() {
  currentSearchQuery = '';
  if (searchInput) {
    searchInput.value = '';
  }
  renderTasks();
  updateSearchResultsInfo();
  toast.info('Search cleared', 1500);
}

// Handle sort change
function handleSortChange(sortBy) {
  currentSortBy = sortBy;
  renderTasks();
  
  const sortLabel = sort.getSortLabel(sortBy);
  toast.info(`Sorted by: ${sortLabel}`, 1500);
}

// Update search results info
function updateSearchResultsInfo() {
  if (!searchResultsInfo) return;
  
  if (search.isSearchActive(currentSearchQuery)) {
    const searchedTasks = search.searchTasks(tasks, currentSearchQuery);
    searchResultCount.textContent = searchedTasks.length;
    searchResultsInfo.classList.remove('hidden');
  } else {
    searchResultsInfo.classList.add('hidden');
  }
}

// Handle export menu
function handleExportMenu() {
  // Create export modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📥 Export Tasks</h2>
      <p class="text-gray-600 mb-6">Choose export format:</p>
      
      <div class="space-y-3">
        <button class="export-json w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-left flex items-center gap-3">
          <span class="text-xl">📄</span>
          <div>
            <div class="font-semibold">JSON Format</div>
            <div class="text-xs text-indigo-200">Best for backup and re-import</div>
          </div>
        </button>
        
        <button class="export-csv w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-left flex items-center gap-3">
          <span class="text-xl">📊</span>
          <div>
            <div class="font-semibold">CSV Format</div>
            <div class="text-xs text-green-200">Open in Excel or Google Sheets</div>
          </div>
        </button>
        
        <button class="export-text w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-left flex items-center gap-3">
          <span class="text-xl">📝</span>
          <div>
            <div class="font-semibold">Text Format</div>
            <div class="text-xs text-purple-200">Simple readable text file</div>
          </div>
        </button>
      </div>
      
      <button class="cancel-export w-full mt-4 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
        Cancel
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Export JSON
  modal.querySelector('.export-json').addEventListener('click', () => {
    const filename = exportImport.generateFilename('tasks', 'json');
    const result = exportImport.exportToJSON(tasks, filename);
    if (result.success) {
      toast.success(result.message, 2000);
    } else {
      toast.error(result.message, 3000);
    }
    modal.remove();
  });
  
  // Export CSV
  modal.querySelector('.export-csv').addEventListener('click', () => {
    const filename = exportImport.generateFilename('tasks', 'csv');
    const result = exportImport.exportToCSV(tasks, filename);
    if (result.success) {
      toast.success(result.message, 2000);
    } else {
      toast.error(result.message, 3000);
    }
    modal.remove();
  });
  
  // Export Text
  modal.querySelector('.export-text').addEventListener('click', () => {
    const filename = exportImport.generateFilename('tasks', 'txt');
    const result = exportImport.exportToText(tasks, filename);
    if (result.success) {
      toast.success(result.message, 2000);
    } else {
      toast.error(result.message, 3000);
    }
    modal.remove();
  });
  
  // Cancel
  modal.querySelector('.cancel-export').addEventListener('click', () => {
    modal.remove();
  });
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Handle import
async function handleImport(file) {
  if (!file) return;
  
  try {
    toast.info('Importing tasks...', 2000);
    
    let result;
    
    if (file.name.endsWith('.json')) {
      result = await exportImport.importFromJSON(file);
    } else if (file.name.endsWith('.csv')) {
      result = await exportImport.importFromCSV(file);
    } else {
      toast.error('Unsupported file format. Please use JSON or CSV', 3000);
      return;
    }
    
    if (result.success) {
      // Ask user if they want to merge or replace
      const merge = confirm(`Import ${result.tasks.length} tasks. Do you want to MERGE with existing tasks?\n\nClick OK to merge, or Cancel to replace all tasks.`);
      
      if (merge) {
        // Merge: Add imported tasks
        for (const importedTask of result.tasks) {
          try {
            const newTask = await api.createTask(importedTask.title);
            if (importedTask.status === 'completed') {
              await api.updateTask(newTask._id, { status: 'completed' });
            }
          } catch (error) {
            console.error('Error importing task:', error);
          }
        }
      } else {
        // Replace: Delete all existing tasks first
        const deletePromises = tasks.map(t => api.deleteTask(t._id));
        await Promise.all(deletePromises);
        
        // Then add imported tasks
        for (const importedTask of result.tasks) {
          try {
            const newTask = await api.createTask(importedTask.title);
            if (importedTask.status === 'completed') {
              await api.updateTask(newTask._id, { status: 'completed' });
            }
          } catch (error) {
            console.error('Error importing task:', error);
          }
        }
      }
      
      // Reload tasks
      tasks = await api.getAllTasks();
      storage.saveTasks(tasks);
      renderTasks();
      updateStatistics();
      
      toast.success(result.message, 3000);
    } else {
      toast.error(result.message, 3000);
    }
    
  } catch (error) {
    console.error('Import error:', error);
    toast.error(error.message || 'Failed to import tasks', 3000);
  } finally {
    // Reset file input
    importFileInput.value = '';
  }
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
      updateStatistics();
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
    
    // Re-render tasks and update statistics
    renderTasks();
    updateStatistics();
    
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
      tasks[index].updatedAt = new Date().toISOString(); // Update timestamp
      
      renderTasks();
      updateStatistics();
      
      try {
        // Update via API
        const updatedTask = await api.updateTask(taskId, { status: newStatus });
        tasks[index] = updatedTask;
        
        // Update localStorage
        storage.saveTasks(tasks);
        
        // Show success toast with animation
        const statusText = newStatus === 'completed' ? 'completed' : 'marked as pending';
        const emoji = newStatus === 'completed' ? '🎉' : '⏳';
        toast.success(`${emoji} Task ${statusText}!`, 2000);
        
        // Update statistics again with actual data
        updateStatistics();
        
      } catch (error) {
        // Revert on error
        tasks[index].status = oldStatus;
        renderTasks();
        updateStatistics();
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
      toast.success('✏️ Task updated successfully!', 2000);
      
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
    
    // Remove from selection if selected
    bulkOperations.deselectTask(taskId);
    
    // Optimistic update - remove from UI immediately
    tasks = tasks.filter(t => t._id !== taskId);
    storage.saveTasks(tasks);
    renderTasks();
    updateStatistics();
    
    // Delete via API
    await api.deleteTask(taskId);
    
    // Show success toast
    toast.success('🗑️ Task deleted successfully', 2000);
    
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
      updateStatistics();
    } catch (reloadError) {
      console.error('Failed to reload tasks:', reloadError);
    }
  }
}

// Handle select all checkbox
function handleSelectAll(checked) {
  const filteredTasks = getFilteredTasks();
  
  if (checked) {
    // Select all visible tasks
    const taskIds = filteredTasks.map(t => t._id);
    bulkOperations.selectAll(taskIds);
    toast.info(`Selected ${taskIds.length} task${taskIds.length !== 1 ? 's' : ''}`, 1500);
  } else {
    // Deselect all
    bulkOperations.deselectAll();
  }
  
  // Re-render to update checkboxes
  renderTasks();
}

// Handle bulk complete operation
async function handleBulkComplete() {
  const validation = bulkOperations.validateBulkOperation('complete', tasks);
  
  if (!validation.isValid) {
    toast.warning(validation.message, 2000);
    return;
  }
  
  const selectedIds = bulkOperations.getSelectedTaskIds();
  const count = selectedIds.length;
  
  // Confirm action
  const confirmMsg = bulkOperations.getConfirmationMessage('complete', count);
  if (!confirm(confirmMsg)) {
    return;
  }
  
  try {
    // Show loading toast
    toast.info('Processing...', 1000);
    
    // Update tasks optimistically
    selectedIds.forEach(id => {
      const index = tasks.findIndex(t => t._id === id);
      if (index !== -1 && tasks[index].status !== 'completed') {
        tasks[index].status = 'completed';
        tasks[index].updatedAt = new Date().toISOString();
      }
    });
    
    renderTasks();
    updateStatistics();
    
    // Update via API
    const promises = selectedIds.map(id => {
      const task = tasks.find(t => t._id === id);
      if (task && task.status === 'completed') {
        return api.updateTask(id, { status: 'completed' });
      }
      return Promise.resolve(null);
    });
    
    await Promise.all(promises);
    
    // Update localStorage
    storage.saveTasks(tasks);
    
    // Clear selection
    bulkOperations.clearSelection();
    renderTasks();
    updateStatistics();
    
    toast.success(`✓ Marked ${count} task${count !== 1 ? 's' : ''} as completed!`, 2000);
    
  } catch (error) {
    console.error('Error in bulk complete:', error);
    toast.error('Failed to complete some tasks', 3000);
    
    // Reload to get correct state
    tasks = await api.getAllTasks();
    storage.saveTasks(tasks);
    renderTasks();
    updateStatistics();
  }
}

// Handle bulk pending operation
async function handleBulkPending() {
  const validation = bulkOperations.validateBulkOperation('pending', tasks);
  
  if (!validation.isValid) {
    toast.warning(validation.message, 2000);
    return;
  }
  
  const selectedIds = bulkOperations.getSelectedTaskIds();
  const count = selectedIds.length;
  
  // Confirm action
  const confirmMsg = bulkOperations.getConfirmationMessage('pending', count);
  if (!confirm(confirmMsg)) {
    return;
  }
  
  try {
    // Show loading toast
    toast.info('Processing...', 1000);
    
    // Update tasks optimistically
    selectedIds.forEach(id => {
      const index = tasks.findIndex(t => t._id === id);
      if (index !== -1 && tasks[index].status !== 'pending') {
        tasks[index].status = 'pending';
        tasks[index].updatedAt = new Date().toISOString();
      }
    });
    
    renderTasks();
    updateStatistics();
    
    // Update via API
    const promises = selectedIds.map(id => {
      const task = tasks.find(t => t._id === id);
      if (task && task.status === 'pending') {
        return api.updateTask(id, { status: 'pending' });
      }
      return Promise.resolve(null);
    });
    
    await Promise.all(promises);
    
    // Update localStorage
    storage.saveTasks(tasks);
    
    // Clear selection
    bulkOperations.clearSelection();
    renderTasks();
    updateStatistics();
    
    toast.success(`⏳ Marked ${count} task${count !== 1 ? 's' : ''} as pending!`, 2000);
    
  } catch (error) {
    console.error('Error in bulk pending:', error);
    toast.error('Failed to update some tasks', 3000);
    
    // Reload to get correct state
    tasks = await api.getAllTasks();
    storage.saveTasks(tasks);
    renderTasks();
    updateStatistics();
  }
}

// Handle bulk delete operation
async function handleBulkDelete() {
const selectedIds = bulkOperations.getSelectedTaskIds();
const count = selectedIds.length;
if (count === 0) {
toast.warning('Please select at least one task', 2000);
return;
}
// Confirm action
const confirmMsg = bulkOperations.getConfirmationMessage('delete', count);
if (!confirm(confirmMsg)) {
return;
}
try {
// Show loading toast
toast.info('Deleting...', 1000);
// Remove tasks optimistically
tasks = tasks.filter(t => !selectedIds.includes(t._id));
storage.saveTasks(tasks);

// Clear selection
bulkOperations.clearSelection();

renderTasks();
updateStatistics();

// Delete via API
const promises = selectedIds.map(id => api.deleteTask(id));
await Promise.all(promises);

toast.success(`🗑️ Deleted ${count} task${count !== 1 ? 's' : ''} successfully!`, 2000);
} catch (error) {
console.error('Error in bulk delete:', error);
toast.error('Failed to delete some tasks', 3000);
// Reload to get correct state
tasks = await api.getAllTasks();
storage.saveTasks(tasks);
renderTasks();
updateStatistics();
}
}
// Get filtered tasks based on current filter, search, and sort
function getFilteredTasks() {
let filteredTasks = tasks;
// Apply filter
if (currentFilter === 'pending') {
filteredTasks = filteredTasks.filter(t => t.status === 'pending');
} else if (currentFilter === 'completed') {
filteredTasks = filteredTasks.filter(t => t.status === 'completed');
}
// Apply search
if (search.isSearchActive(currentSearchQuery)) {
filteredTasks = search.searchTasks(filteredTasks, currentSearchQuery);
}
// Apply sort
filteredTasks = sort.sortTasks(filteredTasks, currentSortBy);
return filteredTasks;
}
// Update statistics dashboard
function updateStatistics() {
const statistics = stats.calculateStats(tasks);
// Update statistics display with animation
animateNumber(statTotal, statistics.total);
animateNumber(statPending, statistics.pending);
animateNumber(statCompleted, statistics.completed);
animateNumber(statProgress, statistics.progress, '%');
// Update progress bar
if (progressBar) {
progressBar.style.width = `${statistics.progress}%`;
}
// Update progress color based on percentage
if (statProgress) {
statProgress.className = `text-2xl sm:text-3xl font-bold ${stats.getProgressColor(statistics.progress)}`;
}
}
// Animate number changes
function animateNumber(element, targetValue, suffix = '') {
if (!element) return;
const currentValue = parseInt(element.textContent) || 0;
if (currentValue === targetValue) return;
const duration = 500; // Animation duration in ms
const steps = 20;
const stepValue = (targetValue - currentValue) / steps;
const stepDuration = duration / steps;
let currentStep = 0;
const timer = setInterval(() => {
currentStep++;
const newValue = Math.round(currentValue + (stepValue * currentStep));
if (currentStep >= steps) {
  element.textContent = targetValue + suffix;
  clearInterval(timer);
} else {
  element.textContent = newValue + suffix;
}
}, stepDuration);
}
// Render all tasks based on current filter, search, and sort
function renderTasks() {
// Get filtered, searched, and sorted tasks
const filteredTasks = getFilteredTasks();
// Update task count
updateTaskCount(filteredTasks.length, tasks.length);
// Update search results info
updateSearchResultsInfo();
// Show empty state if no tasks
if (filteredTasks.length === 0) {
tasksContainer.innerHTML = '';
emptyState.classList.remove('hidden');
// Update empty state message based on filter and search
updateEmptyStateMessage();

// Update bulk operations UI
bulkOperations.updateSelectionUI();

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
// Update bulk operations UI
bulkOperations.updateSelectionUI();
}
// Update empty state message based on current filter and search
function updateEmptyStateMessage() {
const emptyStateContent = emptyState.querySelector('p');
if (search.isSearchActive(currentSearchQuery)) {
emptyStateContent.textContent = `No tasks found for "${currentSearchQuery}"`;
} else if (currentFilter === 'all') {
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
  const isSelected = bulkOperations.isSelected(task._id);
  
  // Create task container
  const taskDiv = document.createElement('div');
  taskDiv.className = `flex items-center gap-3 p-4 border rounded-lg transition-all duration-200 ${
    isCompleted
      ? 'bg-green-50 border-green-200'
      : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
  } ${isSelected ? 'ring-2 ring-indigo-500' : ''}`;
  taskDiv.dataset.taskId = task._id;
  
  // Selection checkbox (for bulk operations)
  const selectCheckbox = document.createElement('input');
  selectCheckbox.type = 'checkbox';
  selectCheckbox.checked = isSelected;
  selectCheckbox.className = 'task-select-checkbox w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer';
  selectCheckbox.addEventListener('change', (e) => {
    e.stopPropagation();
    bulkOperations.toggleTaskSelection(task._id);
    renderTasks();
  });
  
  // Status checkbox
  const statusCheckbox = document.createElement('input');
  statusCheckbox.type = 'checkbox';
  statusCheckbox.checked = isCompleted;
  statusCheckbox.className = 'w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer';
  statusCheckbox.addEventListener('change', () => handleToggleStatus(task._id, task.status));
  
  // Task title with search highlighting
  const titleDiv = document.createElement('div');
  titleDiv.className = `task-title flex-1 ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800 font-medium'}`;
  // Apply search highlighting if search is active
  if (search.isSearchActive(currentSearchQuery)) {
    titleDiv.innerHTML = search.highlightSearchTerm(task.title, currentSearchQuery);
  } else {
    titleDiv.textContent = task.title;
  }
  
  // Status badge
  const statusBadge = document.createElement('span');
  statusBadge.className = `px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${isCompleted ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`;
  statusBadge.textContent = isCompleted ? '✓ Completed' : '⏳ Pending';
  
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
  taskDiv.appendChild(selectCheckbox);
  taskDiv.appendChild(statusCheckbox);
  taskDiv.appendChild(titleDiv);
  taskDiv.appendChild(statusBadge);
  taskDiv.appendChild(editBtn);
  taskDiv.appendChild(deleteBtn);
  return taskDiv;
}
// Update task count display
function updateTaskCount(filteredCount, totalCount) {
let countText = '';
if (search.isSearchActive(currentSearchQuery)) {
countText = `${filteredCount} of ${totalCount} task${totalCount !== 1 ? 's' : ''}`;
} else if (currentFilter === 'all') {
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
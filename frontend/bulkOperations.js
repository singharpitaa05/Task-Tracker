// BULK OPERATION

// frontend/bulkOperations.js

// Bulk operations utility for managing multiple tasks
const bulkOperations = {
  
  // Track selected tasks
  selectedTasks: new Set(),
  
  // Add task to selection
  selectTask(taskId) {
    this.selectedTasks.add(taskId);
    this.updateSelectionUI();
  },
  
  // Remove task from selection
  deselectTask(taskId) {
    this.selectedTasks.delete(taskId);
    this.updateSelectionUI();
  },
  
  // Toggle task selection
  toggleTaskSelection(taskId) {
    if (this.selectedTasks.has(taskId)) {
      this.deselectTask(taskId);
    } else {
      this.selectTask(taskId);
    }
  },
  
  // Select all visible tasks
  selectAll(taskIds) {
    taskIds.forEach(id => this.selectedTasks.add(id));
    this.updateSelectionUI();
  },
  
  // Deselect all tasks
  deselectAll() {
    this.selectedTasks.clear();
    this.updateSelectionUI();
  },
  
  // Check if task is selected
  isSelected(taskId) {
    return this.selectedTasks.has(taskId);
  },
  
  // Get count of selected tasks
  getSelectedCount() {
    return this.selectedTasks.size;
  },
  
  // Get array of selected task IDs
  getSelectedTaskIds() {
    return Array.from(this.selectedTasks);
  },
  
  // Clear selection
  clearSelection() {
    this.selectedTasks.clear();
    this.updateSelectionUI();
  },
  
  // Update UI based on selection state
  updateSelectionUI() {
    const count = this.getSelectedCount();
    const container = document.getElementById('bulkActionsContainer');
    const selectedCountEl = document.getElementById('selectedCount');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    
    if (container) {
      if (count > 0) {
        container.classList.remove('hidden');
      } else {
        container.classList.add('hidden');
      }
    }
    
    if (selectedCountEl) {
      selectedCountEl.textContent = count;
    }
    
    // Update select all checkbox state
    if (selectAllCheckbox) {
      const allTaskCheckboxes = document.querySelectorAll('.task-select-checkbox');
      const visibleCount = allTaskCheckboxes.length;
      
      if (visibleCount === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
      } else if (count === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
      } else if (count === visibleCount) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
      } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
      }
    }
  },
  
  // Validate bulk operation
  validateBulkOperation(operation, tasks) {
    const selectedCount = this.getSelectedCount();
    
    if (selectedCount === 0) {
      return {
        isValid: false,
        message: 'Please select at least one task'
      };
    }
    
    // Check if operation is valid based on task statuses
    if (operation === 'complete') {
      const selectedTasksData = tasks.filter(t => this.isSelected(t._id));
      const alreadyCompleted = selectedTasksData.filter(t => t.status === 'completed').length;
      
      if (alreadyCompleted === selectedCount) {
        return {
          isValid: false,
          message: 'All selected tasks are already completed'
        };
      }
    }
    
    if (operation === 'pending') {
      const selectedTasksData = tasks.filter(t => this.isSelected(t._id));
      const alreadyPending = selectedTasksData.filter(t => t.status === 'pending').length;
      
      if (alreadyPending === selectedCount) {
        return {
          isValid: false,
          message: 'All selected tasks are already pending'
        };
      }
    }
    
    return {
      isValid: true,
      message: ''
    };
  },
  
  // Get confirmation message for bulk operations
  getConfirmationMessage(operation, count) {
    const taskWord = count === 1 ? 'task' : 'tasks';
    
    switch (operation) {
      case 'complete':
        return `Mark ${count} ${taskWord} as completed?`;
      case 'pending':
        return `Mark ${count} ${taskWord} as pending?`;
      case 'delete':
        return `Are you sure you want to delete ${count} ${taskWord}? This action cannot be undone.`;
      default:
        return `Perform bulk operation on ${count} ${taskWord}?`;
    }
  }
};

export default bulkOperations;
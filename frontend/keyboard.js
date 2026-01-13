// KEYBOARD SHORTCUTS

// frontend/keyboard.js

// Keyboard shortcuts utility for quick actions
const keyboard = {
  
  // Available keyboard shortcuts
  shortcuts: [
    { key: 'n', ctrl: true, description: 'Add new task', action: 'newTask' },
    { key: 's', ctrl: true, description: 'Focus search', action: 'search' },
    { key: 'a', ctrl: true, description: 'Select all tasks', action: 'selectAll' },
    { key: 'Delete', ctrl: false, description: 'Delete selected tasks', action: 'deleteSelected' },
    { key: 'Escape', ctrl: false, description: 'Clear selection/search', action: 'escape' },
    { key: '1', alt: true, description: 'Show all tasks', action: 'filterAll' },
    { key: '2', alt: true, description: 'Show pending tasks', action: 'filterPending' },
    { key: '3', alt: true, description: 'Show completed tasks', action: 'filterCompleted' },
    { key: 'e', ctrl: true, description: 'Export tasks', action: 'export' },
    { key: '/', ctrl: false, description: 'Focus search', action: 'search' }
  ],
  
  // Callback functions for actions
  callbacks: {},
  
  // Initialize keyboard shortcuts
  init(callbacks) {
    this.callbacks = callbacks;
    
    document.addEventListener('keydown', (e) => {
      this.handleKeyPress(e);
    });
  },
  
  // Handle key press events
  handleKeyPress(e) {
    // Don't trigger shortcuts when typing in input fields (except for specific keys)
    const isInputFocused = ['INPUT', 'TEXTAREA'].includes(e.target.tagName);
    
    // Allow Escape key even in input fields
    if (e.key === 'Escape') {
      this.executeAction('escape');
      e.preventDefault();
      return;
    }
    
    // Allow '/' for search even outside input
    if (e.key === '/' && !isInputFocused) {
      this.executeAction('search');
      e.preventDefault();
      return;
    }
    
    // Don't process other shortcuts when in input field
    if (isInputFocused) {
      return;
    }
    
    // Check for Ctrl+N (new task)
    if (e.ctrlKey && e.key.toLowerCase() === 'n') {
      this.executeAction('newTask');
      e.preventDefault();
      return;
    }
    
    // Check for Ctrl+S (search)
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
      this.executeAction('search');
      e.preventDefault();
      return;
    }
    
    // Check for Ctrl+A (select all)
    if (e.ctrlKey && e.key.toLowerCase() === 'a') {
      this.executeAction('selectAll');
      e.preventDefault();
      return;
    }
    
    // Check for Ctrl+E (export)
    if (e.ctrlKey && e.key.toLowerCase() === 'e') {
      this.executeAction('export');
      e.preventDefault();
      return;
    }
    
    // Check for Delete key (delete selected)
    if (e.key === 'Delete' && !isInputFocused) {
      this.executeAction('deleteSelected');
      e.preventDefault();
      return;
    }
    
    // Check for Alt+Number (filters)
    if (e.altKey && ['1', '2', '3'].includes(e.key)) {
      if (e.key === '1') this.executeAction('filterAll');
      if (e.key === '2') this.executeAction('filterPending');
      if (e.key === '3') this.executeAction('filterCompleted');
      e.preventDefault();
      return;
    }
  },
  
  // Execute action by name
  executeAction(action) {
    if (this.callbacks[action] && typeof this.callbacks[action] === 'function') {
      this.callbacks[action]();
    }
  },
  
  // Get formatted shortcut string
  getShortcutString(shortcut) {
    let parts = [];
    
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.alt) parts.push('Alt');
    if (shortcut.shift) parts.push('Shift');
    
    parts.push(shortcut.key.toUpperCase());
    
    return parts.join(' + ');
  },
  
  // Generate keyboard shortcuts help HTML
  generateHelpHTML() {
    let html = '<div class="space-y-2">';
    
    this.shortcuts.forEach(shortcut => {
      const shortcutStr = this.getShortcutString(shortcut);
      html += `
        <div class="flex justify-between items-center py-2 border-b border-gray-200">
          <span class="text-gray-700">${shortcut.description}</span>
          <kbd class="px-3 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">${shortcutStr}</kbd>
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  },
  
  // Show keyboard shortcuts help modal
  showHelp() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">⌨️ Keyboard Shortcuts</h2>
          <button class="close-help text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
        </div>
        <div class="p-6">
          ${this.generateHelpHTML()}
        </div>
        <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 text-center">
          <p class="text-sm text-gray-600">Press <kbd class="px-2 py-1 text-xs font-semibold bg-gray-200 rounded">ESC</kbd> to close</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Close on close button click
    modal.querySelector('.close-help').addEventListener('click', () => {
      modal.remove();
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
  }
};

export default keyboard;
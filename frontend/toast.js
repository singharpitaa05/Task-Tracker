// TOAST NOTIFICATION

// frontend/toast.js

// Toast notification utility for user feedback
class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  // Initialize toast container
  init() {
    // Check if container already exists
    if (document.getElementById('toast-container')) {
      this.container = document.getElementById('toast-container');
      return;
    }

    // Create toast container
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
    document.body.appendChild(this.container);
  }

  // Show a toast notification
  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    
    // Define colors based on type
    const typeStyles = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-indigo-500 text-white'
    };

    // Define icons based on type
    const typeIcons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.className = `${typeStyles[type] || typeStyles.info} px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-72 transform transition-all duration-300 translate-x-full opacity-0`;
    
    toast.innerHTML = `
      <span class="text-xl font-bold">${typeIcons[type] || typeIcons.info}</span>
      <span class="flex-1">${message}</span>
      <button class="text-white hover:text-gray-200 font-bold text-xl" onclick="this.parentElement.remove()">×</button>
    `;

    this.container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
    }, 10);

    // Auto remove after duration
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Shorthand methods
  success(message, duration) {
    this.show(message, 'success', duration);
  }

  error(message, duration) {
    this.show(message, 'error', duration);
  }

  warning(message, duration) {
    this.show(message, 'warning', duration);
  }

  info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// Create and export singleton instance
const toast = new Toast();
export default toast;
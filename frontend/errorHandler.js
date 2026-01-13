// ERROR HANDLER FUNCTION

// frontend/errorHandler.js

// Error handling utility for graceful error recovery
const errorHandler = {
  
  // Error types
  errorTypes: {
    NETWORK: 'network',
    VALIDATION: 'validation',
    SERVER: 'server',
    STORAGE: 'storage',
    UNKNOWN: 'unknown'
  },
  
  // Error log
  errorLog: [],
  
  // Maximum error log size
  maxLogSize: 50,
  
  // Log error
  logError(error, context = {}) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      message: error.message || 'Unknown error',
      type: this.classifyError(error),
      context: context,
      stack: error.stack || 'No stack trace available'
    };
    
    this.errorLog.push(errorEntry);
    
    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }
    
    // Log to console in development
    console.error('[Error Handler]', errorEntry);
    
    return errorEntry;
  },
  
  // Classify error type
  classifyError(error) {
    if (!error) return this.errorTypes.UNKNOWN;
    
    const message = error.message?.toLowerCase() || '';
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return this.errorTypes.NETWORK;
    }
    
    if (message.includes('validation') || message.includes('invalid')) {
      return this.errorTypes.VALIDATION;
    }
    
    if (error.status >= 500 || message.includes('server')) {
      return this.errorTypes.SERVER;
    }
    
    if (message.includes('storage') || message.includes('quota')) {
      return this.errorTypes.STORAGE;
    }
    
    return this.errorTypes.UNKNOWN;
  },
  
  // Get user-friendly error message
  getUserMessage(error) {
    const type = this.classifyError(error);
    
    const messages = {
      [this.errorTypes.NETWORK]: '🌐 Network error. Please check your connection and try again.',
      [this.errorTypes.VALIDATION]: '⚠️ Invalid input. Please check your data and try again.',
      [this.errorTypes.SERVER]: '🔧 Server error. Our team has been notified. Please try again later.',
      [this.errorTypes.STORAGE]: '💾 Storage error. Your browser storage might be full.',
      [this.errorTypes.UNKNOWN]: '❌ An unexpected error occurred. Please try again.'
    };
    
    return messages[type] || messages[this.errorTypes.UNKNOWN];
  },
  
  // Handle error with recovery strategy
  async handleError(error, context = {}, recoveryStrategies = []) {
    // Log the error
    const errorEntry = this.logError(error, context);
    
    // Try recovery strategies in order
    for (const strategy of recoveryStrategies) {
      try {
        const result = await strategy(error, context);
        if (result.success) {
          console.log('[Error Handler] Recovered using strategy:', strategy.name);
          return { success: true, result: result.data };
        }
      } catch (recoveryError) {
        console.warn('[Error Handler] Recovery strategy failed:', strategy.name, recoveryError);
      }
    }
    
    // No recovery possible
    return { 
      success: false, 
      error: errorEntry,
      userMessage: this.getUserMessage(error)
    };
  },
  
  // Common recovery strategies
  recoveryStrategies: {
    // Retry with exponential backoff
    retryWithBackoff: (maxRetries = 3, initialDelay = 1000) => {
      return async (error, context) => {
        const { operation } = context;
        
        if (!operation) {
          return { success: false };
        }
        
        for (let i = 0; i < maxRetries; i++) {
          try {
            const delay = initialDelay * Math.pow(2, i);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const result = await operation();
            return { success: true, data: result };
          } catch (retryError) {
            if (i === maxRetries - 1) {
              return { success: false };
            }
          }
        }
        
        return { success: false };
      };
    },
    
    // Fallback to cached data
    useCachedData: () => {
      return async (error, context) => {
        const { cacheKey, storage } = context;
        
        if (!cacheKey || !storage) {
          return { success: false };
        }
        
        try {
          const cachedData = storage.getTasks();
          if (cachedData && cachedData.length > 0) {
            return { success: true, data: cachedData };
          }
        } catch (cacheError) {
          console.warn('[Error Handler] Cache fallback failed:', cacheError);
        }
        
        return { success: false };
      };
    },
    
    // Clear corrupted storage
    clearCorruptedStorage: () => {
      return async (error, context) => {
        const { storage } = context;
        
        if (!storage) {
          return { success: false };
        }
        
        try {
          storage.clearTasks();
          return { success: true, data: [] };
        } catch (clearError) {
          return { success: false };
        }
      };
    }
  },
  
  // Create error boundary for functions
  createErrorBoundary(fn, fallback = null) {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        this.logError(error, { function: fn.name, args });
        
        if (fallback) {
          return fallback(error);
        }
        
        throw error;
      }
    };
  },
  
  // Display error to user
  displayError(error, container) {
    const userMessage = this.getUserMessage(error);
    
    if (container) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4 animate-fade-in';
      errorDiv.innerHTML = `
        <div class="flex items-start">
          <div class="shrink-0">
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm text-red-700">${userMessage}</p>
          </div>
          <button class="ml-auto shrink-0 text-red-500 hover:text-red-700" onclick="this.parentElement.parentElement.remove()">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      `;
      
      container.insertBefore(errorDiv, container.firstChild);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        errorDiv.remove();
      }, 10000);
    }
  },
  
  // Get error report
  getErrorReport() {
    return {
      total: this.errorLog.length,
      byType: this.errorLog.reduce((acc, error) => {
        acc[error.type] = (acc[error.type] || 0) + 1;
        return acc;
      }, {}),
      recentErrors: this.errorLog.slice(-10),
      oldestError: this.errorLog[0],
      newestError: this.errorLog[this.errorLog.length - 1]
    };
  },
  
  // Clear error log
  clearErrorLog() {
    this.errorLog = [];
  },
  
  // Export error log
  exportErrorLog() {
    const report = this.getErrorReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `error-log-${new Date().toISOString()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
};

export default errorHandler;
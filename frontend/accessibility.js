// ACCESSIBILITY FUNCTIONS

// frontend/accessibility.js

// Accessibility utility for WCAG compliance
const accessibility = {
  
  // Add ARIA labels to elements
  addAriaLabels() {
    // Add aria-label to buttons without text
    document.querySelectorAll('button').forEach(btn => {
      if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
        const title = btn.getAttribute('title');
        if (title) {
          btn.setAttribute('aria-label', title);
        }
      }
    });
  },
  
  // Add keyboard navigation support
  setupKeyboardNavigation() {
    // Make task items focusable
    document.querySelectorAll('[data-task-id]').forEach((task, index) => {
      task.setAttribute('tabindex', '0');
      task.setAttribute('role', 'article');
      task.setAttribute('aria-label', `Task ${index + 1}`);
      
      // Add keyboard support for task selection
      task.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const checkbox = task.querySelector('.task-select-checkbox');
          if (checkbox) {
            checkbox.click();
          }
        }
      });
    });
  },
  
  // Add focus visible styles
  addFocusVisibleStyles() {
    const style = document.createElement('style');
    style.textContent = `
      *:focus-visible {
        outline: 2px solid #6366f1;
        outline-offset: 2px;
        border-radius: 0.25rem;
      }
      
      button:focus-visible,
      input:focus-visible,
      select:focus-visible {
        outline: 2px solid #6366f1;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  },
  
  // Announce screen reader messages
  announceToScreenReader(message, priority = 'polite') {
    // Create or get existing live region
    let liveRegion = document.getElementById('sr-live-region');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'sr-live-region';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveRegion);
      
      // Add CSS for screen reader only
      const style = document.createElement('style');
      style.textContent = `
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Clear and set new message
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 100);
  },
  
  // Check color contrast
  checkColorContrast(foreground, background) {
    // Simple contrast checker (actual implementation would use WCAG formula)
    return {
      ratio: 4.5, // Placeholder
      passes: true
    };
  },
  
  // Add skip to main content link
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main content
    const main = document.querySelector('main');
    if (main && !main.id) {
      main.id = 'main-content';
    }
  },
  
  // Ensure form labels
  ensureFormLabels() {
    document.querySelectorAll('input, select, textarea').forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label && !input.getAttribute('aria-label')) {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder) {
          input.setAttribute('aria-label', placeholder);
        }
      }
    });
  },
  
  // Add loading state announcements
  announceLoadingState(isLoading, message) {
    if (isLoading) {
      this.announceToScreenReader(`Loading: ${message}`, 'polite');
    } else {
      this.announceToScreenReader(`Finished loading: ${message}`, 'polite');
    }
  },
  
  // Add error state announcements
  announceError(errorMessage) {
    this.announceToScreenReader(`Error: ${errorMessage}`, 'assertive');
  },
  
  // Add success state announcements
  announceSuccess(successMessage) {
    this.announceToScreenReader(`Success: ${successMessage}`, 'polite');
  },
  
  // Initialize all accessibility features
  init() {
    this.addFocusVisibleStyles();
    this.addSkipLink();
    this.ensureFormLabels();
    
    // Re-apply on content changes
    const observer = new MutationObserver(() => {
      this.addAriaLabels();
      this.setupKeyboardNavigation();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
};

export default accessibility;
// PERFORMANCE FUNCTIONS

// frontend/performance.js

// Performance optimization utility
const performance = {
  
  // Debounce function - delays execution until after wait time has elapsed
  debounce(func, wait = 300) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function - limits execution to once per wait time
  throttle(func, wait = 300) {
    let inThrottle;
    
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, wait);
      }
    };
  },
  
  // Lazy load images
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  },
  
  // Request animation frame wrapper
  requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) {
      return window.requestAnimationFrame(callback);
    }
    return setTimeout(callback, 16); // ~60fps fallback
  },
  
  // Cancel animation frame wrapper
  cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) {
      return window.cancelAnimationFrame(id);
    }
    return clearTimeout(id);
  },
  
  // Batch DOM updates
  batchDOMUpdates(updates) {
    return new Promise(resolve => {
      this.requestAnimationFrame(() => {
        updates();
        resolve();
      });
    });
  },
  
  // Measure performance
  measurePerformance(label, callback) {
    const startTime = performance.now ? performance.now() : Date.now();
    
    const result = callback();
    
    const endTime = performance.now ? performance.now() : Date.now();
    const duration = endTime - startTime;
    
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    
    return result;
  },
  
  // Memory optimization - cleanup old event listeners
  cleanupEventListeners(element) {
    if (element) {
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
      return clone;
    }
  },
  
  // Virtual scrolling for large lists
  virtualScroll(container, items, renderItem, itemHeight = 60) {
    const visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
    let scrollTop = 0;
    let startIndex = 0;
    
    const render = () => {
      startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = Math.min(startIndex + visibleCount, items.length);
      
      container.innerHTML = '';
      container.style.paddingTop = `${startIndex * itemHeight}px`;
      container.style.paddingBottom = `${(items.length - endIndex) * itemHeight}px`;
      
      for (let i = startIndex; i < endIndex; i++) {
        const element = renderItem(items[i], i);
        container.appendChild(element);
      }
    };
    
    const handleScroll = this.throttle(() => {
      scrollTop = container.scrollTop;
      render();
    }, 16);
    
    container.addEventListener('scroll', handleScroll);
    render();
    
    return {
      update: (newItems) => {
        items = newItems;
        render();
      },
      destroy: () => {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  },
  
  // Optimize animations
  optimizeAnimation(element, properties, duration = 300) {
    return new Promise(resolve => {
      element.style.transition = `all ${duration}ms ease`;
      
      Object.keys(properties).forEach(prop => {
        element.style[prop] = properties[prop];
      });
      
      setTimeout(() => {
        element.style.transition = '';
        resolve();
      }, duration);
    });
  },
  
  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Smooth scroll to element
  smoothScrollTo(element, offset = 0) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  },
  
  // Preload critical resources
  preloadResources(resources) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.type;
      document.head.appendChild(link);
    });
  },
  
  // Local cache with expiration
  cache: {
    set(key, value, expirationMinutes = 60) {
      const item = {
        value: value,
        expiration: Date.now() + (expirationMinutes * 60 * 1000)
      };
      try {
        localStorage.setItem(`cache_${key}`, JSON.stringify(item));
      } catch (e) {
        console.warn('Cache storage failed:', e);
      }
    },
    
    get(key) {
      try {
        const itemStr = localStorage.getItem(`cache_${key}`);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        
        if (Date.now() > item.expiration) {
          localStorage.removeItem(`cache_${key}`);
          return null;
        }
        
        return item.value;
      } catch (e) {
        console.warn('Cache retrieval failed:', e);
        return null;
      }
    },
    
    clear(key) {
      if (key) {
        localStorage.removeItem(`cache_${key}`);
      } else {
        // Clear all cache items
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('cache_')) {
            localStorage.removeItem(k);
          }
        });
      }
    }
  }
};

export default performance;
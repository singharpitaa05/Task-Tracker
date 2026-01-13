// SEARCH FUNCTIONALITY

// frontend/search.js

// Search utility for filtering tasks
const search = {
  
  // Search tasks by query
  searchTasks(tasks, query) {
    if (!query || query.trim().length === 0) {
      return tasks;
    }
    
    const searchTerm = query.trim().toLowerCase();
    
    return tasks.filter(task => {
      // Search in task title
      const titleMatch = task.title.toLowerCase().includes(searchTerm);
      
      // Search in task status
      const statusMatch = task.status.toLowerCase().includes(searchTerm);
      
      // Search by creation date (if query is a date-like string)
      let dateMatch = false;
      if (task.createdAt) {
        const createdDate = new Date(task.createdAt).toLocaleDateString().toLowerCase();
        dateMatch = createdDate.includes(searchTerm);
      }
      
      return titleMatch || statusMatch || dateMatch;
    });
  },
  
  // Highlight search term in text
  highlightSearchTerm(text, query) {
    if (!query || query.trim().length === 0) {
      return text;
    }
    
    const searchTerm = query.trim();
    const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
    
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  },
  
  // Escape special regex characters
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },
  
  // Get search suggestions based on existing tasks
  getSearchSuggestions(tasks, query) {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    const searchTerm = query.trim().toLowerCase();
    const suggestions = new Set();
    
    // Get matching task titles
    tasks.forEach(task => {
      if (task.title.toLowerCase().includes(searchTerm)) {
        suggestions.add(task.title);
      }
    });
    
    // Limit to 5 suggestions
    return Array.from(suggestions).slice(0, 5);
  },
  
  // Advanced search with multiple criteria
  advancedSearch(tasks, criteria) {
    let results = tasks;
    
    // Filter by query
    if (criteria.query) {
      results = this.searchTasks(results, criteria.query);
    }
    
    // Filter by status
    if (criteria.status && criteria.status !== 'all') {
      results = results.filter(t => t.status === criteria.status);
    }
    
    // Filter by date range
    if (criteria.dateFrom) {
      const fromDate = new Date(criteria.dateFrom);
      results = results.filter(t => new Date(t.createdAt) >= fromDate);
    }
    
    if (criteria.dateTo) {
      const toDate = new Date(criteria.dateTo);
      toDate.setHours(23, 59, 59, 999);
      results = results.filter(t => new Date(t.createdAt) <= toDate);
    }
    
    return results;
  },
  
  // Check if search is active
  isSearchActive(query) {
    return query && query.trim().length > 0;
  }
};

export default search;
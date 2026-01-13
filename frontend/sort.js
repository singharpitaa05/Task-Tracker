// SORT FUNCTION

// frontend/sort.js

// Sorting utility for organizing tasks
const sort = {
  
  // Available sort options
  sortOptions: [
    { value: 'newest', label: 'Newest First', icon: '🆕' },
    { value: 'oldest', label: 'Oldest First', icon: '📅' },
    { value: 'a-z', label: 'A to Z', icon: '🔤' },
    { value: 'z-a', label: 'Z to A', icon: '🔡' },
    { value: 'completed', label: 'Completed First', icon: '✅' },
    { value: 'pending', label: 'Pending First', icon: '⏳' }
  ],
  
  // Sort tasks based on selected option
  sortTasks(tasks, sortBy) {
    const tasksCopy = [...tasks];
    
    switch (sortBy) {
      case 'newest':
        return tasksCopy.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      
      case 'oldest':
        return tasksCopy.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      
      case 'a-z':
        return tasksCopy.sort((a, b) => {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        });
      
      case 'z-a':
        return tasksCopy.sort((a, b) => {
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        });
      
      case 'completed':
        return tasksCopy.sort((a, b) => {
          if (a.status === 'completed' && b.status !== 'completed') return -1;
          if (a.status !== 'completed' && b.status === 'completed') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      
      case 'pending':
        return tasksCopy.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      
      default:
        return tasksCopy;
    }
  },
  
  // Get sort option label
  getSortLabel(sortBy) {
    const option = this.sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort By';
  },
  
  // Get sort option icon
  getSortIcon(sortBy) {
    const option = this.sortOptions.find(opt => opt.value === sortBy);
    return option ? option.icon : '⬇️';
  },
  
  // Sort by multiple criteria
  multiSort(tasks, criteria) {
    return [...tasks].sort((a, b) => {
      for (const criterion of criteria) {
        const { field, order } = criterion;
        let comparison = 0;
        
        if (field === 'title') {
          comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        } else if (field === 'status') {
          comparison = a.status.localeCompare(b.status);
        } else if (field === 'createdAt') {
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
        } else if (field === 'updatedAt') {
          comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
        }
        
        if (comparison !== 0) {
          return order === 'desc' ? -comparison : comparison;
        }
      }
      return 0;
    });
  }
};

export default sort;
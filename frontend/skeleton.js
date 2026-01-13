// SKELETON FUNCTIONS

// frontend/skeleton.js

// Skeleton loading utility for smooth loading states
const skeleton = {
  
  // Create task skeleton
  createTaskSkeleton() {
    const skeletonDiv = document.createElement('div');
    skeletonDiv.className = 'flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-white animate-pulse';
    
    skeletonDiv.innerHTML = `
      <!-- Selection checkbox skeleton -->
      <div class="w-4 h-4 bg-gray-200 rounded"></div>
      
      <!-- Status checkbox skeleton -->
      <div class="w-5 h-5 bg-gray-200 rounded"></div>
      
      <!-- Title skeleton -->
      <div class="flex-1">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      
      <!-- Status badge skeleton -->
      <div class="w-20 h-6 bg-gray-200 rounded-full"></div>
      
      <!-- Edit button skeleton -->
      <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
      
      <!-- Delete button skeleton -->
      <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
    `;
    
    return skeletonDiv;
  },
  
  // Create statistics card skeleton
  createStatCardSkeleton() {
    const skeletonDiv = document.createElement('div');
    skeletonDiv.className = 'bg-white rounded-xl shadow-md p-5 border-l-4 border-gray-300 animate-pulse';
    
    skeletonDiv.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="h-3 bg-gray-200 rounded w-20"></div>
        <div class="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
      <div class="h-8 bg-gray-200 rounded w-12 mb-3"></div>
      <div class="h-2 bg-gray-200 rounded-full"></div>
    `;
    
    return skeletonDiv;
  },
  
  // Show task list skeleton
  showTaskListSkeleton(container, count = 5) {
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const skeleton = this.createTaskSkeleton();
      container.appendChild(skeleton);
      
      // Add spacing
      if (i < count - 1) {
        const spacer = document.createElement('div');
        spacer.className = 'h-3';
        container.appendChild(spacer);
      }
    }
  },
  
  // Show statistics skeleton
  showStatisticsSkeleton(container) {
    container.innerHTML = '';
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6';
    
    for (let i = 0; i < 4; i++) {
      const skeleton = this.createStatCardSkeleton();
      container.appendChild(skeleton);
    }
  },
  
  // Create shimmer effect
  addShimmerEffect(element) {
    element.classList.add('relative', 'overflow-hidden');
    
    const shimmer = document.createElement('div');
    shimmer.className = 'absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent opacity-50';
    
    element.appendChild(shimmer);
  }
};

export default skeleton;
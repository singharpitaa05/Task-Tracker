// STATISTICS MODULE

// frontend/stats.js

// Statistics utility for task analytics
const stats = {
  
  // Calculate all statistics from tasks array
  calculateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      pending,
      progress
    };
  },
  
  // Get tasks created today
  getTasksCreatedToday(tasks) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  },
  
  // Get tasks completed today
  getTasksCompletedToday(tasks) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (task.status !== 'completed' || !task.updatedAt) return false;
      
      const completedDate = new Date(task.updatedAt);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === today.getTime();
    });
  },
  
  // Calculate productivity score based on completion rate and recency
  getProductivityScore(tasks) {
    if (tasks.length === 0) return 0;
    
    const stats = this.calculateStats(tasks);
    const todayCompleted = this.getTasksCompletedToday(tasks).length;
    
    // Base score is completion rate
    let score = stats.progress;
    
    // Bonus for completing tasks today
    if (todayCompleted > 0) {
      score = Math.min(100, score + (todayCompleted * 5));
    }
    
    return Math.round(score);
  },
  
  // Get task completion trend (increasing, decreasing, stable)
  getCompletionTrend(tasks) {
    const lastWeekTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return taskDate >= weekAgo;
    });
    
    if (lastWeekTasks.length === 0) return 'stable';
    
    const completedLastWeek = lastWeekTasks.filter(t => t.status === 'completed').length;
    const completionRate = (completedLastWeek / lastWeekTasks.length) * 100;
    
    if (completionRate >= 70) return 'increasing';
    if (completionRate <= 30) return 'decreasing';
    return 'stable';
  },
  
  // Format percentage with color coding
  getProgressColor(progress) {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-yellow-600';
    if (progress >= 25) return 'text-orange-600';
    return 'text-red-600';
  },
  
  // Get motivational message based on progress
  getMotivationalMessage(progress, pending, completed) {
    if (progress === 100 && completed > 0) {
      return "🎉 Perfect! All tasks completed!";
    }
    if (progress >= 80) {
      return "🔥 Almost there! Keep going!";
    }
    if (progress >= 50) {
      return "💪 Great progress! You're halfway!";
    }
    if (progress >= 25) {
      return "🚀 Good start! Keep it up!";
    }
    if (pending > 0) {
      return "📝 Let's get started on those tasks!";
    }
    return "✨ Ready to be productive?";
  }
};

export default stats;
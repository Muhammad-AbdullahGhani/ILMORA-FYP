// frontend/src/shared/services/userProgressService.js
/**
 * User Progress Tracking Service
 * Tracks user activity and completion status across the application
 */

const PROGRESS_KEY_PREFIX = 'userProgress_';

export const userProgressService = {
  /**
   * Get user progress from localStorage
   * @param {string} userId - User ID
   * @returns {Object} User progress data
   */
  getProgress(userId) {
    if (!userId) return this.getDefaultProgress();
    
    try {
      const stored = localStorage.getItem(`${PROGRESS_KEY_PREFIX}${userId}`);
      return stored ? JSON.parse(stored) : this.getDefaultProgress();
    } catch (error) {
      console.error('Failed to get user progress:', error);
      return this.getDefaultProgress();
    }
  },

  /**
   * Save user progress to localStorage
   * @param {string} userId - User ID
   * @param {Object} progress - Progress data
   */
  saveProgress(userId, progress) {
    if (!userId) return;
    
    try {
      const updatedProgress = {
        ...progress,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(`${PROGRESS_KEY_PREFIX}${userId}`, JSON.stringify(updatedProgress));
    } catch (error) {
      console.error('Failed to save user progress:', error);
    }
  },

  /**
   * Mark quiz as completed
   * @param {string} userId - User ID
   * @param {Object} quizData - Quiz completion data (sessionId, scores, etc.)
   */
  markQuizCompleted(userId, quizData = {}) {
    const progress = this.getProgress(userId);
    progress.quizCompleted = true;
    progress.quizCompletedAt = new Date().toISOString();
    progress.quizData = {
      sessionId: quizData.sessionId,
      hollandCode: quizData.hollandCode,
      completedAt: quizData.completedAt || new Date().toISOString()
    };
    this.saveProgress(userId, progress);
  },

  /**
   * Mark degree recommendations as viewed
   * @param {string} userId - User ID
   */
  markDegreeRecommendationsViewed(userId) {
    const progress = this.getProgress(userId);
    progress.degreeRecommendationsViewed = true;
    progress.degreeRecommendationsViewedAt = new Date().toISOString();
    this.saveProgress(userId, progress);
  },

  /**
   * Mark university insights as viewed
   * @param {string} userId - User ID
   */
  markUniversityInsightsViewed(userId) {
    const progress = this.getProgress(userId);
    progress.universityInsightsViewed = true;
    progress.universityInsightsViewedAt = new Date().toISOString();
    this.saveProgress(userId, progress);
  },

  /**
   * Check if user has completed the quiz
   * @param {string} userId - User ID
   * @returns {boolean}
   */
  hasCompletedQuiz(userId) {
    const progress = this.getProgress(userId);
    return progress.quizCompleted || false;
  },

  /**
   * Get quiz session ID if exists
   * @param {string} userId - User ID
   * @returns {string|null}
   */
  getQuizSessionId(userId) {
    const progress = this.getProgress(userId);
    return progress.quizData?.sessionId || null;
  },

  /**
   * Clear user progress (useful for testing or reset)
   * @param {string} userId - User ID
   */
  clearProgress(userId) {
    if (!userId) return;
    localStorage.removeItem(`${PROGRESS_KEY_PREFIX}${userId}`);
  },

  /**
   * Get default progress structure
   * @returns {Object}
   */
  getDefaultProgress() {
    return {
      quizCompleted: false,
      quizCompletedAt: null,
      quizData: null,
      degreeRecommendationsViewed: false,
      degreeRecommendationsViewedAt: null,
      universityInsightsViewed: false,
      universityInsightsViewedAt: null,
      lastUpdated: null,
      activityLog: []
    };
  },

  /**
   * Update multiple progress items at once
   * @param {string} userId - User ID
   * @param {Object} updates - Progress updates
   */
  updateProgress(userId, updates) {
    const progress = this.getProgress(userId);
    const updatedProgress = { ...progress, ...updates };
    this.saveProgress(userId, updatedProgress);
  },

  /**
   * Log a user activity
   * @param {string} userId - User ID
   * @param {Object} activity - Activity data { type, description, icon, color }
   */
  logActivity(userId, activity) {
    if (!userId) return;
    
    const progress = this.getProgress(userId);
    const activityLog = progress.activityLog || [];
    
    const newActivity = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: activity.type,
      description: activity.description,
      icon: activity.icon || 'Activity',
      color: activity.color || 'text-blue-500'
    };
    
    // Add to beginning of array and keep only last 20 activities
    activityLog.unshift(newActivity);
    progress.activityLog = activityLog.slice(0, 20);
    
    this.saveProgress(userId, progress);
  },

  /**
   * Get recent activities for a user
   * @param {string} userId - User ID
   * @param {number} limit - Maximum number of activities to return
   * @returns {Array} Recent activities
   */
  getRecentActivities(userId, limit = 10) {
    if (!userId) return [];
    
    const progress = this.getProgress(userId);
    const activities = progress.activityLog || [];
    
    return activities.slice(0, limit);
  },

  /**
   * Clear activity log
   * @param {string} userId - User ID
   */
  clearActivityLog(userId) {
    if (!userId) return;
    
    const progress = this.getProgress(userId);
    progress.activityLog = [];
    this.saveProgress(userId, progress);
  }
};

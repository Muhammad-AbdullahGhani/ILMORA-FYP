const CACHE_KEY = "ilm_ora_quiz_cache";
const PROGRESS_KEY = "ilm_ora_quiz_progress";
export const quizCache = {
  /**
   * Cache questions
   */
  setQuestions(questions) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(questions));
    } catch (error) {
      console.error("Failed to cache questions:", error);
    }
  },
  /**
   * Get cached questions
   */
  getQuestions() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error("Failed to get cached questions:", error);
      return null;
    }
  },
  /**
   * Save quiz progress
   */
  saveProgress(responses) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({
        responses,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  },
  /**
   * Load quiz progress
   */
  loadProgress() {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (!saved) return null;
      const {
        responses,
        timestamp
      } = JSON.parse(saved);

      // Check if progress is less than 24 hours old
      const age = Date.now() - timestamp;
      if (age > 24 * 60 * 60 * 1000) {
        this.clearProgress();
        return null;
      }
      return responses;
    } catch (error) {
      console.error("Failed to load progress:", error);
      return null;
    }
  },
  /**
   * Clear saved progress
   */
  clearProgress() {
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch (error) {
      console.error("Failed to clear progress:", error);
    }
  },
  /**
   * Clear all cache
   */
  clearAll() {
    this.clearProgress();
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  }
};
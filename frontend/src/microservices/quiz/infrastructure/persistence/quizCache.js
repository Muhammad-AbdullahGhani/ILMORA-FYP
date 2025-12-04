const SESSION_KEY = "ilm_ora_quiz_session_id";

export const quizCache = {
  /**
   * Save the active Session ID from the Python Backend
   */
  setSessionId(sessionId) { // Removed : string
    try {
      localStorage.setItem(SESSION_KEY, sessionId);
    } catch (error) {
      console.error("Failed to cache session ID:", error);
    }
  },

  /**
   * Get the active Session ID to resume a quiz
   */
  getSessionId() { // Removed (): string | null
    try {
      return localStorage.getItem(SESSION_KEY);
    } catch (error) {
      // Using localStorage can throw if storage is full or disabled
      return null;
    }
  },

  /**
   * Clear session (e.g., when quiz is finished)
   */
  clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  }
};
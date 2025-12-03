import { recommendationAPI } from "../infrastructure/api/recommendationAPI";

export const recommendationService = {
  /**
   * Generate comprehensive recommendations based on RIASEC scores
   * Calls the Python AI Backend
   */
  async generateRecommendations(userScores, studentBackground) {
    try {
      // Prepare payload for backend
      // Backend expects: { R, I, A, S, E, C, background: { level, group } }
      const payload = {
        R: userScores.dimension_averages.R,
        I: userScores.dimension_averages.I,
        A: userScores.dimension_averages.A,
        S: userScores.dimension_averages.S,
        E: userScores.dimension_averages.E,
        C: userScores.dimension_averages.C,
        background: studentBackground
      };

      // Call API
      const response = await recommendationAPI.generate(payload);
      
      // Save result locally for history/refresh
      this.saveLocal(response.data);
      
      return response.data;
    } catch (error) {
      console.error("AI Recommendation Failed:", error);
      throw error; // Let the UI handle the error display
    }
  },

  /**
   * Get saved recommendations from local storage
   * Useful when user refreshes the /degrees page
   */
  getSavedRecommendations() {
    try {
      const saved = localStorage.getItem('ilm_ora_latest_recommendation');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Helper to save to local storage
   */
  saveLocal(data) {
    try {
      localStorage.setItem('ilm_ora_latest_recommendation', JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save recommendations locally:", error);
    }
  }
};
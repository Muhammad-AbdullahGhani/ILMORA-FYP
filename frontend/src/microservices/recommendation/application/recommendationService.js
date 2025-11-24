import { RecommendationEngine } from "../domain/services/RecommendationEngine";
import { recommendationAPI } from "../infrastructure/api/recommendationAPI";
export const recommendationService = {
  /**
   * Generate comprehensive recommendations based on RIASEC scores
   */
  async generateRecommendations(userId, userScores, preferences) {
    try {
      // Try API first
      const response = await recommendationAPI.generate({
        userId,
        userScores,
        preferences
      });
      return response.data;
    } catch (error) {
      console.error("API failed, generating locally:", error);

      // Fallback to local generation
      const {
        mockPrograms
      } = await import("@/infrastructure/data/mockPrograms");
      const {
        mockUniversities
      } = await import("../../university/infrastructure/data/mockUniversities");
      const {
        mockCareers
      } = await import("../../career/infrastructure/data/mockCareers");
      const programRecommendations = RecommendationEngine.recommendPrograms(userScores, mockPrograms, 15);
      const universityRecommendations = RecommendationEngine.recommendUniversities(programRecommendations, mockUniversities, preferences, 15);
      const careerRecommendations = RecommendationEngine.recommendCareers(userScores, mockCareers, 15);
      return {
        id: `rec_${userId}_${Date.now()}`,
        userId,
        programs: programRecommendations,
        universities: universityRecommendations,
        careers: careerRecommendations,
        generatedAt: new Date()
      };
    }
  },
  /**
   * Get saved recommendations for a user
   */
  async getSavedRecommendations(userId) {
    try {
      const response = await recommendationAPI.getByUserId(userId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch saved recommendations:", error);
      const saved = localStorage.getItem(`recommendations_${userId}`);
      return saved ? JSON.parse(saved) : null;
    }
  },
  /**
   * Save recommendations
   */
  async saveRecommendations(recommendation) {
    try {
      await recommendationAPI.save(recommendation);
    } catch (error) {
      console.error("API save failed, saving locally:", error);
      localStorage.setItem(`recommendations_${recommendation.userId}`, JSON.stringify(recommendation));
    }
  }
};
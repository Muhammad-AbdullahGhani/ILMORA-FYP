import { SentimentAnalyzer } from "../domain/services/SentimentAnalyzer";
import { sentimentAPI } from "../infrastructure/api/sentimentAPI";
export const sentimentService = {
  /**
   * Analyze university sentiment
   */
  async analyzeUniversitySentiment(universityId) {
    try {
      const response = await sentimentAPI.getByUniversity(universityId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sentiment:", error);
      throw new Error("Failed to analyze sentiment");
    }
  },
  /**
   * Add a new review
   */
  async addReview(universityId, userId, text, rating, category) {
    const sentiment = SentimentAnalyzer.analyzeSentiment(text);
    try {
      const response = await sentimentAPI.addReview({
        universityId,
        userId,
        text,
        rating,
        category,
        sentiment
      });
      return response.data;
    } catch (error) {
      console.error("Failed to add review:", error);
      throw new Error("Failed to submit review");
    }
  },
  /**
   * Get reviews for university
   */
  async getReviews(universityId) {
    try {
      const response = await sentimentAPI.getReviews(universityId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return [];
    }
  },
  /**
   * Get sentiment trends
   */
  async getTrends(universityId) {
    try {
      const reviews = await this.getReviews(universityId);
      return SentimentAnalyzer.getSentimentTrends(reviews, 6);
    } catch (error) {
      console.error("Failed to get trends:", error);
      return [];
    }
  },
  /**
   * Get top topics
   */
  async getTopics(universityId) {
    try {
      const reviews = await this.getReviews(universityId);
      return SentimentAnalyzer.extractTopics(reviews);
    } catch (error) {
      console.error("Failed to get topics:", error);
      return [];
    }
  }
};
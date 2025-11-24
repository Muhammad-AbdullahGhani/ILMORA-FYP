export class SentimentAnalyzer {
  /**
   * Analyze sentiment from text
   */
  static analyzeSentiment(text) {
    const positiveWords = ["good", "great", "excellent", "amazing", "love", "best", "wonderful", "fantastic"];
    const negativeWords = ["bad", "poor", "terrible", "worst", "hate", "disappointing", "awful"];
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    if (positiveCount > negativeCount) return "positive";
    if (negativeCount > positiveCount) return "negative";
    return "neutral";
  }

  /**
   * Calculate overall sentiment for a university
   */
  static calculateUniversitySentiment(responses) {
    const totalReviews = responses.length;
    const overallRating = responses.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    const sentimentBreakdown = {
      positive: responses.filter(r => r.sentiment === "positive").length,
      neutral: responses.filter(r => r.sentiment === "neutral").length,
      negative: responses.filter(r => r.sentiment === "negative").length
    };
    const categoryRatings = {
      academics: this.calculateCategoryRating(responses, "academics"),
      facilities: this.calculateCategoryRating(responses, "facilities"),
      campusLife: this.calculateCategoryRating(responses, "campus_life"),
      careerServices: this.calculateCategoryRating(responses, "career_services")
    };
    return {
      universityId: responses[0]?.universityId || "",
      overallRating,
      totalReviews,
      sentimentBreakdown,
      categoryRatings
    };
  }

  /**
   * Calculate rating for specific category
   */
  static calculateCategoryRating(responses, category) {
    const categoryResponses = responses.filter(r => r.category === category);
    if (categoryResponses.length === 0) return 0;
    return categoryResponses.reduce((sum, r) => sum + r.rating, 0) / categoryResponses.length;
  }

  /**
   * Get sentiment trends over time
   */
  static getSentimentTrends(responses, months = 6) {
    const now = new Date();
    const trends = [];
    for (let i = months - 1; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = monthDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      const monthResponses = responses.filter(r => {
        const responseDate = new Date(r.createdAt);
        return responseDate.getMonth() === monthDate.getMonth() && responseDate.getFullYear() === monthDate.getFullYear();
      });
      trends.push({
        month: monthKey,
        positive: monthResponses.filter(r => r.sentiment === "positive").length,
        neutral: monthResponses.filter(r => r.sentiment === "neutral").length,
        negative: monthResponses.filter(r => r.sentiment === "negative").length
      });
    }
    return trends;
  }

  /**
   * Extract key topics from reviews
   */
  static extractTopics(responses) {
    const keywords = ["faculty", "campus", "library", "food", "hostel", "placement", "research", "infrastructure"];
    const topicCounts = new Map();
    responses.forEach(response => {
      const lowerText = response.text.toLowerCase();
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          topicCounts.set(keyword, (topicCounts.get(keyword) || 0) + 1);
        }
      });
    });
    return Array.from(topicCounts.entries()).map(([topic, count]) => ({
      topic,
      count
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  }
}
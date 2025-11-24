export class QuizLogic {
  /**
   * Calculate RIASEC scores from quiz responses
   */
  static calculateScores(responses, questions) {
    const scores = {
      realistic: 0,
      investigative: 0,
      artistic: 0,
      social: 0,
      enterprising: 0,
      conventional: 0
    };
    responses.forEach(response => {
      const question = questions.find(q => q.id === response.questionId);
      if (question) {
        const category = question.category;
        scores[category] += response.value * question.weight;
      }
    });

    // Normalize scores to 0-100 range
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
      Object.keys(scores).forEach(key => {
        scores[key] = scores[key] / maxScore * 100;
      });
    }
    return scores;
  }

  /**
   * Get dominant RIASEC types (top 3)
   */
  static getDominantTypes(scores) {
    return Object.entries(scores).sort(([, a], [, b]) => b - a).slice(0, 3).map(([type]) => type);
  }

  /**
   * Validate quiz completion
   */
  static isQuizComplete(responses, totalQuestions) {
    return responses.length === totalQuestions && responses.every(r => r.value >= 1 && r.value <= 5);
  }
}
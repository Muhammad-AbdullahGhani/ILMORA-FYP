import { QuizLogic } from "../domain/services/QuizLogic";
import { quizAPI } from "../infrastructure/api/quizAPI";
import { quizCache } from "../infrastructure/persistence/quizCache";
export const quizService = {
  /**
   * Get all quiz questions
   */
  async getQuestions() {
    try {
      // Try cache first
      const cached = quizCache.getQuestions();
      if (cached) return cached;

      // Fetch from API
      const response = await quizAPI.getQuestions();
      const questions = response.data;

      // Cache the result
      quizCache.setQuestions(questions);
      return questions;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      return this.getMockQuestions();
    }
  },
  /**
   * Submit quiz answers and get RIASEC scores
   */
  async submitAnswers(responses) {
    try {
      // Try API submission
      const response = await quizAPI.submitAnswers(responses);
      return response.data;
    } catch (error) {
      console.error("Failed to submit answers:", error);
      // Calculate locally as fallback
      const questions = await this.getQuestions();
      return QuizLogic.calculateScores(responses, questions);
    }
  },
  /**
   * Get mock questions for development
   */
  getMockQuestions() {
    return [
    // Realistic (5 questions)
    {
      id: "1",
      text: "I enjoy working with tools and machinery",
      category: "realistic",
      weight: 1
    }, {
      id: "2",
      text: "I like hands-on problem solving",
      category: "realistic",
      weight: 1
    }, {
      id: "3",
      text: "I prefer outdoor work over office work",
      category: "realistic",
      weight: 0.8
    }, {
      id: "4",
      text: "I enjoy building or fixing things",
      category: "realistic",
      weight: 1
    }, {
      id: "5",
      text: "I like working with my hands",
      category: "realistic",
      weight: 1
    },
    // Investigative (5 questions)
    {
      id: "6",
      text: "I enjoy solving complex problems",
      category: "investigative",
      weight: 1
    }, {
      id: "7",
      text: "I like conducting research and experiments",
      category: "investigative",
      weight: 1
    }, {
      id: "8",
      text: "I enjoy analyzing data and statistics",
      category: "investigative",
      weight: 1
    }, {
      id: "9",
      text: "I'm curious about how things work",
      category: "investigative",
      weight: 0.9
    }, {
      id: "10",
      text: "I enjoy learning new scientific concepts",
      category: "investigative",
      weight: 1
    },
    // Artistic (5 questions)
    {
      id: "11",
      text: "I enjoy creative and artistic activities",
      category: "artistic",
      weight: 1
    }, {
      id: "12",
      text: "I like expressing myself through art",
      category: "artistic",
      weight: 1
    }, {
      id: "13",
      text: "I enjoy music, drama, or visual arts",
      category: "artistic",
      weight: 1
    }, {
      id: "14",
      text: "I like thinking outside the box",
      category: "artistic",
      weight: 0.8
    }, {
      id: "15",
      text: "I prefer unstructured, creative work",
      category: "artistic",
      weight: 1
    },
    // Social (5 questions)
    {
      id: "16",
      text: "I enjoy helping and teaching others",
      category: "social",
      weight: 1
    }, {
      id: "17",
      text: "I like working in groups and teams",
      category: "social",
      weight: 1
    }, {
      id: "18",
      text: "I enjoy counseling or advising people",
      category: "social",
      weight: 1
    }, {
      id: "19",
      text: "I'm good at understanding others' feelings",
      category: "social",
      weight: 0.9
    }, {
      id: "20",
      text: "I like community service activities",
      category: "social",
      weight: 1
    },
    // Enterprising (5 questions)
    {
      id: "21",
      text: "I enjoy leading and influencing others",
      category: "enterprising",
      weight: 1
    }, {
      id: "22",
      text: "I like starting new projects or ventures",
      category: "enterprising",
      weight: 1
    }, {
      id: "23",
      text: "I enjoy sales and persuasion",
      category: "enterprising",
      weight: 1
    }, {
      id: "24",
      text: "I'm comfortable taking risks",
      category: "enterprising",
      weight: 0.9
    }, {
      id: "25",
      text: "I like managing and directing others",
      category: "enterprising",
      weight: 1
    },
    // Conventional (5 questions)
    {
      id: "26",
      text: "I enjoy organizing and structuring tasks",
      category: "conventional",
      weight: 1
    }, {
      id: "27",
      text: "I like working with numbers and details",
      category: "conventional",
      weight: 1
    }, {
      id: "28",
      text: "I prefer following established procedures",
      category: "conventional",
      weight: 1
    }, {
      id: "29",
      text: "I enjoy record-keeping and data entry",
      category: "conventional",
      weight: 0.9
    }, {
      id: "30",
      text: "I like organized and systematic work",
      category: "conventional",
      weight: 1
    }];
  },
  /**
   * Save quiz progress
   */
  saveProgress(responses) {
    quizCache.saveProgress(responses);
  },
  /**
   * Load saved progress
   */
  loadProgress() {
    return quizCache.loadProgress();
  },
  /**
   * Clear saved progress
   */
  clearProgress() {
    quizCache.clearProgress();
  }
};
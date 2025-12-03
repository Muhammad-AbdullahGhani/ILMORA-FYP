import { quizAPI } from "../../infrastructure/api/quizAPI";
import { useQuizStore } from "../../store/useQuizStore";

export const quizService = {
  /**
   * Step 1: Start the Adaptive Quiz
   */
  async startQuiz() {
    const store = useQuizStore.getState();
    store.setLoading(true);
    store.reset(); // Clear old data

    try {
      const response = await quizAPI.startQuiz();
      const data = response.data; // { session_id, next_question, is_complete ... }

      store.setSessionId(data.session_id);
      
      if (data.next_question) {
        store.setCurrentQuestion(data.next_question);
      }
      
      store.setLoading(false);
      return data;
    } catch (error) {
      console.error("Failed to start quiz:", error);
      store.setError("Failed to start quiz");
      store.setLoading(false);
      throw error;
    }
  },

  /**
   * Step 2: Submit ONE answer and handle the response (Next Question or Results)
   */
  async submitAnswer(score) {
    const store = useQuizStore.getState();
    const { sessionId, currentQuestion } = store;

    if (!sessionId || !currentQuestion) {
      console.error("Missing session or question data");
      return;
    }

    store.setLoading(true);

    // Prepare payload matching Python backend expectation
    const payload = {
      session_id: sessionId,
      question_id: currentQuestion.id,
      dimension: currentQuestion.dimension,
      score: score // 1-5
    };

    try {
      // 1. Record in local history for UI
      store.recordAnswer(currentQuestion.id, currentQuestion.dimension, score);

      // 2. Send to Backend
      const response = await quizAPI.submitAnswer(payload);
      const data = response.data;

      // 3. Handle Logic: Is it finished?
      if (data.is_complete) {
        store.setComplete(true);
        store.setCurrentQuestion(null); // No more questions
        // Automatically fetch results
        await this.getFinalResults(sessionId);
      } else {
        // 4. If not finished, show next question
        store.setCurrentQuestion(data.next_question);
      }

      store.setLoading(false);
    } catch (error) {
      console.error("Failed to submit answer:", error);
      store.setError("Failed to submit answer");
      store.setLoading(false);
    }
  },

  /**
   * Step 3: Fetch Final Results
   */
  async getFinalResults(sessionId) {
    const store = useQuizStore.getState();
    try {
      const response = await quizAPI.getResults(sessionId);
      store.setScores(response.data); // { holland_code, dimension_averages ... }
      return response.data;
    } catch (error) {
      console.error("Failed to get results:", error);
      store.setError("Failed to get results");
    }
  }
};
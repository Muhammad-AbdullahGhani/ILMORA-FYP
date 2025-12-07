import { quizAPI } from "../infrastructure/api/quizAPI"; 
// 2. Use (./) because quizStore is in the same 'application' folder
import { useQuizStore } from "./quizStore";


export const quizService = {
  /**
   * Step 1: Start the Adaptive Quiz
   * NOTE: Now accepts the student background data from the form.
   */
  async startQuiz(background, userId) { // Accept background and userId
    const store = useQuizStore.getState();
    store.setLoading(true);
    store.reset(); // Clear old data

    // Construct the payload required by the backend
    const payload = {
        background: background, // e.g., { level: 'Intermediate', group: 'Pre-Engineering' }
        user_id: userId // User ID from auth
    };    try {
      // Pass the payload to the API call
      const response = await quizAPI.startQuiz(payload);
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
      question_text: currentQuestion.text, // Add question text for history
      dimension: currentQuestion.dimension,
      score: score // 1-5
    };    try {
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
  },

  /**
   * Step 4: Early Finish (Corresponds to the new /finish/{session_id} endpoint)
   */
  async finishQuizEarly(sessionId) {
    const store = useQuizStore.getState();
    store.setLoading(true);

    try {
        const response = await quizAPI.finishQuizEarly(sessionId);
        const data = response.data; // FinalResults from backend
        
        // Update state to complete and store results
        store.setComplete(true);
        store.setScores(data); 
        
        store.setLoading(false);
        return data;

    } catch (error) {
        console.error("Failed to finish quiz early:", error);
        store.setError("Failed to finish quiz early.");
        store.setLoading(false);
        throw error;
    }
  },

  /**
   * Go back to previous question
   */
  async goBack() {
    const store = useQuizStore.getState();
    const { sessionId, history } = store;

    if (!sessionId) {
      console.error("No session ID for going back");
      return;
    }

    // Don't allow going back if there's no history
    if (!history || history.length === 0) {
      console.warn("Cannot go back - no history");
      return;
    }

    store.setLoading(true);

    try {
      const response = await quizAPI.goBack({ session_id: sessionId });
      const data = response.data;

      // Remove the last answer from history since we're going back
      store.removeLastAnswer();

      // Update with previous question
      if (data.next_question) {
        store.setCurrentQuestion(data.next_question);
      }

      store.setLoading(false);
      return data;
    } catch (error) {
      console.error("Failed to go back:", error);
      store.setError("Failed to go back");
      store.setLoading(false);
    }
  },

  /**
   * Get user's quiz history
   */
  async getUserHistory(userId) {
    try {
      const response = await quizAPI.getUserHistory(userId);
      return response.data;
    } catch (error) {
      console.error("Failed to get quiz history:", error);
      throw error;
    }
  }
};
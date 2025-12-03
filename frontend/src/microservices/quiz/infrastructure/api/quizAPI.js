import { axiosClient } from "@/shared/utils/axiosClient";

export const quizAPI = {
  /**
   * Starts a new adaptive session.
   * Payload: { background: { level: '...', group: '...' } }
   * Returns: { session_id, next_question, ... }
   */
  startQuiz: (payload) => axiosClient.post("/quiz/start", payload),

  /**
   * Submits one answer and gets the NEXT question.
   * Payload: { session_id, question_id, dimension, score }
   */
  submitAnswer: (payload) => axiosClient.post("/quiz/answer", payload),

  /**
   * Gets final results using the session ID.
   */
  getResults: (sessionId) => axiosClient.get(`/quiz/results/${sessionId}`),

  /**
   * Triggers an early finish on the backend and retrieves final results.
   * We assume the backend uses a GET endpoint for this, similar to results.
   */
  finishQuizEarly: (sessionId) => axiosClient.get(`/quiz/finish/${sessionId}`),
};
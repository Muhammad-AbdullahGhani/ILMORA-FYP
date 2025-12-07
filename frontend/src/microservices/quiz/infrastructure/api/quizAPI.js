import { axiosClient } from "@/shared/utils/axiosClient";

export const quizAPI = {
  /**
   * Starts a new adaptive session or resumes existing one.
   * Payload: { background: { level, group }, user_id }
   * Returns: { session_id, next_question, can_go_back, ... }
   */
  startQuiz: (payload) => axiosClient.post("/quiz/start", payload),  /**
   * Submits one answer and gets the NEXT question.
   * Payload: { session_id, question_id, dimension, score }
   */
  submitAnswer: (payload) => axiosClient.post("/quiz/answer", payload),

  /**
   * Gets final results using the session ID.
   */
  getResults: (sessionId) => axiosClient.get(`/quiz/results/${sessionId}`),

  /**
   * Go back to previous question
   * Payload: { session_id }
   */
  goBack: (payload) => axiosClient.post("/quiz/back", payload),

  /**
   * Force finish quiz early and get results.
   */
  finishQuizEarly: (sessionId) => axiosClient.post(`/quiz/finish/${sessionId}`),

  /**
   * Get user's quiz history
   */
  getUserHistory: (userId) => axiosClient.get(`/quiz/history/${userId}`),
};
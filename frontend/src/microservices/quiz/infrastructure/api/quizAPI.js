import { axiosClient } from "@/shared/utils/axiosClient";
export const quizAPI = {
  getQuestions: () => axiosClient.get("/quiz/questions"),
  submitAnswers: answers => axiosClient.post("/quiz/submit", {
    answers
  }),
  getResults: userId => axiosClient.get(`/quiz/results/${userId}`),
  saveProgress: (userId, progress) => axiosClient.post("/quiz/progress", {
    userId,
    progress
  })
};
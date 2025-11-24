import { create } from "zustand";
export const useQuizStore = create(set => ({
  questions: [],
  responses: [],
  currentQuestion: 0,
  scores: null,
  isLoading: false,
  error: null,
  setQuestions: questions => set({
    questions
  }),
  addResponse: response => set(state => ({
    responses: [...state.responses, response]
  })),
  updateResponse: (questionId, value) => set(state => ({
    responses: state.responses.map(r => r.questionId === questionId ? {
      ...r,
      value
    } : r)
  })),
  nextQuestion: () => set(state => ({
    currentQuestion: Math.min(state.currentQuestion + 1, state.questions.length - 1)
  })),
  previousQuestion: () => set(state => ({
    currentQuestion: Math.max(state.currentQuestion - 1, 0)
  })),
  setScores: scores => set({
    scores
  }),
  setLoading: loading => set({
    isLoading: loading
  }),
  setError: error => set({
    error
  }),
  reset: () => set({
    responses: [],
    currentQuestion: 0,
    scores: null,
    error: null
  })
}));
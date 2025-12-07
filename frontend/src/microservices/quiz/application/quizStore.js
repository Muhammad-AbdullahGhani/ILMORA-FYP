import { create } from 'zustand';

/**
 * Initializes the state for the Adaptive Career Quiz.
 * Stores all session data, user history, and background info.
 */
// Define the initial state structure for easy resetting
const initialState = {
    sessionId: null,
    currentQuestion: null,
    isLoading: false,
    isComplete: false,
    history: [],
    scores: null, // Final results (RIASEC averages)
    studentBackground: {
        level: null, // e.g., 'Intermediate'
        group: null,  // e.g., 'Pre-Engineering'
    },
    error: null, // NEW: State for storing errors
};

export const useQuizStore = create((set) => ({
    // --- State ---
    ...initialState, // Spread the initial state

    // --- Actions ---

    // General reset function that clears the state
    reset: () => set(initialState),

    /**
     * Resets the store and sets loading to true for a new session.
     */
    startNewQuiz: () => set({ 
        ...initialState, // Reset everything
        isLoading: true, // Set loading for the start process
    }),

    // Function to save student background info
    setStudentBackground: (background) => set({
        studentBackground: background
    }),

    // NEW ACTION: Set session ID
    setSessionId: (id) => set({
        sessionId: id,
    }),

    // NEW ACTION: Set current question
    setCurrentQuestion: (question) => set({
        currentQuestion: question,
        isLoading: false, // Ensure loading is off after receiving a question
    }),

    // NEW ACTION: Record answer locally
    recordAnswer: (questionId, dimension, score) => set((state) => ({
        // We only store the ID in history for tracking which questions were asked
        history: [...state.history, questionId], 
        // Note: The actual score and average calculation happens on the backend.
    })),

    // NEW ACTION: Remove last answer from history (for back button)
    removeLastAnswer: () => set((state) => ({
        history: state.history.slice(0, -1),
    })),

    // NEW ACTION: Mark as complete
    setComplete: (isComplete) => set({
        isComplete: isComplete,
        isLoading: false,
    }),

    // NEW ACTION: Set final scores
    setScores: (results) => set({
        scores: results,
    }),

    /**
     * Updates the session state after the backend returns the initial question.
     * NOTE: This is slightly redundant with setSessionId/setCurrentQuestion, but kept for clarity.
     * @param {string} sessionId - The new session ID.
     * @param {object} question - The first question object.
     */
    setSessionStarted: (sessionId, question) => set({
        sessionId,
        currentQuestion: question,
        isLoading: false,
    }),

    /**
     * Sets loading state.
     * @param {boolean} status 
     */
    setLoading: (status) => set({ isLoading: status }),

    // NEW ACTION: Set error state
    setError: (message) => set({ 
        error: message, 
        isLoading: false, 
        currentQuestion: null 
    }),
}));
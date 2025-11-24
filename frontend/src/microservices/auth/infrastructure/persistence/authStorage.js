// frontend/src/microservices/auth/infrastructure/persistence/authStorage.js
const TOKEN_KEY = "ilm_ora_token";
const USER_KEY = "ilm_ora_user";
export const authStorage = {
  /**
   * Save auth token
   */
  saveToken(token) {
    try {
      const expiresAt = Date.now() + token.expiresIn * 1000;
      localStorage.setItem(TOKEN_KEY, JSON.stringify({
        ...token,
        expiresAt
      }));
      localStorage.setItem("auth_token", token.accessToken); // For axios interceptor
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  },
  /**
   * Get auth token
   */
  getToken() {
    try {
      const stored = localStorage.getItem(TOKEN_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  },
  /**
   * Save user data
   */
  saveUser(user) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  },
  /**
   * Get user data
   */
  getUser() {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to get user:", error);
      return null;
    }
  },
  /**
   * Clear all auth data
   */
  clearAuth() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Failed to clear auth:", error);
    }
  },
  /**
   * Check if token exists
   */
  hasToken() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};
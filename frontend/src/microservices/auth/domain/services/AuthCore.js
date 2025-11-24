// frontend/src/microservices/auth/domain/services/AuthCore.js
export class AuthCore {
  /**
   * Validate email format
   */
  static validateEmail(email) {
    console.log("Validating email:", email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(expiresAt) {
    return Date.now() >= expiresAt;
  }

  /**
   * Parse JWT token (basic, without verification)
   */
  static parseToken(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      return null;
    }
  }
}
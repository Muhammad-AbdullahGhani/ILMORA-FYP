// // frontend/src/microservices/auth/application/authService.js
// import { AuthCore } from "../domain/services/AuthCore";
// import { authAPI } from "../infrastructure/api/authAPI";
// import { authStorage } from "../infrastructure/persistence/authStorage";

// export const authService = {
//   /**
//    * Login user
//    */
//   async login(credentials) {
//     // Validate
//     // FIX 1: Make sure you are passing credentials.email, not the whole object
//     if (!AuthCore.validateEmail(credentials.email.email)) {
//       throw new Error("Invalid email format");
//     }
//     try {
//       const response = await authAPI.login(credentials.email);

//       // ... (rest of login function is fine) ...
//       const data = response.data;
//       let tokenObj = data.token;
//       if (typeof tokenObj === 'string') {
//         tokenObj = {
//           accessToken: tokenObj,
//           expiresIn: 3600
//         };
//       }
//       authStorage.saveToken(tokenObj);
//       authStorage.saveUser(data.user);
//       return {
//         user: data.user,
//         token: tokenObj
//       };
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw new Error(error.response?.data?.error || error.response?.data?.message || "Login failed");
//     }
//   },

//   /**
//    * Register new user
//    */
//   async register(data) {
//     // Your debug logs
//     console.log("Data:", data);
//     console.log("Data.email:", data.email) // This should now log "raza@gmail.com"
    
//     // --- THIS IS THE CRITICAL FIX ---
//     // You must pass the email *string* (data.email), not the *object* (data).
//     // Your log "Validating email: {email: '...'}" proves you were passing 'data' here.
//     if (!AuthCore.validateEmail(data.email.email)) { 
//       throw new Error("Invalid email format");
//     }
//     // ---------------------------------

//     console.log("Registering with email:", data.email); // This log will now be correct

//     // Validate password
//     const passwordValidation = AuthCore.validatePassword(data.email.password);
//     if (!passwordValidation.isValid) {
//       throw new Error(passwordValidation.errors.join(", "));
//     }
    
//     try {
//       const response = await authAPI.register(data.email);
//       const respData = response.data;
//       let tokenObj = respData.token;
//       if (typeof tokenObj === 'string') tokenObj = {
//         accessToken: tokenObj,
//         expiresIn: 3600
//       };
//       authStorage.saveToken(tokenObj);
//       authStorage.saveUser(respData.user);
//       return {
//         user: respData.user,
//         token: tokenObj
//       };
//     } catch (error) {
//       console.error("Registration failed:", error);
//       throw new Error(error.response?.data?.error || error.response?.data?.message || "Registration failed");
//     }
//   },

//   /**
//    * Logout user
//    */
//   async logout() {
//     try {
//       await authAPI.logout();
//     } catch (error) {
//       console.error("Logout API call failed:", error);
//     } finally {
//       authStorage.clearAuth();
//     }
//   },

//   /**
//    * Get current user
//    */
//   getCurrentUser() {
//     return authStorage.getUser();
//   },

//   /**
//    * Check if user is authenticated
//    */
//   isAuthenticated() {
//     const token = authStorage.getToken();
//     return !!token && !AuthCore.isTokenExpired(token.expiresAt);
//   },

//   /**
//    * Refresh token
//    */
//   async refreshToken() {
//     try {
//       const response = await authAPI.refreshToken();
//       const respData = response.data;
//       authStorage.saveToken(respData.token);
//       return respData.token;
//     } catch (error) {
//       console.error("Token refresh failed:", error);
//       authStorage.clearAuth();
//       throw new Error("Session expired");
//     }
//   },

//   /**
//    * Update user profile
//    */
//   async updateProfile(updates) {
//     try {
//       const response = await authAPI.updateProfile(updates);
//       const respData = response.data;
//       authStorage.saveUser(respData.user);
//       return respData.user;
//     } catch (error) {
//       console.error("Profile update failed:", error);
//       throw new Error("Failed to update profile");
//     }
//   }
// };







// frontend/src/microservices/auth/application/authService.js
import { AuthCore } from "../domain/services/AuthCore";
import { authAPI } from "../infrastructure/api/authAPI";
import { authStorage } from "../infrastructure/persistence/authStorage";

export const authService = {
  /**
   * Login user
   */
  async login(credentials) {
    // Validate
    // FIX 1: Make sure you are passing credentials.email, not the whole object
    if (!AuthCore.validateEmail(credentials.email)) {
      throw new Error("Invalid email format");
    }
    try {
      const response = await authAPI.login(credentials);

      // ... (rest of login function is fine) ...
      const data = response.data;
      let tokenObj = data.token;
      if (typeof tokenObj === 'string') {
        tokenObj = {
          accessToken: tokenObj,
          expiresIn: 3600
        };
      }
      authStorage.saveToken(tokenObj);
      authStorage.saveUser(data.user);
      return {
        user: data.user,
        token: tokenObj
      };
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.error || error.response?.data?.message || "Login failed");
    }
  },

  /**
   * Register new user
   */
  async register(data) {
    // Your debug logs
    console.log("Data:", data);
    console.log("Data.email:", data.email) // This should now log "raza@gmail.com"
    
    // --- THIS IS THE CRITICAL FIX ---
    // Reverted to data.email. This is the correct way.
    if (!AuthCore.validateEmail(data.email)) { 
      throw new Error("Invalid email format");
    }
    // ---------------------------------

    console.log("Registering with email:", data.email); // This log will now be correct

    // Validate password
    // Reverted to data.password
    const passwordValidation = AuthCore.validatePassword(data.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(", "));
    }
    
    try {
      // Reverted to authAPI.register(data)
      const response = await authAPI.register(data);
      const respData = response.data;
      let tokenObj = respData.token;
      if (typeof tokenObj === 'string') tokenObj = {
        accessToken: tokenObj,
        expiresIn: 3600
      };
      authStorage.saveToken(tokenObj);
      authStorage.saveUser(respData.user);
      return {
        user: respData.user,
        token: tokenObj
      };
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error(error.response?.data?.error || error.response?.data?.message || "Registration failed");
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      authStorage.clearAuth();
    }
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    return authStorage.getUser();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = authStorage.getToken();
    return !!token && !AuthCore.isTokenExpired(token.expiresAt);
  },

  /**
   * Refresh token
   */
  async refreshToken() {
    try {
      const response = await authAPI.refreshToken();
      const respData = response.data;
      authStorage.saveToken(respData.token);
      return respData.token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      authStorage.clearAuth();
      throw new Error("Session expired");
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(updates) {
    try {
      const response = await authAPI.updateProfile(updates);
      const respData = response.data;
      authStorage.saveUser(respData.user);
      return respData.user;
    } catch (error) {
      console.error("Profile update failed:", error);
      throw new Error("Failed to update profile");
    }
  }
};
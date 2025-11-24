// import React from 'react';
// import { createContext, useContext, useState, useEffect } from "react";
// import { authService } from "../../microservices/auth/application/authService";
// import { authStorage } from "../../microservices/auth/infrastructure/persistence/authStorage";
// const AuthContext = /*#__PURE__*/createContext(undefined);
// export function AuthProvider({
//   children
// }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // Check for existing session
//     const savedUser = authStorage.getUser();
//     if (savedUser) {
//       setUser(savedUser);
//     }
//     setLoading(false);
//   }, []);
//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const response = await authService.login({
//         email,
//         password
//       });
//       authStorage.saveToken(response.token);
//       authStorage.saveUser(response.user);
//       setUser(response.user);
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
//   const register = async (email, password, name) => {
//     console.log("Registering with:", email, password, name);
//     setLoading(true);
//     try {
//       const response = await authService.register({
//         email,
//         password,
//         name
//       });
//       authStorage.saveToken(response.token);
//       authStorage.saveUser(response.user);
//       setUser(response.user);
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
//   const logout = () => {
//     setUser(null);
//     authStorage.clearAuth();
//   };
//   return /*#__PURE__*/React.createElement(AuthContext.Provider, {
//     value: {
//       user,
//       isAuthenticated: !!user,
//       login,
//       register,
//       logout,
//       loading
//     }
//   }, children);
// }
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }





import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../../microservices/auth/application/authService";
import { authStorage } from "../../microservices/auth/infrastructure/persistence/authStorage";

const AuthContext = /*#__PURE__*/createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = authStorage.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // --- FIX 1: Changed from (email, password) to a single 'credentials' object ---
  const login = async (credentials) => {
    setLoading(true);
    try {
      // Pass the object directly
      const response = await authService.login(credentials);
      authStorage.saveToken(response.token);
      authStorage.saveUser(response.user);
      setUser(response.user);
    } catch (error) {
      // Re-throw the original error to be caught by AuthPage
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // --- FIX 2: Changed from (email, password, name) to a single 'data' object ---
  const register = async (data) => {
    console.log("AuthProvider registering with:", data); // Debug log
    setLoading(true);
    try {
      // Pass the object directly
      const response = await authService.register(data);
      authStorage.saveToken(response.token);
      authStorage.saveUser(response.user);
      setUser(response.user);
    } catch (error) {
      // Re-throw the original error to be caught by AuthPage
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authStorage.clearAuth();
    // Optional: redirect to login page
    // window.location.href = '/auth';
  };

  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: {
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      loading
    }
  }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
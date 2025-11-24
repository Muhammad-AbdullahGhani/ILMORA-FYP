// frontend/src/app/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
export function ProtectedRoute({
  children
}) {
  const {
    isAuthenticated,
    loading
  } = useAuth();
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-muted-foreground"
    }, "Loading...")));
  }
  if (!isAuthenticated) {
    return /*#__PURE__*/React.createElement(Navigate, {
      to: "/auth",
      replace: true
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
}
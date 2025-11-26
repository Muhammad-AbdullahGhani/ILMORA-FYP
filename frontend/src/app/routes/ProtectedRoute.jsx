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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace={true} />;
  }
  return <>{children}</>;
}
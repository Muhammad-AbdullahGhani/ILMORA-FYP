// frontend/src/presentation/components/layout/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
export function AppRoutes() {
  return (
    <Routes>
      {publicRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {protectedRoutes.map(route => (
        <Route key={route.path} path={route.path} element={<ProtectedRoute requiredRole={route.requiredRole}>{route.element}</ProtectedRoute>} />
      ))}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
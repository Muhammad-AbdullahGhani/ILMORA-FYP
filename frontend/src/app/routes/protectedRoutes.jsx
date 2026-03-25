// frontend/src/app/routes/protectedRoutes.jsx
import React from 'react';
import { Dashboard } from "@/presentation/pages/Dashboard/Dashboard";
import { QuizHistory } from "@/microservices/quiz/presentation/pages/QuizHistory";
import { DegreeRecommendations } from "@/microservices/recommendation/presentation/pages/DegreeRecommendations";
import { FeedbackPage } from "@/presentation/pages/Feedback/FeedbackPage";
import { SettingsPage } from "@/presentation/pages/Settings/SettingsPage";
import { AdminDashboard } from "@/microservices/admin/presentation/pages/AdminDashboard";

export const protectedRoutes = [{
  path: "/dashboard",
  element: <Dashboard />
}, {
  path: "/quiz-history",
  element: <QuizHistory />
}, {
  path: "/degrees",
  element: <DegreeRecommendations />
}, {
  path: "/feedback",
  element: <FeedbackPage />
}, {
  path: "/settings",
  element: <SettingsPage />
}, {
  path: "/admin",
  element: <AdminDashboard />,
  requiredRole: "admin"
}];
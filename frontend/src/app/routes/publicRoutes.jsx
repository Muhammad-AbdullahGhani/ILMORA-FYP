// frontend/src/app/routes/publicRoutes.jsx
import React from 'react';
import { LandingPage } from "@/presentation/pages/Home/LandingPage";
import { AuthPage } from "@/microservices/auth/presentation/pages/AuthPage";
import { AboutPage } from "@/presentation/pages/About/AboutPage";
import { Dashboard } from "@/presentation/pages/Dashboard/Dashboard";
import { QuizIntro } from "@/microservices/quiz/presentation/pages/QuizIntro";
import { QuizQuestions } from "@/microservices/quiz/presentation/pages/QuizQuestions";
import { QuizResults } from "@/microservices/quiz/presentation/pages/QuizResults";
import { DegreeRecommendations } from "@/microservices/recommendation/presentation/pages/DegreeRecommendations";
import { UniversityRecommendations } from "@/microservices/university/presentation/pages/UniversityRecommendations";
import { UniversityDetail } from "@/microservices/university/presentation/pages/UniversityDetail";
import { CareerInsights } from "@/microservices/career/presentation/pages/CareerInsights";
import { SentimentDashboard } from "@/microservices/sentiment/presentation/pages/SentimentDashboard";
import { ScholarshipFinder } from "@/microservices/scholarships/presentation/pages/ScholarshipFinder";
import { HostelFinder } from "@/microservices/hostels/presentation/pages/HostelFinder";
import { FeedbackPage } from "@/presentation/pages/Feedback/FeedbackPage";
import { SettingsPage } from "@/presentation/pages/Settings/SettingsPage";
import { AdminDashboard } from "@/microservices/admin/presentation/pages/AdminDashboard";
export const publicRoutes = [{
  path: "/",
  element: /*#__PURE__*/React.createElement(LandingPage, null)
}, {
  path: "/auth",
  element: /*#__PURE__*/React.createElement(AuthPage, null)
}, {
  path: "/about",
  element: /*#__PURE__*/React.createElement(AboutPage, null)
}, {
  path: "/dashboard",
  element: /*#__PURE__*/React.createElement(Dashboard, null)
}, {
  path: "/quiz-intro",
  element: /*#__PURE__*/React.createElement(QuizIntro, null)
}, {
  path: "/quiz",
  element: /*#__PURE__*/React.createElement(QuizQuestions, null)
}, {
  path: "/quiz-results",
  element: /*#__PURE__*/React.createElement(QuizResults, null)
}, {
  path: "/degrees",
  element: /*#__PURE__*/React.createElement(DegreeRecommendations, null)
}, {
  path: "/universities",
  element: /*#__PURE__*/React.createElement(UniversityRecommendations, null)
}, {
  path: "/university/:id",
  element: /*#__PURE__*/React.createElement(UniversityDetail, null)
}, {
  path: "/careers",
  element: /*#__PURE__*/React.createElement(CareerInsights, null)
}, {
  path: "/sentiments",
  element: /*#__PURE__*/React.createElement(SentimentDashboard, null)
}, {
  path: "/scholarships",
  element: /*#__PURE__*/React.createElement(ScholarshipFinder, null)
}, {
  path: "/hostels",
  element: /*#__PURE__*/React.createElement(HostelFinder, null)
}, {
  path: "/feedback",
  element: /*#__PURE__*/React.createElement(FeedbackPage, null)
}, {
  path: "/settings",
  element: /*#__PURE__*/React.createElement(SettingsPage, null)
}, {
  path: "/admin",
  element: /*#__PURE__*/React.createElement(AdminDashboard, null)
}];
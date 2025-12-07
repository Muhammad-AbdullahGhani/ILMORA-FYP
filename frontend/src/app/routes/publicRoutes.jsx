// frontend/src/app/routes/publicRoutes.jsx
import React from 'react';
import { LandingPage } from "@/presentation/pages/Home/LandingPage";
import { AuthPage } from "@/microservices/auth/presentation/pages/AuthPage";
import { AboutPage } from "@/presentation/pages/About/AboutPage";
import { Dashboard } from "@/presentation/pages/Dashboard/Dashboard";
import { QuizIntro } from "@/microservices/quiz/presentation/pages/QuizIntro";
import { QuizQuestions } from "@/microservices/quiz/presentation/pages/QuizQuestions";
import { QuizResults } from "@/microservices/quiz/presentation/pages/QuizResults";
import { QuizHistory } from "@/microservices/quiz/presentation/pages/QuizHistory";
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
  element: <LandingPage />
}, {
  path: "/auth",
  element: <AuthPage />
}, {
  path: "/about",
  element: <AboutPage />
}, {
  path: "/dashboard",
  element: <Dashboard />
}, {
  path: "/quiz-intro",
  element: <QuizIntro />
}, {
  path: "/quiz",
  element: <QuizQuestions />
}, {
  path: "/quiz-results",
  element: <QuizResults />
}, {
  path: "/quiz-history",
  element: <QuizHistory />
}, {
  path: "/degrees",
  element: <DegreeRecommendations />
}, {
  path: "/universities",
  element: <UniversityRecommendations />
}, {
  path: "/university/:id",
  element: <UniversityDetail />
}, {
  path: "/careers",
  element: <CareerInsights />
}, {
  path: "/sentiments",
  element: <SentimentDashboard />
}, {
  path: "/scholarships",
  element: <ScholarshipFinder />
}, {
  path: "/hostels",
  element: <HostelFinder />
}, {
  path: "/feedback",
  element: <FeedbackPage />
}, {
  path: "/settings",
  element: <SettingsPage />
}, {
  path: "/admin",
  element: <AdminDashboard />
}];
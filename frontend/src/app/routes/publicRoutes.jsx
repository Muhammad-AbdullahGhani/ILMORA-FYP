// frontend/src/app/routes/publicRoutes.jsx
import React from 'react';
import { LandingPage } from "@/presentation/pages/Home/LandingPage";
import { AuthPage } from "@/microservices/auth/presentation/pages/AuthPage";
import { AboutPage } from "@/presentation/pages/About/AboutPage";
import { QuizIntro } from "@/microservices/quiz/presentation/pages/QuizIntro";
import { QuizQuestions } from "@/microservices/quiz/presentation/pages/QuizQuestions";
import { QuizResults } from "@/microservices/quiz/presentation/pages/QuizResults";
import { UniversityRecommendations } from "@/microservices/university/presentation/pages/UniversityRecommendations";
import { UniversityDetail } from "@/microservices/university/presentation/pages/UniversityDetail";
import { CareerInsights } from "@/microservices/career/presentation/pages/CareerInsights";
import { SentimentDashboard } from "@/microservices/sentiment/presentation/pages/SentimentDashboard";
import { ScholarshipFinder } from "@/microservices/scholarships/presentation/pages/ScholarshipFinder";
import { HostelFinder } from "@/microservices/hostels/presentation/pages/HostelFinder";
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
  path: "/quiz-intro",
  element: <QuizIntro />
}, {
  path: "/quiz",
  element: <QuizQuestions />
}, {
  path: "/quiz-results",
  element: <QuizResults />
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
}];
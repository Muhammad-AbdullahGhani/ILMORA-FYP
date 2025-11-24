import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "./../../../shared/components/ui/button";
import { Card } from "./../../../shared/components/ui/card";
import { ArrowRight, Brain, Target, TrendingUp, Users, Award, Globe } from "lucide-react";
import { ImageWithFallback } from "./../../../shared/components/ImageWithFallback";
export function LandingPage() {
  const features = [{
    icon: Brain,
    title: "AI-Powered Recommendations",
    description: "Get personalized degree and university suggestions based on advanced AI algorithms"
  }, {
    icon: Target,
    title: "Career-Focused Quiz",
    description: "Take our gamified RIASEC quiz to discover your perfect career path"
  }, {
    icon: TrendingUp,
    title: "Career Insights",
    description: "Explore salary trends, growth rates, and career opportunities"
  }, {
    icon: Users,
    title: "Student Sentiments",
    description: "Read real reviews and sentiments from current students and alumni"
  }, {
    icon: Award,
    title: "Scholarship Finder",
    description: "Discover scholarships that match your profile and goals"
  }, {
    icon: Globe,
    title: "University Database",
    description: "Access comprehensive information about universities worldwide"
  }];
  const stats = [{
    value: "500+",
    label: "Universities"
  }, {
    value: "1000+",
    label: "Degree Programs"
  }, {
    value: "50K+",
    label: "Students Helped"
  }, {
    value: "98%",
    label: "Satisfaction Rate"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen"
  }, /*#__PURE__*/React.createElement("section", {
    className: "relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20"
  }, "AI-Powered Career Guidance")), /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-6xl font-bold leading-tight"
  }, "Find Your Perfect ", /*#__PURE__*/React.createElement("span", {
    className: "text-primary"
  }, "Degree"), " &", " ", /*#__PURE__*/React.createElement("span", {
    className: "text-secondary"
  }, "University"), " with AI"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground"
  }, "Discover your ideal career path with our intelligent recommendation system. Take the quiz, explore universities, and make informed decisions about your future."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-4"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/auth"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-primary hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
  }, "Start Your Journey", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "ml-2 w-5 h-5"
  }))), /*#__PURE__*/React.createElement(Link, {
    to: "/universities"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "rounded-xl hover:scale-105 transition-all"
  }, "Explore Universities"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-8 pt-4"
  }, stats.map((stat, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-primary"
  }, stat.value), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, stat.label))))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-10"
  }, /*#__PURE__*/React.createElement(ImageWithFallback, {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    alt: "Students studying",
    className: "rounded-2xl shadow-2xl"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold mb-4"
  }, "Why Choose ILM-ORA?"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground max-w-2xl mx-auto"
  }, "Our platform combines cutting-edge AI technology with comprehensive university data to guide your educational journey")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
  }, features.map((feature, index) => /*#__PURE__*/React.createElement(Card, {
    key: index,
    className: "p-6 hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4"
  }, /*#__PURE__*/React.createElement(feature.icon, {
    className: "w-7 h-7 text-white"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold mb-2"
  }, feature.title), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, feature.description)))))), /*#__PURE__*/React.createElement("section", {
    className: "bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto text-center space-y-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold"
  }, "Ready to Start Your Journey?"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground"
  }, "Join thousands of students who found their perfect match with ILM-ORA"), /*#__PURE__*/React.createElement(Link, {
    to: "/auth"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
  }, "Get Started Free", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "ml-2 w-6 h-6"
  }))))));
}
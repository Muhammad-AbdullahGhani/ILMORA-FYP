import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { userProgressService } from "@/shared/services/userProgressService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Badge } from "@/shared/components/ui/badge";
import { Brain, Clock, Target, Lightbulb, Users, Wrench, Briefcase, Palette, UserCheck, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
export function QuizIntro() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  
  const handleStartQuiz = () => {
    if (user) {
      const userId = user.id || user.email;
      userProgressService.logActivity(userId, {
        type: 'quiz_started',
        description: 'Started Career Assessment Quiz',
        icon: 'ClipboardList',
        color: 'text-blue-500'
      });
    }
    navigate('/quiz');
  };
  const riasecTypes = [{
    icon: Wrench,
    title: "Realistic",
    color: "text-blue-600",
    bg: "bg-blue-100",
    description: "Hands-on, practical work"
  }, {
    icon: Brain,
    title: "Investigative",
    color: "text-purple-600",
    bg: "bg-purple-100",
    description: "Research and analysis"
  }, {
    icon: Palette,
    title: "Artistic",
    color: "text-pink-600",
    bg: "bg-pink-100",
    description: "Creative expression"
  }, {
    icon: Users,
    title: "Social",
    color: "text-green-600",
    bg: "bg-green-100",
    description: "Helping others"
  }, {
    icon: Briefcase,
    title: "Enterprising",
    color: "text-orange-600",
    bg: "bg-orange-100",
    description: "Leadership & business"
  }, {
    icon: UserCheck,
    title: "Conventional",
    color: "text-teal-600",
    bg: "bg-teal-100",
    description: "Organization & detail"
  }];
  const benefits = ["Discover careers that match your personality", "Get personalized degree recommendations", "Understand your strengths and interests", "Make informed educational decisions"];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => window.history.back(),
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back"), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      duration: 0.5
    },
    className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-xl"
  }, /*#__PURE__*/React.createElement(Brain, {
    className: "w-10 h-10 text-white"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold mb-4"
  }, "Gamified Career Interest Quiz"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground max-w-2xl mx-auto"
  }, "Discover your ideal career path through our AI-powered assessment based on the RIASEC model")), /*#__PURE__*/React.createElement(Card, {
    className: "mb-8 border-2 border-primary/20 shadow-xl"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "text-center pb-4"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl"
  }, "What to Expect"), /*#__PURE__*/React.createElement(CardDescription, null, "A fun, interactive quiz designed to understand your interests and personality")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center p-4 bg-muted/50 rounded-xl"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-8 h-8 mx-auto mb-2 text-primary"
  }), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "10-15 Minutes"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Estimated time")), /*#__PURE__*/React.createElement("div", {
    className: "text-center p-4 bg-muted/50 rounded-xl"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-8 h-8 mx-auto mb-2 text-secondary"
  }), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "30 Questions"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Scenario-based")), /*#__PURE__*/React.createElement("div", {
    className: "text-center p-4 bg-muted/50 rounded-xl"
  }, /*#__PURE__*/React.createElement(Lightbulb, {
    className: "w-8 h-8 mx-auto mb-2 text-accent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "AI-Powered"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Smart insights"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold mb-4 text-center"
  }, "We'll Measure 6 Career Personality Types"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-4"
  }, riasecTypes.map((type, index) => /*#__PURE__*/React.createElement(motion.div, {
    key: index,
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: index * 0.1
    },
    className: "flex flex-col items-center p-4 rounded-xl bg-card border-2 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-14 h-14 rounded-full ${type.bg} flex items-center justify-center mb-2`
  }, /*#__PURE__*/React.createElement(type.icon, {
    className: `w-7 h-7 ${type.color}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-sm text-center"
  }, type.title), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-muted-foreground text-center"
  }, type.description))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold mb-4"
  }, "What You'll Get:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, benefits.map((benefit, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 text-primary mt-0.5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, benefit))))), showDetails && /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      height: 0
    },
    animate: {
      opacity: 1,
      height: "auto"
    },
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Lightbulb, {
    className: "w-5 h-5 text-blue-600"
  }), "Tips for Best Results:"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm ml-7"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Answer honestly based on your true preferences"), /*#__PURE__*/React.createElement("li", null, "\u2022 Don't overthink - go with your first instinct"), /*#__PURE__*/React.createElement("li", null, "\u2022 There are no right or wrong answers"), /*#__PURE__*/React.createElement("li", null, "\u2022 You can retake the quiz anytime")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 pt-4"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "flex-1 bg-primary hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105",
    onClick: handleStartQuiz
  }, "Start Quiz Now"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "flex-1 rounded-xl",
    onClick: () => setShowDetails(!showDetails)
  }, showDetails ? "Hide Details" : "Learn More")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: "text-sm"
  }, /*#__PURE__*/React.createElement(Progress, {
    value: 0,
    className: "w-16 h-2 mr-2 inline-block"
  }), "0% Complete")))), /*#__PURE__*/React.createElement("div", {
    className: "text-center text-sm text-muted-foreground"
  }, /*#__PURE__*/React.createElement("p", null, "Your responses are private and will only be used to generate personalized recommendations"))));
}
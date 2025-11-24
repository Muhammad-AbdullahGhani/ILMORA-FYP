import React from 'react';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "./../../../shared/components/ui/button";
import { Textarea } from "./../../../shared/components/ui/textarea";
import { MessageSquare, Star, CheckCircle2, ArrowLeft } from "lucide-react";
export function FeedbackPage() {
  const [ratings, setRatings] = useState({
    ux: 0,
    accuracy: 0,
    overall: 0
  });
  const [submitted, setSubmitted] = useState(false);
  const RatingStars = ({
    category,
    value
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-medium capitalize"
  }, category), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, [1, 2, 3, 4, 5].map(star => /*#__PURE__*/React.createElement("button", {
    key: star,
    onClick: () => setRatings({
      ...ratings,
      [category]: star
    }),
    className: "transition-transform hover:scale-110"
  }, /*#__PURE__*/React.createElement(Star, {
    className: `w-8 h-8 ${star <= value ? "fill-secondary text-secondary" : "text-muted-foreground"}`
  })))));
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => window.history.back(),
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back"), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4"
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    className: "w-8 h-8 text-white"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl font-bold mb-4"
  }, "We Value Your Feedback"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground"
  }, "Help us improve ILM-ORA by sharing your experience")), submitted ? /*#__PURE__*/React.createElement(Card, {
    className: "border-2 border-green-500 bg-green-50 dark:bg-green-950/20"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-12 text-center"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-20 h-20 text-green-600 mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold text-green-700 dark:text-green-400 mb-2"
  }, "Thank You!"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-green-600 dark:text-green-300"
  }, "Your feedback has been submitted successfully. We appreciate you helping us improve!"))) : /*#__PURE__*/React.createElement(Card, {
    className: "border-2"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Rate Your Experience"), /*#__PURE__*/React.createElement(CardDescription, null, "Please rate different aspects of the platform")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement(RatingStars, {
    category: "ux",
    value: ratings.ux
  }), /*#__PURE__*/React.createElement(RatingStars, {
    category: "accuracy",
    value: ratings.accuracy
  }), /*#__PURE__*/React.createElement(RatingStars, {
    category: "overall",
    value: ratings.overall
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "font-medium"
  }, "Additional Comments"), /*#__PURE__*/React.createElement(Textarea, {
    placeholder: "Share your suggestions, what you liked, or what we can improve...",
    rows: 6,
    className: "resize-none"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    className: "w-full bg-primary hover:bg-primary/90"
  }, "Submit Feedback"))))));
}
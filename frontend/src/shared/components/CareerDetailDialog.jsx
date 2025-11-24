import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { DollarSign, TrendingUp, MapPin, Briefcase, GraduationCap, Target } from "lucide-react";
import { Link } from "react-router-dom";
export function CareerDetailDialog({
  open,
  onOpenChange,
  career
}) {
  if (!career) return null;
  const relatedDegrees = career.field === "Technology" ? ["Computer Science", "Software Engineering", "Data Science"] : career.field === "Engineering" ? ["Electrical Engineering", "Mechanical Engineering", "Civil Engineering"] : ["Business Administration", "Marketing", "Management"];
  const careerPath = [{
    title: "Junior Level",
    years: "0-2 years",
    salary: "Entry level"
  }, {
    title: "Mid Level",
    years: "3-5 years",
    salary: "40% increase"
  }, {
    title: "Senior Level",
    years: "6-10 years",
    salary: "80% increase"
  }, {
    title: "Expert/Lead",
    years: "10+ years",
    salary: "150% increase"
  }];
  return /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onOpenChange: onOpenChange
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-3xl max-h-[90vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, {
    className: "text-2xl"
  }, career.title), /*#__PURE__*/React.createElement(DialogDescription, null, "Complete career path and requirements")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-8 h-8 text-green-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Pakistan Salary"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold"
  }, career.avgSalary), career.globalSalary && /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-muted-foreground"
  }, "Global: ", career.globalSalary))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-8 h-8 text-secondary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Market Growth"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-green-600"
  }, career.growth), /*#__PURE__*/React.createElement(Badge, {
    className: career.demand === "Very High" ? "bg-green-600" : "bg-blue-600"
  }, career.demand, " Demand")))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Where You Can Work")), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, career.location))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Key Skills Required")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, career.skills.map((skill, i) => /*#__PURE__*/React.createElement(Badge, {
    key: i,
    variant: "outline",
    className: "bg-card"
  }, skill))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4"
  }, /*#__PURE__*/React.createElement(Briefcase, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Career Progression Path")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, careerPath.map((level, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0"
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, level.title), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, level.years), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-green-600"
  }, level.salary))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Recommended Degrees")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, relatedDegrees.map((degree, i) => /*#__PURE__*/React.createElement(Badge, {
    key: i,
    variant: "outline",
    className: "bg-primary/5"
  }, degree))), /*#__PURE__*/React.createElement(Link, {
    to: "/degrees"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full mt-4 bg-primary"
  }, "View Degree Programs")))))));
}
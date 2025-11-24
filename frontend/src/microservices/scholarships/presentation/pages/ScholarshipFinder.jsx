import React from 'react';
import { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Award, Search, DollarSign, Calendar, ExternalLink, Heart, ArrowLeft } from "lucide-react";
export function ScholarshipFinder() {
  const [saved, setSaved] = useState([]);
  const scholarships = [{
    id: 1,
    name: "HEC Need-Based Scholarship",
    amount: "Up to PKR 200,000/year",
    deadline: "August 15, 2025",
    eligibility: "Pakistani students with financial need, GPA > 3.0",
    country: "Pakistan",
    type: "Need-based"
  }, {
    id: 2,
    name: "NUST Merit Scholarship",
    amount: "50-100% tuition waiver",
    deadline: "Rolling basis",
    eligibility: "Top performers in NET entry test",
    country: "Pakistan",
    type: "Merit-based"
  }, {
    id: 3,
    name: "Fulbright Scholarship (Pakistan)",
    amount: "$30,000/year",
    deadline: "October 15, 2025",
    eligibility: "Pakistani citizens, GPA > 3.5, leadership potential",
    country: "USA",
    type: "Merit-based"
  }, {
    id: 4,
    name: "LUMS National Outreach Programme",
    amount: "Full tuition + stipend",
    deadline: "June 30, 2025",
    eligibility: "Talented students from underserved areas",
    country: "Pakistan",
    type: "Need & Merit"
  }, {
    id: 5,
    name: "Commonwealth Scholarship",
    amount: "Full funding",
    deadline: "December 15, 2025",
    eligibility: "Pakistani citizens for UK universities",
    country: "UK",
    type: "Merit-based"
  }, {
    id: 6,
    name: "DAAD Scholarship (Pakistan)",
    amount: "€850/month",
    deadline: "November 30, 2025",
    eligibility: "Pakistani graduates for German universities",
    country: "Germany",
    type: "Merit-based"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => window.history.back(),
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back"), /*#__PURE__*/React.createElement("div", {
    className: "mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-6 h-6 sm:w-8 sm:h-8 text-white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-4xl font-bold"
  }, "Scholarship Finder"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-muted-foreground"
  }, "Find funding for Pakistani & international universities")))), /*#__PURE__*/React.createElement(Card, {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative md:col-span-2"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search scholarships...",
    className: "pl-10"
  })), /*#__PURE__*/React.createElement(Input, {
    placeholder: "GPA"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Country"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6"
  }, scholarships.map(scholarship => /*#__PURE__*/React.createElement(Card, {
    key: scholarship.id,
    className: "hover:shadow-xl transition-all border-2 hover:border-primary/50"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-2"
  }, scholarship.name), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement(Badge, null, scholarship.country), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, scholarship.type))), /*#__PURE__*/React.createElement(Button, {
    size: "icon",
    variant: saved.includes(scholarship.id) ? "default" : "outline",
    onClick: () => setSaved(prev => prev.includes(scholarship.id) ? prev.filter(i => i !== scholarship.id) : [...prev, scholarship.id])
  }, /*#__PURE__*/React.createElement(Heart, {
    className: `w-5 h-5 ${saved.includes(scholarship.id) ? "fill-current" : ""}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-5 h-5 text-green-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Amount"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, scholarship.amount))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Deadline"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, scholarship.deadline)))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-muted/50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Eligibility"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, scholarship.eligibility))), /*#__PURE__*/React.createElement("div", {
    className: "md:w-48 flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "bg-primary"
  }, /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 mr-2"
  }), "Apply Now"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Learn More")))))))));
}
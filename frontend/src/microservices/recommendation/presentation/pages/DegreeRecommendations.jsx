import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { GraduationCap, TrendingUp, Clock, DollarSign, Search, Filter, Star, Building2, ArrowRight, ArrowLeft } from "lucide-react";
export function DegreeRecommendations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const degrees = [{
    id: 1,
    name: "Computer Science",
    field: "Technology",
    match: 95,
    duration: "4 years",
    avgSalary: "PKR 80K-150K/mo",
    globalSalary: "$60K-95K/yr",
    growth: "+25%",
    topUniversities: ["NUST", "FAST", "LUMS", "MIT"],
    description: "Study algorithms, programming, AI, and software development",
    requirements: "Strong math and logical thinking skills, FSc Pre-Engineering or ICS"
  }, {
    id: 2,
    name: "Data Science",
    field: "Technology",
    match: 92,
    duration: "4 years",
    avgSalary: "PKR 100K-200K/mo",
    globalSalary: "$70K-110K/yr",
    growth: "+30%",
    topUniversities: ["LUMS", "NUST", "IBA", "Berkeley"],
    description: "Analyze complex data sets and build predictive AI models",
    requirements: "Math, statistics, and programming (FSc Pre-Engineering/ICS)"
  }, {
    id: 3,
    name: "Electrical Engineering",
    field: "Engineering",
    match: 88,
    duration: "4 years",
    avgSalary: "PKR 60K-120K/mo",
    globalSalary: "$55K-90K/yr",
    growth: "+12%",
    topUniversities: ["UET Lahore", "NUST", "GIKI", "MIT"],
    description: "Design electrical systems, power grids, and electronics",
    requirements: "FSc Pre-Engineering with Physics, Chemistry, Mathematics"
  }, {
    id: 4,
    name: "Business Administration (BBA)",
    field: "Business",
    match: 85,
    duration: "4 years",
    avgSalary: "PKR 50K-100K/mo",
    globalSalary: "$45K-80K/yr",
    growth: "+15%",
    topUniversities: ["IBA Karachi", "LUMS", "NUST", "Wharton"],
    description: "Learn management, marketing, finance, and entrepreneurship",
    requirements: "FSc, ICS, or I.Com with good grades"
  }, {
    id: 5,
    name: "Civil Engineering",
    field: "Engineering",
    match: 82,
    duration: "4 years",
    avgSalary: "PKR 50K-100K/mo",
    globalSalary: "$50K-85K/yr",
    growth: "+8%",
    topUniversities: ["UET Lahore", "NED Karachi", "NUST"],
    description: "Build infrastructure, bridges, roads, and buildings",
    requirements: "FSc Pre-Engineering with strong physics and math"
  }, {
    id: 6,
    name: "Software Engineering",
    field: "Technology",
    match: 90,
    duration: "4 years",
    avgSalary: "PKR 70K-140K/mo",
    globalSalary: "$55K-90K/yr",
    growth: "+23%",
    topUniversities: ["FAST", "COMSATS", "NUST", "Carnegie Mellon"],
    description: "Develop software applications, mobile apps, and systems",
    requirements: "ICS or FSc Pre-Engineering with programming aptitude"
  }];
  const filteredDegrees = degrees.filter(degree => {
    const matchesSearch = degree.name.toLowerCase().includes(searchTerm.toLowerCase()) || degree.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = fieldFilter === "all" || degree.field === fieldFilter;
    const matchesDuration = durationFilter === "all" || degree.duration === durationFilter;
    return matchesSearch && matchesField && matchesDuration;
  });
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
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    className: "w-6 h-6 sm:w-8 sm:h-8 text-white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-4xl font-bold"
  }, "Recommended Degrees for You"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-muted-foreground"
  }, "Based on your personality profile - for Pakistan & abroad"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4 flex items-center gap-4"
  }, /*#__PURE__*/React.createElement(Star, {
    className: "w-8 h-8 text-primary flex-shrink-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium"
  }, "Match scores are calculated based on your quiz results, interests, and career goals"))))), /*#__PURE__*/React.createElement(Card, {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search degrees...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "pl-10"
  })), /*#__PURE__*/React.createElement(Select, {
    value: fieldFilter,
    onValueChange: setFieldFilter
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full md:w-48"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4 mr-2"
  }), /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Field"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Fields"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Technology"
  }, "Technology"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Engineering"
  }, "Engineering"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Science"
  }, "Science"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Business"
  }, "Business"))), /*#__PURE__*/React.createElement(Select, {
    value: durationFilter,
    onValueChange: setDurationFilter
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full md:w-48"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4 mr-2"
  }), /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Duration"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "Any Duration"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "2 years"
  }, "2 years"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "3 years"
  }, "3 years"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "4 years"
  }, "4 years")))))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Showing ", filteredDegrees.length, " degree", filteredDegrees.length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Sort by: Match %")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6"
  }, filteredDegrees.map(degree => /*#__PURE__*/React.createElement(Card, {
    key: degree.id,
    className: "hover:shadow-xl transition-all hover:scale-[1.01] border-2 hover:border-primary/50"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold"
  }, degree.name), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary"
  }, degree.match, "% Match")), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, degree.field))), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground mb-4"
  }, degree.description), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs sm:text-sm text-muted-foreground"
  }, "Duration"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-sm sm:text-base"
  }, degree.duration))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs sm:text-sm text-muted-foreground"
  }, "Pakistan Salary"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-sm sm:text-base"
  }, degree.avgSalary), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-muted-foreground"
  }, "Global: ", degree.globalSalary))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs sm:text-sm text-muted-foreground"
  }, "Job Growth"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-green-600 text-sm sm:text-base"
  }, degree.growth)))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-muted/50 rounded-lg mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Requirements"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, degree.requirements)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Building2, {
    className: "w-4 h-4"
  }), "Top Universities Offering This Degree"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, degree.topUniversities.map((uni, index) => /*#__PURE__*/React.createElement(Badge, {
    key: index,
    variant: "outline",
    className: "bg-card"
  }, uni))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:w-48 flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/universities"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-primary hover:bg-primary/90"
  }, "View Universities", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "ml-2 w-4 h-4"
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, "Save Degree"), /*#__PURE__*/React.createElement(Link, {
    to: "/careers"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, "Career Paths")))))))), filteredDegrees.length === 0 && /*#__PURE__*/React.createElement(Card, {
    className: "p-12 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-4"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-2"
  }, "No degrees found"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground mb-4"
  }, "Try adjusting your filters or search terms"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setSearchTerm("");
      setFieldFilter("all");
      setDurationFilter("all");
    }
  }, "Clear Filters"))));
}
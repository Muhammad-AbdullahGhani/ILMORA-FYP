import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Building2, MapPin, DollarSign, Star, TrendingUp, Search, Filter, Heart, ArrowRight, ArrowLeft, Users, Award } from "lucide-react";
import { ImageWithFallback } from "@/shared/components/ImageWithFallback";
import { CompareDialog } from "@/shared/components/CompareDialog";
export function UniversityRecommendations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [saved, setSaved] = useState([]);
  const universities = [{
    id: 1,
    name: "National University of Sciences & Technology (NUST)",
    location: "Islamabad",
    country: "Pakistan",
    image: "https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tuitionFee: "PKR 250,000/year",
    match: 95,
    sentiment: 4.7,
    ranking: "#1 in Pakistan",
    accreditation: "HEC, PEC",
    programsOffered: ["Computer Science", "Engineering", "Business"],
    studentsCount: "18,000"
  }, {
    id: 2,
    name: "Lahore University of Management Sciences (LUMS)",
    location: "Lahore",
    country: "Pakistan",
    image: "https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tuitionFee: "PKR 400,000/year",
    match: 93,
    sentiment: 4.6,
    ranking: "#2 in Pakistan",
    accreditation: "HEC",
    programsOffered: ["Computer Science", "Business", "Economics"],
    studentsCount: "5,500"
  }, {
    id: 3,
    name: "FAST National University",
    location: "Islamabad, Karachi, Lahore",
    country: "Pakistan",
    image: "https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tuitionFee: "PKR 200,000/year",
    match: 90,
    sentiment: 4.4,
    ranking: "#3 in CS Pakistan",
    accreditation: "HEC, PEC",
    programsOffered: ["Computer Science", "Software Engineering", "AI"],
    studentsCount: "12,000"
  }, {
    id: 4,
    name: "Massachusetts Institute of Technology (MIT)",
    location: "Cambridge, MA",
    country: "USA",
    image: "https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tuitionFee: "$55,000/year",
    match: 92,
    sentiment: 4.8,
    ranking: "#1 Global",
    accreditation: "AACSB, ABET",
    programsOffered: ["Computer Science", "Engineering", "AI"],
    studentsCount: "11,934"
  }, {
    id: 5,
    name: "Institute of Business Administration (IBA) Karachi",
    location: "Karachi",
    country: "Pakistan",
    image: "https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tuitionFee: "PKR 300,000/year",
    match: 88,
    sentiment: 4.5,
    ranking: "#1 Business School",
    accreditation: "HEC, AACSB",
    programsOffered: ["Business", "Economics", "Computer Science"],
    studentsCount: "6,500"
  }, {
    id: 6,
    name: "University of Engineering & Technology (UET) Lahore",
    location: "Lahore",
    country: "Pakistan",
    image: "https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tuitionFee: "PKR 150,000/year",
    match: 85,
    sentiment: 4.3,
    ranking: "#1 Engineering",
    accreditation: "HEC, PEC",
    programsOffered: ["Civil Engineering", "Electrical Engineering", "Mechanical"],
    studentsCount: "20,000"
  }];
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || uni.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter === "all" || uni.location.includes(cityFilter);
    return matchesSearch && matchesCity;
  });
  const toggleSave = id => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const toggleUniversitySelection = id => {
    setSelectedUniversities(prev => prev.includes(id) ? prev.filter(uniId => uniId !== id) : [...prev, id]);
  };
  const getSelectedUniversitiesData = () => {
    return universities.filter(uni => selectedUniversities.includes(uni.id));
  };
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
  }, /*#__PURE__*/React.createElement(Building2, {
    className: "w-6 h-6 sm:w-8 sm:h-8 text-white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-4xl font-bold"
  }, "University Recommendations"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-muted-foreground"
  }, "Top universities in Pakistan & abroad matching your profile")))), /*#__PURE__*/React.createElement(Card, {
    className: "mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-3 sm:gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search universities...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "pl-9 sm:pl-10 text-sm sm:text-base"
  })), /*#__PURE__*/React.createElement(Select, {
    value: cityFilter,
    onValueChange: setCityFilter
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full sm:w-48"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4 mr-2"
  }), /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Location"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Locations"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Islamabad"
  }, "Islamabad"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Lahore"
  }, "Lahore"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Karachi"
  }, "Karachi"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Cambridge"
  }, "Cambridge, USA"))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "sm:size-default"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4 mr-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "More "), "Filters")))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-muted-foreground"
  }, "Showing ", filteredUniversities.length, " universit", filteredUniversities.length !== 1 ? "ies" : "y", selectedUniversities.length > 0 && ` • ${selectedUniversities.length} selected`), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "text-xs sm:text-sm",
    disabled: selectedUniversities.length < 2,
    onClick: () => setCompareDialogOpen(true)
  }, "Compare Selected (", selectedUniversities.length, ")"), selectedUniversities.length > 0 && /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    className: "text-xs sm:text-sm",
    onClick: () => setSelectedUniversities([])
  }, "Clear"))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6"
  }, filteredUniversities.map(university => /*#__PURE__*/React.createElement(Card, {
    key: university.id,
    className: `hover:shadow-xl transition-all border-2 overflow-hidden ${selectedUniversities.includes(university.id) ? 'border-primary shadow-lg' : 'hover:border-primary/50'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:w-80 h-64 lg:h-auto relative overflow-hidden"
  }, /*#__PURE__*/React.createElement(ImageWithFallback, {
    src: university.image,
    alt: university.name,
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-4 right-4 flex gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: selectedUniversities.includes(university.id),
    onCheckedChange: () => toggleUniversitySelection(university.id)
  })), /*#__PURE__*/React.createElement(Button, {
    size: "icon",
    variant: saved.includes(university.id) ? "default" : "secondary",
    className: "rounded-full shadow-lg",
    onClick: () => toggleSave(university.id)
  }, /*#__PURE__*/React.createElement(Heart, {
    className: `w-5 h-5 ${saved.includes(university.id) ? "fill-current" : ""}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-4 left-4"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary shadow-lg"
  }, university.match, "% Match"))), /*#__PURE__*/React.createElement(CardContent, {
    className: "flex-1 p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col h-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-2"
  }, university.name), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4"
  }), university.location), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, university.ranking)))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-5 h-5 text-green-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Tuition Fee"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, university.tuitionFee))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Star, {
    className: "w-5 h-5 text-secondary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Sentiment Rating"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium flex items-center gap-1"
  }, university.sentiment, "/5.0", /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 text-green-600"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Total Students"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, university.studentsCount))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-5 h-5 text-accent"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Accreditation"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, university.accreditation)))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-2"
  }, "Programs You're Interested In:"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, university.programsOffered.map((program, index) => /*#__PURE__*/React.createElement(Badge, {
    key: index,
    variant: "outline",
    className: "bg-card"
  }, program))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3 pt-4 border-t"
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/university/${university.id}`,
    className: "flex-1 min-w-[200px]"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-primary hover:bg-primary/90"
  }, "View Details", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "ml-2 w-4 h-4"
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "flex-1 min-w-[120px]"
  }, "Compare"), /*#__PURE__*/React.createElement(Link, {
    to: "/scholarships",
    className: "flex-1 min-w-[150px]"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, "Find Scholarships"))))))))), /*#__PURE__*/React.createElement(Card, {
    className: "mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-2"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6 text-center"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-12 h-12 mx-auto mb-3 text-primary"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold mb-2"
  }, "View on Map"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground mb-4"
  }, "See all universities plotted on an interactive map"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Open Map View"))), /*#__PURE__*/React.createElement(CompareDialog, {
    open: compareDialogOpen,
    onOpenChange: setCompareDialogOpen,
    universities: getSelectedUniversitiesData()
  })));
}
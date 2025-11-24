import React from 'react';
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { MapPin, DollarSign, Star, Users, Home, BookOpen, Heart, Share2, ExternalLink, TrendingUp, ThumbsUp, MessageSquare, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "@/shared/components/ImageWithFallback";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
export function UniversityDetail() {
  const {
    id
  } = useParams();
  const sentimentData = [{
    category: "Faculty Quality",
    score: 4.8
  }, {
    category: "Infrastructure",
    score: 4.6
  }, {
    category: "Placement",
    score: 4.7
  }, {
    category: "Campus Life",
    score: 4.5
  }, {
    category: "Management",
    score: 4.3
  }];
  const reviewDistribution = [{
    name: "5 Star",
    value: 65,
    color: "#10b981"
  }, {
    name: "4 Star",
    value: 20,
    color: "#3b82f6"
  }, {
    name: "3 Star",
    value: 10,
    color: "#f59e0b"
  }, {
    name: "2 Star",
    value: 3,
    color: "#ef4444"
  }, {
    name: "1 Star",
    value: 2,
    color: "#dc2626"
  }];
  const programs = [{
    name: "Computer Science",
    duration: "4 years",
    fee: "$55,000/year",
    seats: 120
  }, {
    name: "Data Science",
    duration: "4 years",
    fee: "$56,000/year",
    seats: 80
  }, {
    name: "Mechanical Engineering",
    duration: "4 years",
    fee: "$54,000/year",
    seats: 100
  }, {
    name: "Electrical Engineering",
    duration: "4 years",
    fee: "$54,000/year",
    seats: 90
  }];
  const scholarships = [{
    name: "Merit Scholarship",
    amount: "$20,000",
    eligibility: "GPA > 3.8"
  }, {
    name: "Need-Based Aid",
    amount: "$15,000",
    eligibility: "Financial need"
  }, {
    name: "Diversity Scholarship",
    amount: "$10,000",
    eligibility: "Underrepresented groups"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => window.history.back(),
    className: "absolute top-4 left-4 z-50 shadow-lg"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back"), /*#__PURE__*/React.createElement("div", {
    className: "relative h-64 sm:h-80 md:h-96 overflow-hidden"
  }, /*#__PURE__*/React.createElement(ImageWithFallback, {
    src: "https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "University",
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 mb-3 md:mb-4"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary text-xs sm:text-sm"
  }, "95% Match"), /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary",
    className: "text-xs sm:text-sm"
  }, "#1 in Pakistan")), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight"
  }, "National University of Sciences & Technology (NUST)"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-white/90"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4 sm:w-5 sm:h-5"
  }), "Islamabad, Pakistan"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4 sm:w-5 sm:h-5"
  }), "18,000 Students"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement(Star, {
    className: "w-4 h-4 sm:w-5 sm:h-5 fill-current"
  }), "4.7/5.0 Rating"))))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto p-2 sm:p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "overview",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-5 mb-4 sm:mb-6 md:mb-8 h-auto"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "overview",
    className: "text-xs sm:text-sm px-1 sm:px-3 py-2"
  }, "Overview"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "programs",
    className: "text-xs sm:text-sm px-1 sm:px-3 py-2"
  }, "Programs"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "sentiments",
    className: "text-xs sm:text-sm px-1 sm:px-3 py-2"
  }, "Reviews"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "scholarships",
    className: "text-xs sm:text-sm px-1 sm:px-3 py-2"
  }, "Aid"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "hostels",
    className: "text-xs sm:text-sm px-1 sm:px-3 py-2"
  }, "Housing")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "overview"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "About the University")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground leading-relaxed"
  }, "The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. Established in 1861, MIT has played a key role in the development of modern technology and science, ranking it among the most prestigious academic institutions in the world."), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4 pt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-muted/50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Founded"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "1861")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-muted/50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Campus Size"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "168 acres")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-muted/50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Student-Faculty Ratio"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "3:1")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-muted/50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Accreditation"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, "AACSB, ABET, NEASC")))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "programs"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Available Programs")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, programs.map((program, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-4 border-2 rounded-lg hover:border-primary/50 transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-lg"
  }, program.name), /*#__PURE__*/React.createElement(Badge, null, program.seats, " seats")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, "Duration:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, program.duration)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-4 h-4 text-green-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, "Fee:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, program.fee))))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "sentiments"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Student & Alumni Sentiments")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold mb-4"
  }, "Rating Breakdown"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 250
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: sentimentData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "hsl(var(--border))",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "category",
    tick: {
      fontSize: 10,
      fill: "hsl(var(--foreground))",
      fontWeight: 600
    },
    angle: -45,
    textAnchor: "end",
    height: 80
  }), /*#__PURE__*/React.createElement(YAxis, {
    domain: [0, 5],
    tick: {
      fill: "hsl(var(--foreground))",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "hsl(var(--card))",
      border: "2px solid #1976D2",
      borderRadius: "12px",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "score",
    fill: "#1976D2",
    radius: [8, 8, 0, 0]
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold mb-4"
  }, "Review Distribution"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 250
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: reviewDistribution,
    cx: "50%",
    cy: "50%",
    labelLine: false,
    label: entry => `${entry.name}: ${entry.value}%`,
    outerRadius: 80,
    fill: "#8884d8",
    dataKey: "value"
  }, reviewDistribution.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  }))), /*#__PURE__*/React.createElement(Tooltip, null))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, [1, 2].map(review => /*#__PURE__*/React.createElement("div", {
    key: review,
    className: "p-4 bg-muted/30 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, [1, 2, 3, 4, 5].map(star => /*#__PURE__*/React.createElement(Star, {
    key: star,
    className: "w-4 h-4 fill-current text-secondary"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Amazing Experience!")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mb-2"
  }, "The faculty is world-class and the research opportunities are unmatched. Highly recommend for anyone serious about STEM fields."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 text-xs text-muted-foreground"
  }, /*#__PURE__*/React.createElement("span", null, "John Doe - Class of 2023"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(ThumbsUp, {
    className: "w-3 h-3"
  }), "245")))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "scholarships"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Available Scholarships")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, scholarships.map((scholarship, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-4 border-2 rounded-lg hover:border-primary/50 transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold"
  }, scholarship.name), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-600"
  }, scholarship.amount)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mb-3"
  }, "Eligibility: ", scholarship.eligibility), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "Apply Now"))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "hostels"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Nearby Accommodation")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground mb-4"
  }, "Find student housing and hostels near the campus"), /*#__PURE__*/React.createElement(Link, {
    to: "/hostels"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "bg-primary"
  }, /*#__PURE__*/React.createElement(Home, {
    className: "w-4 h-4 mr-2"
  }), "Browse Hostels"))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Quick Actions")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-primary"
  }, /*#__PURE__*/React.createElement(Heart, {
    className: "w-4 h-4 mr-2"
  }), "Add to Favorites"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(Share2, {
    className: "w-4 h-4 mr-2"
  }), "Share University"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 mr-2"
  }), "Visit Website"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    className: "w-4 h-4 mr-2"
  }), "Contact Admissions"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Key Stats")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "Overall Rating"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary"
  }, "4.8/5.0")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, [1, 2, 3, 4, 5].map(star => /*#__PURE__*/React.createElement(Star, {
    key: star,
    className: "w-4 h-4 fill-current text-secondary"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Acceptance Rate"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold"
  }, "7%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Average GPA"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold"
  }, "3.95")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Job Placement"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold flex items-center gap-1"
  }, "98%", /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 text-green-600"
  })))))))));
}
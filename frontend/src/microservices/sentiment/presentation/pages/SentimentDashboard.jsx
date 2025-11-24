import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
export function SentimentDashboard() {
  const sentimentData = [{
    category: "Faculty",
    score: 4.5,
    color: "#1976D2"
  }, {
    category: "Infrastructure",
    score: 4.2,
    color: "#FB8C00"
  }, {
    category: "Placement",
    score: 4.7,
    color: "#0D47A1"
  }, {
    category: "Campus Life",
    score: 4.3,
    color: "#2196F3"
  }, {
    category: "Management",
    score: 3.9,
    color: "#FFA726"
  }];
  const universityComparison = [{
    name: "MIT",
    overall: 4.8
  }, {
    name: "Stanford",
    overall: 4.7
  }, {
    name: "Harvard",
    overall: 4.6
  }, {
    name: "Berkeley",
    overall: 4.4
  }, {
    name: "CMU",
    overall: 4.5
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
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
  }, "Sentiment Analytics"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-muted-foreground"
  }, "Student and alumni feedback from Pakistani universities")), /*#__PURE__*/React.createElement(Card, {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-4"
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "all"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-48"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Field"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Fields"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "tech"
  }, "Technology"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "eng"
  }, "Engineering"))), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "all"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-48"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "City"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Cities"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "cambridge"
  }, "Cambridge"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "stanford"
  }, "Stanford")))))), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Sentiment Categories"), /*#__PURE__*/React.createElement(CardDescription, null, "Average ratings across dimensions")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: sentimentData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "hsl(var(--border))",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "category",
    tick: {
      fill: "hsl(var(--foreground))",
      fontWeight: 600
    }
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
    radius: [8, 8, 0, 0]
  }, sentimentData.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  }))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "University Comparison"), /*#__PURE__*/React.createElement(CardDescription, null, "Overall sentiment scores")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: universityComparison,
    layout: "vertical"
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    domain: [0, 5],
    tick: {
      fill: "hsl(var(--foreground))",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "name",
    type: "category",
    width: 80,
    tick: {
      fill: "hsl(var(--foreground))",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "hsl(var(--card))",
      border: "2px solid #FB8C00",
      borderRadius: "12px",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "overall",
    fill: "#FB8C00",
    radius: [0, 8, 8, 0]
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Recent Student Feedback"), /*#__PURE__*/React.createElement(CardDescription, null, "Latest reviews and comments")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, [1, 2, 3].map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    className: "p-4 bg-muted/30 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Badge, null, "MIT"), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, [1, 2, 3, 4, 5].map(star => /*#__PURE__*/React.createElement(Star, {
    key: star,
    className: "w-4 h-4 fill-current text-secondary"
  })))), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-muted-foreground"
  }, "2 days ago")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Excellent research facilities and world-class faculty. The campus culture promotes innovation."))))))));
}
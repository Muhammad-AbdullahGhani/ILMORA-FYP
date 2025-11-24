import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Database, Upload, BarChart3, Users, FileText, Settings, ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export function AdminDashboard() {
  const stats = [{
    label: "Total Users",
    value: "12,543",
    change: "+12%",
    icon: Users
  }, {
    label: "Quiz Completions",
    value: "8,234",
    change: "+8%",
    icon: FileText
  }, {
    label: "Universities",
    value: "542",
    change: "+3%",
    icon: Database
  }, {
    label: "Active Sessions",
    value: "1,234",
    change: "+15%",
    icon: BarChart3
  }];
  const userData = [{
    month: "Jan",
    users: 800
  }, {
    month: "Feb",
    users: 950
  }, {
    month: "Mar",
    users: 1100
  }, {
    month: "Apr",
    users: 1300
  }, {
    month: "May",
    users: 1500
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
    className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
  }, "Admin Dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-muted-foreground"
  }, "Manage platform data and models")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "sm:size-default"
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-4 h-4 mr-2"
  }), "Settings")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-4 gap-6 mb-8"
  }, stats.map((stat, index) => /*#__PURE__*/React.createElement(Card, {
    key: index
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement(stat.icon, {
    className: "w-8 h-8 text-primary"
  }), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-600"
  }, stat.change)), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold mb-1"
  }, stat.value), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, stat.label))))), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "User Growth"), /*#__PURE__*/React.createElement(CardDescription, null, "Monthly active users")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 250
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: userData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    tick: {
      fill: "hsl(var(--foreground))",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
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
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "users",
    stroke: "#1976D2",
    strokeWidth: 3,
    dot: {
      fill: "#1976D2",
      r: 5
    }
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Quick Actions"), /*#__PURE__*/React.createElement(CardDescription, null, "Manage data and models")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full justify-start bg-primary"
  }, /*#__PURE__*/React.createElement(Upload, {
    className: "w-4 h-4 mr-2"
  }), "Upload Dataset"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full justify-start"
  }, /*#__PURE__*/React.createElement(Database, {
    className: "w-4 h-4 mr-2"
  }), "Manage Universities"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full justify-start"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-4 h-4 mr-2"
  }), "View Analytics"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full justify-start"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 mr-2"
  }), "Generate Reports"))))));
}
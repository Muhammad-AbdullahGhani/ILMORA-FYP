import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "./../../../shared/components/ui/button";
import { Progress } from "./../../../shared/components/ui/progress";
import { Badge } from "./../../../shared/components/ui/badge";
import { ClipboardList, GraduationCap, Building2, TrendingUp, Award, Home, Target, CheckCircle2, ArrowRight } from "lucide-react";
export function Dashboard() {
  const quickActions = [{
    title: "Start Career Quiz",
    description: "Discover your perfect career path with our AI quiz",
    icon: ClipboardList,
    link: "/quiz-intro",
    color: "from-blue-500 to-blue-600",
    completed: false
  }, {
    title: "Degree Recommendations",
    description: "View personalized degree suggestions",
    icon: GraduationCap,
    link: "/degrees",
    color: "from-purple-500 to-purple-600",
    completed: true
  }, {
    title: "University Insights",
    description: "Explore top universities for your profile",
    icon: Building2,
    link: "/universities",
    color: "from-orange-500 to-orange-600",
    completed: false
  }];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                  <Link to={action.link}>
                    <Button size="sm" variant={action.completed ? "secondary" : "primary"}>
                      {action.completed ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                      {action.completed ? 'View' : 'Start'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
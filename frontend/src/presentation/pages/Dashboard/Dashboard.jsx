import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { userProgressService } from "@/shared/services/userProgressService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "./../../../shared/components/ui/button";
import { Progress } from "./../../../shared/components/ui/progress";
import { Badge } from "./../../../shared/components/ui/badge";
import { 
  ClipboardList, GraduationCap, Building2, TrendingUp, 
  Award, Home, Target, CheckCircle2, ArrowRight 
} from "lucide-react";

// This is the correct way — named export + const arrow function
export const Dashboard = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState(
    userProgressService.getDefaultProgress()
  );

  // Load user progress on mount and when user changes
  useEffect(() => {
    if (user?.id || user?.email) {
      const userId = user.id || user.email;
      const progress = userProgressService.getProgress(userId);
      setUserProgress(progress);
    }
  }, [user]);

  const quickActions = [
    {
      title: "Start Career Quiz",
      description: "Discover your perfect career path with our AI quiz",
      icon: ClipboardList,
      link: "/quiz-intro",
      color: "from-blue-500 to-blue-600",
      completed: userProgress.quizCompleted
    },
    {
      title: "Degree Recommendations",
      description: "View personalized degree suggestions",
      icon: GraduationCap,
      link: "/degrees",
      color: "from-purple-500 to-purple-600",
      completed: userProgress.degreeRecommendationsViewed
    },
    {
      title: "University Insights",
      description: "Explore top universities for your profile",
      icon: Building2,
      link: "/universities",
      color: "from-orange-500 to-orange-600",
      completed: userProgress.universityInsightsViewed
    },
    {
      title: "Career Progress",
      description: "Track your career progress",
      icon: TrendingUp,
      link: "/progress",
      color: "from-green-500 to-green-600",
      completed: false
    },
    {
      title: "Achievements",
      description: "View your achievements",
      icon: Award,
      link: "/achievements",
      color: "from-yellow-500 to-yellow-600",
      completed: false
    },
    {
      title: "Home Page",
      description: "Go to the home page",
      icon: Home,
      link: "/",
      color: "from-red-500 to-red-600",
      completed: false
    },
    {
      title: "Target Setting",
      description: "Set your career targets",
      icon: Target,
      link: "/targets",
      color: "from-indigo-500 to-indigo-600",
      completed: false
    },
    {
      title: "Checklist",
      description: "Review your checklist",
      icon: CheckCircle2,
      link: "/checklist",
      color: "from-teal-500 to-teal-600",
      completed: false
    },
    {
      title: "Next Steps",
      description: "View your next steps",
      icon: ArrowRight,
      link: "/next-steps",
      color: "from-pink-500 to-pink-600",
      completed: false
    }
  ];

  // Calculate completion percentage
  const completedCount = quickActions.filter(action => action.completed).length;
  const totalCount = quickActions.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-semibold text-3xl mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        {completedCount > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                Your Progress: {completedCount} of {totalCount} completed
              </p>
              <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {action.title}
                  {action.completed && <Badge className="ml-2">Completed</Badge>}
                </CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Go to {action.title} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

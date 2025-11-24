// import React from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
// import { Button } from "./../../../shared/components/ui/button";
// import { Progress } from "./../../../shared/components/ui/progress";
// import { Badge } from "./../../../shared/components/ui/badge";
// import { ClipboardList, GraduationCap, Building2, TrendingUp, Award, Home, Target, CheckCircle2, ArrowRight } from "lucide-react";
// export function Dashboard() {
//   const quickActions = [{
//     title: "Start Career Quiz",
//     description: "Discover your perfect career path with our AI quiz",
//     icon: ClipboardList,
//     link: "/quiz-intro",
//     color: "from-blue-500 to-blue-600",
//     completed: false
//   }, {
//     title: "Degree Recommendations",
//     description: "View personalized degree suggestions",
//     icon: GraduationCap,
//     link: "/degrees",
//     color: "from-purple-500 to-purple-600",
//     completed: true
//   }, {
//     title: "University Insights",
//     description: "Explore top universities for your profile",
//     icon: Building2,
//     link: "/universities",
//     color: "from-orange-500 to-orange-600",
//     completed: false
//   }, {
//     title: "Career Trends",
//     description: "Research salary data and job market trends",
//     icon: TrendingUp,
//     link: "/careers",
//     color: "from-green-500 to-green-600",
//     completed: false
//   }, {
//     title: "Find Scholarships",
//     description: "Discover scholarships matching your profile",
//     icon: Award,
//     link: "/scholarships",
//     color: "from-pink-500 to-pink-600",
//     completed: false
//   }, {
//     title: "Hostel Finder",
//     description: "Find accommodation near your university",
//     icon: Home,
//     link: "/hostels",
//     color: "from-teal-500 to-teal-600",
//     completed: false
//   }];
//   const profileProgress = {
//     completed: 65,
//     items: [{
//       name: "Profile Information",
//       completed: true
//     }, {
//       name: "Career Quiz",
//       completed: true
//     }, {
//       name: "Degree Preferences",
//       completed: false
//     }, {
//       name: "University Shortlist",
//       completed: false
//     }]
//   };
//   const recentActivity = [{
//     action: "Completed Career Quiz",
//     time: "2 hours ago",
//     type: "success"
//   }, {
//     action: "Viewed Computer Science programs",
//     time: "Yesterday",
//     type: "info"
//   }, {
//     action: "Saved MIT to favorites",
//     time: "2 days ago",
//     type: "info"
//   }, {
//     action: "Applied for scholarship",
//     time: "3 days ago",
//     type: "success"
//   }];
//   return /*#__PURE__*/React.createElement("div", {
//     className: "min-h-screen bg-muted/30 p-4 md:p-8"
//   }, /*#__PURE__*/React.createElement("div", {
//     className: "max-w-7xl mx-auto"
//   }, /*#__PURE__*/React.createElement("div", {
//     className: "mb-8"
//   }, /*#__PURE__*/React.createElement("h1", {
//     className: "text-4xl font-bold mb-2"
//   }, "Welcome back, John! \uD83D\uDC4B"), /*#__PURE__*/React.createElement("p", {
//     className: "text-muted-foreground text-lg"
//   }, "Continue your journey to finding the perfect university")), /*#__PURE__*/React.createElement(Card, {
//     className: "mb-8 border-2 border-primary/20"
//   }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
//     className: "flex items-center justify-between"
//   }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, null, "Your Progress"), /*#__PURE__*/React.createElement(CardDescription, null, "Complete your profile to get better recommendations")), /*#__PURE__*/React.createElement("div", {
//     className: "text-right"
//   }, /*#__PURE__*/React.createElement("div", {
//     className: "text-3xl font-bold text-primary"
//   }, profileProgress.completed, "%"), /*#__PURE__*/React.createElement("div", {
//     className: "text-sm text-muted-foreground"
//   }, "Complete")))), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Progress, {
//     value: profileProgress.completed,
//     className: "mb-4 h-3"
//   }), /*#__PURE__*/React.createElement("div", {
//     className: "grid md:grid-cols-4 gap-4"
//   }, profileProgress.items.map((item, index) => /*#__PURE__*/React.createElement("div", {
//     key: index,
//     className: "flex items-center gap-2"
//   }, item.completed ? /*#__PURE__*/React.createElement(CheckCircle2, {
//     className: "w-5 h-5 text-green-500"
//   }) : /*#__PURE__*/React.createElement("div", {
//     className: "w-5 h-5 rounded-full border-2 border-muted-foreground/30"
//   }), /*#__PURE__*/React.createElement("span", {
//     className: item.completed ? "text-sm" : "text-sm text-muted-foreground"
//   }, item.name)))))), /*#__PURE__*/React.createElement("div", {
//     className: "mb-8"
//   }, /*#__PURE__*/React.createElement("h2", {
//     className: "text-2xl font-bold mb-4"
//   }, "Quick Actions"), /*#__PURE__*/React.createElement("div", {
//     className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//   }, quickActions.map((action, index) => /*#__PURE__*/React.createElement(Link, {
//     key: index,
//     to: action.link
//   }, /*#__PURE__*/React.createElement(Card, {
//     className: "group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary/50 cursor-pointer h-full"
//   }, /*#__PURE__*/React.createElement(CardContent, {
//     className: "p-6"
//   }, /*#__PURE__*/React.createElement("div", {
//     className: "flex items-start justify-between mb-4"
//   }, /*#__PURE__*/React.createElement("div", {
//     className: `w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`
//   }, /*#__PURE__*/React.createElement(action.icon, {
//     className: "w-7 h-7 text-white"
//   })), action.completed && /*#__PURE__*/React.createElement(Badge, {
//     variant: "outline",
//     className: "bg-green-50 text-green-700 border-green-200"
//   }, "Completed")), /*#__PURE__*/React.createElement("h3", {
//     className: "font-semibold mb-2 group-hover:text-primary transition-colors"
//   }, action.title), /*#__PURE__*/React.createElement("p", {
//     className: "text-sm text-muted-foreground mb-4"
//   }, action.description), /*#__PURE__*/React.createElement("div", {
//     className: "flex items-center text-primary text-sm font-medium"
//   }, "Start ", /*#__PURE__*/React.createElement(ArrowRight, {
//     className: "w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
//   })))))))), /*#__PURE__*/React.createElement("div", {
//     className: "grid md:grid-cols-2 gap-6"
//   }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Recent Activity"), /*#__PURE__*/React.createElement(CardDescription, null, "Your latest actions on the platform")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
//     className: "space-y-4"
//   }, recentActivity.map((activity, index) => /*#__PURE__*/React.createElement("div", {
//     key: index,
//     className: "flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
//   }, /*#__PURE__*/React.createElement("div", {
//     className: `w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`
//   }), /*#__PURE__*/React.createElement("div", {
//     className: "flex-1"
//   }, /*#__PURE__*/React.createElement("p", null, activity.action), /*#__PURE__*/React.createElement("p", {
//     className: "text-sm text-muted-foreground"
//   }, activity.time))))), /*#__PURE__*/React.createElement(Button, {
//     variant: "ghost",
//     className: "w-full mt-4"
//   }, "View All Activity"))), /*#__PURE__*/React.createElement(Card, {
//     className: "bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-2"
//   }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
//     className: "flex items-center gap-2"
//   }, /*#__PURE__*/React.createElement(Target, {
//     className: "w-6 h-6 text-primary"
//   }), "Recommended Next Steps"), /*#__PURE__*/React.createElement(CardDescription, null, "Actions to help you move forward")), /*#__PURE__*/React.createElement(CardContent, {
//     className: "space-y-4"
//   }, /*#__PURE__*/React.createElement("div", {
//     className: "p-4 bg-card rounded-lg border"
//   }, /*#__PURE__*/React.createElement("h4", {
//     className: "font-semibold mb-2"
//   }, "Complete Degree Preferences"), /*#__PURE__*/React.createElement("p", {
//     className: "text-sm text-muted-foreground mb-3"
//   }, "Tell us more about your preferred fields of study"), /*#__PURE__*/React.createElement(Button, {
//     size: "sm",
//     className: "bg-primary"
//   }, "Complete Now")), /*#__PURE__*/React.createElement("div", {
//     className: "p-4 bg-card rounded-lg border"
//   }, /*#__PURE__*/React.createElement("h4", {
//     className: "font-semibold mb-2"
//   }, "Shortlist Universities"), /*#__PURE__*/React.createElement("p", {
//     className: "text-sm text-muted-foreground mb-3"
//   }, "Save universities you're interested in"), /*#__PURE__*/React.createElement(Link, {
//     to: "/universities"
//   }, /*#__PURE__*/React.createElement(Button, {
//     size: "sm",
//     variant: "outline"
//   }, "Browse Universities"))), /*#__PURE__*/React.createElement("div", {
//     className: "p-4 bg-card rounded-lg border"
//   }, /*#__PURE__*/React.createElement("h4", {
//     className: "font-semibold mb-2"
//   }, "Explore Scholarships"), /*#__PURE__*/React.createElement("p", {
//     className: "text-sm text-muted-foreground mb-3"
//   }, "Find funding opportunities for your education"), /*#__PURE__*/React.createElement(Link, {
//     to: "/scholarships"
//   }, /*#__PURE__*/React.createElement(Button, {
//     size: "sm",
//     variant: "outline"
//   }, "Find Scholarships"))))))));
// }



















import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "./../../../shared/components/ui/button";
import { Progress } from "./../../../shared/components/ui/progress";
import { Badge } from "./../../../shared/components/ui/badge";
import { ClipboardList, GraduationCap, Building2, TrendingUp, Award, Home, Target, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

export function Dashboard() {
  const { user } = useAuth(); // Get the logged-in user
  
  // State to hold the user's dynamic profile data
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- This hook simulates fetching data when the component loads ---
  useEffect(() => {
    // In a real app, this would be an API call:
    // const fetchProfile = async () => {
    //   try {
    //     const profileData = await api.get(`/profile/${user.id}`);
    //     setUserProfile(profileData);
    //   } catch (err) {
    //     console.error("Failed to fetch profile", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchProfile();

    // --- We will simulate it for now ---
    const simulateFetch = () => {
      const mockProfileData = {
        progressPercent: 75,
        hasFilledProfile: true,
        hasCompletedQuiz: true,
        hasSetDegreePreferences: true,
        hasShortlistedUniversities: false, // Try changing this to true!
        recentActivity: [
          { action: "Set Degree Preferences", time: "1 hour ago", type: "success" },
          { action: "Completed Career Quiz", time: "2 hours ago", type: "success" },
          { action: "Viewed Computer Science programs", time: "Yesterday", type: "info" },
          { action: "Saved MIT to favorites", time: "2 days ago", type: "info" },
        ]
      };

      setUserProfile(mockProfileData);
      setLoading(false);
    };

    const timer = setTimeout(simulateFetch, 800); // Simulate network delay
    return () => clearTimeout(timer); // Cleanup
  }, [user]); // Re-fetch if the user changes (though user.id should be used)

  // --- 1. GET THE USER'S FIRST NAME ---
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  // --- Show a loading spinner while fetching data ---
  if (loading || !userProfile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-muted-foreground">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  // --- 2. BUILD DYNAMIC DATA (derived from state) ---

  // Profile progress is now built from the fetched userProfile state
  const profileProgress = {
    completed: userProfile.progressPercent,
    items: [
      { name: "Profile Information", completed: userProfile.hasFilledProfile },
      { name: "Career Quiz", completed: userProfile.hasCompletedQuiz },
      { name: "Degree Preferences", completed: userProfile.hasSetDegreePreferences },
      { name: "University Shortlist", completed: userProfile.hasShortlistedUniversities }
    ]
  };

  // Quick actions are now built from the fetched userProfile state
  const quickActions = [
    {
      title: "Start Career Quiz",
      description: "Discover your perfect career path with our AI quiz",
      icon: ClipboardList,
      link: "/quiz-intro",
      color: "from-blue-500 to-blue-600",
      completed: userProfile.hasCompletedQuiz // DYNAMIC
    },
    {
      title: "Degree Recommendations",
      description: "View personalized degree suggestions",
      icon: GraduationCap,
      link: "/degrees",
      color: "from-purple-500 to-purple-600",
      completed: userProfile.hasSetDegreePreferences // DYNAMIC
    },
    {
      title: "University Insights",
      description: "Explore top universities for your profile",
      icon: Building2,
      link: "/universities",
      color: "from-orange-500 to-orange-600",
      completed: userProfile.hasShortlistedUniversities // DYNAMIC
    },
    {
      title: "Career Trends",
      description: "Research salary data and job market trends",
      icon: TrendingUp,
      link: "/careers",
      color: "from-green-500 to-green-600",
      completed: false // This could also be dynamic
    },
    {
      title: "Find Scholarships",
      description: "Discover scholarships matching your profile",
      icon: Award,
      link: "/scholarships",
      color: "from-pink-500 to-pink-600",
      completed: false
    },
    {
      title: "Hostel Finder",
      description: "Find accommodation near your university",
      icon: Home,
      link: "/hostels",
      color: "from-teal-500 to-teal-600",
      completed: false
    }
  ];

  // Recent activity is now from the fetched userProfile state
  const recentActivity = userProfile.recentActivity;

  // --- 3. RENDER THE DYNAMIC COMPONENT ---
  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          {/* --- Uses real name --- */}
          <h1 className="text-4xl font-bold mb-2">Welcome back, {firstName}! 👋</h1>
          <p className="text-muted-foreground text-lg">Continue your journey to finding the perfect university</p>
        </div>
        
        {/* --- Uses dynamic profileProgress data --- */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Complete your profile to get better recommendations</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{profileProgress.completed}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={profileProgress.completed} className="mb-4 h-3" />
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {profileProgress.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className={item.completed ? "text-sm" : "text-sm text-muted-foreground"}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* --- Uses dynamic quickActions data --- */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary/50 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                        <action.icon className="w-7 h-7 text-white" />
                      </div>
                      {action.completed && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
    
                    <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Start <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        {/* --- Uses dynamic recentActivity data --- */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    <div className="flex-1">
                      <p>{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">View All Activity</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Recommended Next Steps
              </CardTitle>
              <CardDescription>Actions to help you move forward</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <h4 className="font-semibold mb-2">Complete Degree Preferences</h4>
                <p className="text-sm text-muted-foreground mb-3">Tell us more about your preferred fields of study</p>
                <Button size="sm" className="bg-primary">Complete Now</Button>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h4 className="font-semibold mb-2">Shortlist Universities</h4>
                <p className="text-sm text-muted-foreground mb-3">Save universities you're interested in</p>
                <Link to="/universities">
                  <Button size="sm" variant="outline">Browse Universities</Button>
                </Link>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h4 className="font-semibold mb-2">Explore Scholarships</h4>
                <p className="text-sm text-muted-foreground mb-3">Find funding opportunities for your education</p>
                <Link to="/scholarships">
                  <Button size="sm" variant="outline">Find Scholarships</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
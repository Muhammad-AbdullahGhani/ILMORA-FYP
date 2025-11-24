import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Brain, TrendingUp, Award, RefreshCw, ArrowRight, Download, Share2, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
export function QuizResults() {
  const navigate = useNavigate();

  // Get results from localStorage
  const storedResults = localStorage.getItem("quizResults");
  const storedXP = localStorage.getItem("quizXP");
  const xp = storedXP ? parseInt(storedXP) : 0;

  // Parse RIASEC results
  const scores = storedResults ? JSON.parse(storedResults) : {
    R: 18,
    I: 24,
    A: 15,
    S: 12,
    E: 20,
    C: 14
  };

  // Normalize scores to percentage (max possible is 36 per dimension if all 6 questions rated 6)
  const maxScore = 36;
  const radarData = [{
    type: "Realistic",
    score: Math.round(scores.R / maxScore * 100)
  }, {
    type: "Investigative",
    score: Math.round(scores.I / maxScore * 100)
  }, {
    type: "Artistic",
    score: Math.round(scores.A / maxScore * 100)
  }, {
    type: "Social",
    score: Math.round(scores.S / maxScore * 100)
  }, {
    type: "Enterprising",
    score: Math.round(scores.E / maxScore * 100)
  }, {
    type: "Conventional",
    score: Math.round(scores.C / maxScore * 100)
  }];
  const barData = radarData.map(item => ({
    ...item
  })).sort((a, b) => b.score - a.score);
  const topTypes = barData.slice(0, 3);
  const primaryType = topTypes[0];
  const typeDescriptions = {
    Investigative: {
      title: "The Thinker",
      description: "You enjoy working with ideas and thinking. You like to search for facts and figure out problems mentally. You're analytical, intellectual, and curious.",
      careers: ["Scientist", "Engineer", "Researcher", "Data Analyst", "Mathematician"]
    },
    Enterprising: {
      title: "The Persuader",
      description: "You like to work with people and data. You enjoy leading and making decisions. You're ambitious, adventurous, and energetic.",
      careers: ["Entrepreneur", "Manager", "Sales Executive", "Lawyer", "Marketing Director"]
    },
    Realistic: {
      title: "The Doer",
      description: "You like to work with things and tools. You enjoy practical, hands-on work. You're practical, mechanical, and prefer working with objects.",
      careers: ["Engineer", "Architect", "Mechanic", "Pilot", "Chef"]
    }
  };
  const personalityInfo = typeDescriptions[primaryType.type] || typeDescriptions.Investigative;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => window.history.back(),
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back"), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    className: "text-center mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-xl"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-10 h-10 text-white"
  })), /*#__PURE__*/React.createElement(Badge, {
    className: "mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg px-4 py-2"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "w-5 h-5 mr-2"
  }), xp, " XP Earned!"), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold mb-4"
  }, "Your Career Profile"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground"
  }, "Here's what we learned about your interests and personality")), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    transition: {
      delay: 0.2
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "mb-8 border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-2xl"
  }, /*#__PURE__*/React.createElement(Brain, {
    className: "w-16 h-16"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center md:text-left"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "mb-2 bg-primary"
  }, "Your Primary Type"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold mb-2"
  }, primaryType.type, " - ", personalityInfo.title), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground mb-4"
  }, personalityInfo.description), /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold text-primary"
  }, primaryType.score, "% Match")))))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.3
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "h-full"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "RIASEC Profile"), /*#__PURE__*/React.createElement(CardDescription, null, "Your scores across all six personality types")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(RadarChart, {
    data: radarData
  }, /*#__PURE__*/React.createElement(PolarGrid, {
    stroke: "hsl(var(--border))",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement(PolarAngleAxis, {
    dataKey: "type",
    tick: {
      fill: "hsl(var(--foreground))",
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement(PolarRadiusAxis, {
    angle: 90,
    domain: [0, 100],
    tick: {
      fill: "hsl(var(--muted-foreground))"
    }
  }), /*#__PURE__*/React.createElement(Radar, {
    name: "Score",
    dataKey: "score",
    stroke: "#1976D2",
    fill: "#1976D2",
    fillOpacity: 0.5,
    strokeWidth: 3
  })))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      x: 20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.4
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "h-full"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Ranked Scores"), /*#__PURE__*/React.createElement(CardDescription, null, "Your personality types from highest to lowest")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: barData,
    layout: "vertical"
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: "hsl(var(--border))",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    domain: [0, 100],
    tick: {
      fill: "hsl(var(--foreground))",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "type",
    type: "category",
    tick: {
      fill: "hsl(var(--foreground))",
      fontSize: 12,
      fontWeight: 600
    },
    width: 100
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: "hsl(var(--card))",
      border: "2px solid #1976D2",
      borderRadius: "12px",
      fontWeight: 600
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "score",
    fill: "#FB8C00",
    radius: [0, 8, 8, 0]
  }))))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Your Top 3 Personality Types"), /*#__PURE__*/React.createElement(CardDescription, null, "These are your strongest career orientations")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-6"
  }, topTypes.map((type, index) => {
    const info = typeDescriptions[type.type];
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: `p-6 rounded-xl border-2 ${index === 0 ? "border-primary bg-primary/5" : index === 1 ? "border-secondary bg-secondary/5" : "border-accent bg-accent/5"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "outline"
    }, "#", index + 1), /*#__PURE__*/React.createElement("div", {
      className: "text-2xl font-bold text-primary"
    }, type.score, "%")), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold mb-2"
    }, type.type), info && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-muted-foreground mb-3"
    }, info.title), /*#__PURE__*/React.createElement("div", {
      className: "text-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-medium mb-1"
    }, "Example careers:"), /*#__PURE__*/React.createElement("div", {
      className: "text-muted-foreground"
    }, info.careers.slice(0, 3).join(", ")))));
  }))))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.6
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-6 h-6 text-primary"
  }), "Recommended Career Paths"), /*#__PURE__*/React.createElement(CardDescription, null, "Based on your ", primaryType.type, " profile")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-5 gap-4"
  }, personalityInfo.careers.map((career, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-4 bg-card rounded-xl border-2 border-border hover:border-primary/50 transition-all text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-2"
  }, "\uD83D\uDCBC"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, career))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-4 justify-center"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-primary hover:bg-primary/90 rounded-xl shadow-lg",
    onClick: () => navigate("/degrees")
  }, "View Degree Recommendations", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "ml-2 w-5 h-5"
  })), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "rounded-xl",
    onClick: () => navigate("/careers")
  }, "Explore Careers"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "rounded-xl",
    onClick: () => navigate("/quiz-intro")
  }, /*#__PURE__*/React.createElement(RefreshCw, {
    className: "mr-2 w-5 h-5"
  }), "Retake Quiz"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "rounded-xl"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "mr-2 w-5 h-5"
  }), "Download Report"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "rounded-xl"
  }, /*#__PURE__*/React.createElement(Share2, {
    className: "mr-2 w-5 h-5"
  }), "Share Results"))));
}
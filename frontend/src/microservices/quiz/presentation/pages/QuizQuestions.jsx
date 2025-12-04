import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { Progress } from "@/shared/components/ui/progress";
import { Badge } from "@/shared/components/ui/badge";
import { Slider } from "@/shared/components/ui/slider";
import { X, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

// Imports from your Application Layer
import { quizService } from "../../application/quizService";
import { useQuizStore } from "../../application/quizStore";

// --- Configuration for Education Groups ---
const groupOptions = {
  "Intermediate": [
    { value: "Pre-Engineering", label: "FSc Pre-Engineering" },
    { value: "Pre-Medical", label: "FSc Pre-Medical" },
    { value: "ICS", label: "ICS (Computer Science)" },
    { value: "Commerce", label: "I.Com (Commerce)" },
    { value: "Arts", label: "FA (Arts/Humanities)" }
  ],
  "A-Level": [
    { value: "Pre-Engineering", label: "Pre-Engineering (Math, Phys, Chem)" },
    { value: "Pre-Medical", label: "Pre-Medical (Bio, Phys, Chem)" },
    { value: "Computer Science", label: "Computer Science Group" },
    { value: "Business", label: "Business (Acc, Econ, Bus. Studies)" },
    { value: "Humanities", label: "Humanities / Social Sciences" }
  ]
};

// --- Visual Themes Helper ---
const getDimensionTheme = (dimension) => {
  const themes = {
    R: { name: "Realistic", emoji: "🔧", color: "blue", bg: "from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-950", accent: "bg-blue-600" },
    I: { name: "Investigative", emoji: "🧩", color: "indigo", bg: "from-blue-50 via-indigo-50 to-violet-50 dark:from-indigo-950", accent: "bg-indigo-600" },
    A: { name: "Artistic", emoji: "🎨", color: "orange", bg: "from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950", accent: "bg-orange-500" },
    S: { name: "Social", emoji: "🤝", color: "sky", bg: "from-blue-50 via-sky-50 to-cyan-50 dark:from-blue-950", accent: "bg-sky-500" },
    E: { name: "Enterprising", emoji: "💼", color: "red", bg: "from-orange-50 via-red-50 to-rose-50 dark:from-orange-950", accent: "bg-orange-600" },
    C: { name: "Conventional", emoji: "📁", color: "cyan", bg: "from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950", accent: "bg-cyan-600" },
  };
  return themes[dimension] || themes['R'];
};

export function QuizQuestions() {
  const navigate = useNavigate();
  
  // Access Global State
  const { 
    currentQuestion, 
    isLoading, 
    isComplete, 
    scores,
    history,
    sessionId 
  } = useQuizStore();

  // --- Local State for Background Form ---
  const [showBackgroundForm, setShowBackgroundForm] = useState(!sessionId);
  const [background, setBackground] = useState({
    level: "",
    group: ""
  });

  // --- Local State for Quiz ---
  const [currentAnswer, setCurrentAnswer] = useState(3);
  const [xp, setXp] = useState(0);
  const [showXpBadge, setShowXpBadge] = useState(false);

  // Determine progress
  const questionsAnswered = history ? history.length : 0;
  // REMOVED: canExitEarly logic since we rely on backend for completion
  const progressPercent = Math.min((questionsAnswered / 36) * 100, 100); 

  // --- Effects ---
  useEffect(() => {
    if (isComplete && scores) {
      navigate("/quiz-results"); 
    }
  }, [isComplete, scores, navigate]);

  useEffect(() => {
    setCurrentAnswer(3);
  }, [currentQuestion?.id]);

  // --- Handlers ---

  const handleStartQuiz = async () => {
    if (!background.level || !background.group) {
        alert("Please select your educational background to continue.");
        return;
    }
    
    // Save to store locally
    useQuizStore.getState().setStudentBackground(background);
    
    // Call API to start quiz
    await quizService.startQuiz(background); 
    setShowBackgroundForm(false);
  };

  const handleConfirmAnswer = async () => {
    if (!currentQuestion) return;
    setXp((prev) => prev + 10);
    setShowXpBadge(true);
    setTimeout(() => setShowXpBadge(false), 1000);
    setTimeout(() => {
      quizService.submitAnswer(currentAnswer);
    }, 500);
  };

  // REMOVED: handleEarlyExit function

  const handleForceExit = () => {
    if (window.confirm("Are you sure you want to exit? Progress will be lost.")) {
      navigate("/dashboard");
    }
  };

  // --- RENDER LOGIC ---

  // 1. Show Background Form (Before Quiz Starts)
  if (showBackgroundForm && !currentQuestion && !isLoading) {
    // Get valid majors based on selected level
    const availableGroups = background.level ? groupOptions[background.level] : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-primary">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Tell us about yourself</CardTitle>
                    <p className="text-muted-foreground text-sm">We need this to recommend eligible degrees.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Level Selection */}
                    <div className="space-y-2">
                        <Label>Current Education Level</Label>
                        <Select onValueChange={(val) => setBackground({level: val, group: ""})}> {/* Reset group on level change */}
                            <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Intermediate">Intermediate (HSSC)</SelectItem>
                                <SelectItem value="A-Level">A-Level</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Group Selection (Dynamic based on Level) */}
                    <div className="space-y-2">
                        <Label>Major / Subject Group</Label>
                        <Select 
                            onValueChange={(val) => setBackground({...background, group: val})}
                            disabled={!background.level} // Disable if no level selected
                            value={background.group}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={background.level ? "Select Group" : "Select Level First"} />
                            </SelectTrigger>
                            <SelectContent>
                                {availableGroups.map((group) => (
                                    <SelectItem key={group.value} value={group.value}>
                                        {group.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleStartQuiz} disabled={isLoading || !background.level || !background.group}>
                        {isLoading ? <Loader2 className="animate-spin mr-2"/> : null}
                        Start Career Quiz <ArrowRight className="ml-2 w-4 h-4"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  // 2. Loading State
  if (isLoading && !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-gray-600">Loading your personalized quiz...</p>
      </div>
    );
  }

  // 3. Quiz Interface
  if (!currentQuestion) return null;

  const theme = getDimensionTheme(currentQuestion.dimension);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} p-2 sm:p-4 md:p-8 transition-all duration-700`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0 shadow-lg">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {xp} XP
                </Badge>
                <Badge 
                  className="bg-white dark:bg-gray-900 border-2 border-current shadow-lg"
                  style={{ borderColor: theme.color, color: theme.color }}
                >
                  {theme.emoji} {theme.name}
                </Badge>
              </div>
              
              <div className="text-xs sm:text-sm font-medium text-foreground mb-2">
                Question {questionsAnswered + 1} &bull; Adaptive Mode
              </div>
              <Progress value={progressPercent} className="w-full h-2 sm:h-3" />
            </div>

            <Button variant="ghost" size="icon" onClick={handleForceExit} className="ml-2">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Question Card Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-4 md:mb-8 border-4 border-primary/30 shadow-2xl">
              <CardContent className="p-4 sm:p-6 md:p-10">
                <div className="text-center mb-6 md:mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-4"
                  >
                    <Avatar 
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mx-auto border-4 shadow-xl"
                      style={{ borderColor: theme.color }}
                    >
                      <AvatarFallback className="text-5xl sm:text-6xl md:text-7xl bg-gradient-to-br from-white to-gray-50">
                        {theme.emoji}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 leading-tight text-foreground">
                    {currentQuestion.text} 
                  </h2>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div>
                    <div className="text-center mb-4">
                      <p className="text-sm sm:text-base font-bold mb-2 text-foreground">
                        How much does this resonate with you?
                      </p>
                      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground px-2 font-medium">
                        <span>Not at all</span>
                        <span>Completely!</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[currentAnswer]}
                        onValueChange={(val) => setCurrentAnswer(val[0])}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between text-xs sm:text-sm">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => setCurrentAnswer(num)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold transition-all shadow-md flex items-center justify-center ${
                              currentAnswer === num
                                ? `${theme.accent} text-white scale-125 shadow-lg`
                                : "bg-white text-foreground hover:bg-gray-100 border-2 border-gray-300"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleConfirmAnswer}
                    disabled={isLoading}
                    className={`w-full text-white hover:opacity-90 text-base sm:text-lg py-6 rounded-xl shadow-lg transition-all ${theme.accent}`}
                    size="lg"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showXpBadge && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0 }}
              animate={{ opacity: 1, y: -100, scale: 1.5 }}
              exit={{ opacity: 0, y: -200 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full shadow-2xl">
                <span className="text-2xl font-bold">+10 XP</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REMOVED: Early Finish Button Section */}

      </div>
    </div>
  );
}
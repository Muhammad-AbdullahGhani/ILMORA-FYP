import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Badge } from "@/shared/components/ui/badge";
import { Slider } from "@/shared/components/ui/slider";
import { X, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { ImageWithFallback } from "@/shared/components/ImageWithFallback";

// RIASEC Question Bank - Organized in ROUND-ROBIN order (R→I→A→S→E→C, repeat)
// This ensures balanced distribution: 12 questions = 2 from each, 18 = 3 from each, etc.

const questionBank = [
// Round 1: R, I, A, S, E, C
{
  id: "R1",
  dimension: "R",
  scenario: "The Broken Bike",
  gamified: "Your motorbike breaks down. Do you grab your toolkit and repair it?",
  setting: "Garage with scattered tools, sunlight beams",
  avatar: "🔧",
  bgGradient: "from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-950 dark:via-cyan-950 dark:to-sky-950",
  accentColor: "bg-blue-600"
  // image: "optional-image-url", // Add image if needed
}, {
  id: "I1",
  dimension: "I",
  scenario: "The Puzzle Gate",
  gamified: "A tricky puzzle blocks your path. Do you enjoy solving it even if it takes hours?",
  setting: "Ancient door with glowing puzzle locks",
  avatar: "🧩",
  bgGradient: "from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950 dark:via-indigo-950 dark:to-violet-950",
  accentColor: "bg-indigo-600"
}, {
  id: "A1",
  dimension: "A",
  scenario: "The Blank Canvas",
  gamified: "You're given a blank canvas and paints. Do you feel excited to create art?",
  setting: "Art studio, canvas and brushes",
  avatar: "🎨",
  bgGradient: "from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950",
  accentColor: "bg-orange-500"
}, {
  id: "S1",
  dimension: "S",
  scenario: "Helping a Student",
  gamified: "A younger student struggles with math. Do you patiently guide them?",
  setting: "Classroom with student struggling",
  avatar: "👨‍🏫",
  bgGradient: "from-blue-50 via-sky-50 to-cyan-50 dark:from-blue-950 dark:via-sky-950 dark:to-cyan-950",
  accentColor: "bg-sky-500"
}, {
  id: "E1",
  dimension: "E",
  scenario: "Trip Planner",
  gamified: "Your class plans a trip. Do you step up as organizer?",
  setting: "School notice board",
  avatar: "📋",
  bgGradient: "from-orange-50 via-red-50 to-rose-50 dark:from-orange-950 dark:via-red-950 dark:to-rose-950",
  accentColor: "bg-orange-600"
}, {
  id: "C1",
  dimension: "C",
  scenario: "The Messy Records",
  gamified: "You receive messy records. Do you feel satisfied arranging them neatly?",
  setting: "Office desk with scattered papers",
  avatar: "📁",
  bgGradient: "from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950",
  accentColor: "bg-cyan-600"
},
// Round 2: R, I, A, S, E, C
{
  id: "R2",
  dimension: "R",
  scenario: "Day in the Fields",
  gamified: "You're offered a day outdoors. Do you choose farming, gardening, or repairing things?",
  setting: "Open farm with green fields and blue sky",
  avatar: "🌾",
  bgGradient: "from-blue-50 via-sky-50 to-indigo-50 dark:from-blue-950 dark:via-sky-950 dark:to-indigo-950",
  accentColor: "bg-blue-600"
}, {
  id: "I2",
  dimension: "I",
  scenario: "Potion Lab",
  gamified: "You find a set of strange potions. Do you mix them carefully to see what happens?",
  setting: "Magic science lab with flasks",
  avatar: "⚗️",
  bgGradient: "from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950 dark:via-blue-950 dark:to-cyan-950",
  accentColor: "bg-indigo-600"
}, {
  id: "A2",
  dimension: "A",
  scenario: "The Music Jam",
  gamified: "A music jam session begins. Do you enjoy joining in with singing, composing, or playing?",
  setting: "Rooftop at sunset with instruments",
  avatar: "🎵",
  bgGradient: "from-orange-50 via-yellow-50 to-amber-50 dark:from-orange-950 dark:via-yellow-950 dark:to-amber-950",
  accentColor: "bg-orange-500"
}, {
  id: "S2",
  dimension: "S",
  scenario: "The Friend in Need",
  gamified: "A friend shares a personal problem. Do you listen and comfort them?",
  setting: "Park bench under trees",
  avatar: "🤝",
  bgGradient: "from-sky-50 via-blue-50 to-cyan-50 dark:from-sky-950 dark:via-blue-950 dark:to-cyan-950",
  accentColor: "bg-sky-500"
}, {
  id: "E2",
  dimension: "E",
  scenario: "The Pitch",
  gamified: "You have a business idea. Do you confidently pitch it to gain support?",
  setting: "Startup office",
  avatar: "💼",
  bgGradient: "from-orange-50 via-amber-50 to-red-50 dark:from-orange-950 dark:via-amber-950 dark:to-red-950",
  accentColor: "bg-orange-600"
}, {
  id: "C2",
  dimension: "C",
  scenario: "Attendance Sheets",
  gamified: "You're asked to prepare attendance sheets. Do you enjoy handling them accurately?",
  setting: "Classroom with register book",
  avatar: "✅",
  bgGradient: "from-cyan-50 via-blue-50 to-sky-50 dark:from-cyan-950 dark:via-blue-950 dark:to-sky-950",
  accentColor: "bg-cyan-600"
},
// Round 3: R, I, A, S, E, C
{
  id: "R3",
  dimension: "R",
  scenario: "The Carpenter's Chest",
  gamified: "You receive a chest with wood and tools. Do you feel excited to craft something new?",
  setting: "Workshop table with wood & nails",
  avatar: "🪵",
  bgGradient: "from-blue-50 via-indigo-50 to-sky-50 dark:from-blue-950 dark:via-indigo-950 dark:to-sky-950",
  accentColor: "bg-blue-600"
}, {
  id: "I3",
  dimension: "I",
  scenario: "The Pattern Mystery",
  gamified: "Exam results reveal a weird pattern. Do you investigate the hidden cause?",
  setting: "School board with graphs",
  avatar: "📊",
  bgGradient: "from-indigo-50 via-violet-50 to-blue-50 dark:from-indigo-950 dark:via-violet-950 dark:to-blue-950",
  accentColor: "bg-indigo-600"
}, {
  id: "A3",
  dimension: "A",
  scenario: "Poster Challenge",
  gamified: "Your guild needs a poster. Do you design it with colors and visuals?",
  setting: "Classroom design board",
  avatar: "🖌️",
  bgGradient: "from-yellow-50 via-orange-50 to-amber-50 dark:from-yellow-950 dark:via-orange-950 dark:to-amber-950",
  accentColor: "bg-orange-500"
}, {
  id: "S3",
  dimension: "S",
  scenario: "Festival Volunteers",
  gamified: "A festival needs volunteers at the help desk. Do you step up?",
  setting: "Campus event booth",
  avatar: "🎪",
  bgGradient: "from-cyan-50 via-sky-50 to-blue-50 dark:from-cyan-950 dark:via-sky-950 dark:to-blue-950",
  accentColor: "bg-sky-500"
}, {
  id: "E3",
  dimension: "E",
  scenario: "The Debate Room",
  gamified: "In a debate, do you enjoy persuading people to agree with you?",
  setting: "Podium with crowd",
  avatar: "🎤",
  bgGradient: "from-red-50 via-orange-50 to-amber-50 dark:from-red-950 dark:via-orange-950 dark:to-amber-950",
  accentColor: "bg-orange-600"
}, {
  id: "C3",
  dimension: "C",
  scenario: "Budgeting Task",
  gamified: "You're given a budgeting task. Do you enjoy balancing numbers carefully?",
  setting: "Accountant's desk with calculator",
  avatar: "💰",
  bgGradient: "from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950",
  accentColor: "bg-cyan-600"
},
// Round 4: R, I, A, S, E, C
{
  id: "R4",
  dimension: "R",
  scenario: "Mystery of the Washing Machine",
  gamified: "A magical washing machine stops working. Do you open it to solve the mystery?",
  setting: "Cozy home with glowing broken appliance",
  avatar: "⚙️",
  bgGradient: "from-sky-50 via-blue-50 to-indigo-50 dark:from-sky-950 dark:via-blue-950 dark:to-indigo-950",
  accentColor: "bg-blue-600"
}, {
  id: "I4",
  dimension: "I",
  scenario: "The Debate of the Universe",
  gamified: "A debate about the beginning of the universe starts. Do you jump in with logic and evidence?",
  setting: "Auditorium stage, 2 debating characters",
  avatar: "🌌",
  bgGradient: "from-violet-50 via-indigo-50 to-blue-50 dark:from-violet-950 dark:via-indigo-950 dark:to-blue-950",
  accentColor: "bg-indigo-600"
}, {
  id: "A4",
  dimension: "A",
  scenario: "The School Play",
  gamified: "You're tasked with writing a short play for a festival. Do you feel inspired to create and perform?",
  setting: "Small stage with spotlight",
  avatar: "🎭",
  bgGradient: "from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950",
  accentColor: "bg-orange-500"
}, {
  id: "S4",
  dimension: "S",
  scenario: "Charity Drive Leader",
  gamified: "You're asked to lead a charity drive. Do you organize people and donations?",
  setting: "Donation stand",
  avatar: "❤️",
  bgGradient: "from-blue-50 via-sky-50 to-cyan-50 dark:from-blue-950 dark:via-sky-950 dark:to-cyan-950",
  accentColor: "bg-sky-500"
}, {
  id: "E4",
  dimension: "E",
  scenario: "The New Club",
  gamified: "A new school club begins. Do you aim to become the leader?",
  setting: "Campus sign-up desk",
  avatar: "👑",
  bgGradient: "from-orange-50 via-red-50 to-amber-50 dark:from-orange-950 dark:via-red-950 dark:to-amber-950",
  accentColor: "bg-orange-600"
}, {
  id: "C4",
  dimension: "C",
  scenario: "Meeting Minutes",
  gamified: "You must document meeting minutes. Do you enjoy step-by-step recording?",
  setting: "Conference room",
  avatar: "📝",
  bgGradient: "from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950",
  accentColor: "bg-cyan-600"
},
// Round 5: R, I, A, S, E, C
{
  id: "R5",
  dimension: "R",
  scenario: "Inside the Machine Workshop",
  gamified: "You enter a machine workshop. Do you feel thrilled to try machines?",
  setting: "Industrial setting, gears turning",
  avatar: "⚡",
  bgGradient: "from-indigo-50 via-blue-50 to-sky-50 dark:from-indigo-950 dark:via-blue-950 dark:to-sky-950",
  accentColor: "bg-blue-600"
}, {
  id: "I5",
  dimension: "I",
  scenario: "Decode the Graphs",
  gamified: "You're handed graphs and numbers. Do you enjoy decoding their hidden meaning?",
  setting: "Digital data lab with floating charts",
  avatar: "📈",
  bgGradient: "from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950 dark:via-indigo-950 dark:to-violet-950",
  accentColor: "bg-indigo-600"
}, {
  id: "A5",
  dimension: "A",
  scenario: "Film Crew Call",
  gamified: "A short film project needs actors and writers. Do you eagerly jump in?",
  setting: "Film set with lights & camera",
  avatar: "🎬",
  bgGradient: "from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950",
  accentColor: "bg-orange-500"
}, {
  id: "S5",
  dimension: "S",
  scenario: "The Lonely Classmate",
  gamified: "A classmate feels left out. Do you include them in the group?",
  setting: "Cafeteria scene",
  avatar: "🫂",
  bgGradient: "from-sky-50 via-cyan-50 to-blue-50 dark:from-sky-950 dark:via-cyan-950 dark:to-blue-950",
  accentColor: "bg-sky-500"
}, {
  id: "E5",
  dimension: "E",
  scenario: "Risky Project",
  gamified: "If given the chance, do you take risks to launch a new project?",
  setting: "Construction site, stormy sky",
  avatar: "🚀",
  bgGradient: "from-red-50 via-orange-50 to-amber-50 dark:from-red-950 dark:via-orange-950 dark:to-amber-950",
  accentColor: "bg-orange-600"
}, {
  id: "C5",
  dimension: "C",
  scenario: "Exam Timetable",
  gamified: "You're asked to create an exam timetable. Do you enjoy making a systematic schedule?",
  setting: "School calendar board",
  avatar: "📅",
  bgGradient: "from-cyan-50 via-teal-50 to-blue-50 dark:from-cyan-950 dark:via-teal-950 dark:to-blue-950",
  accentColor: "bg-cyan-600"
},
// Round 6: R, I, A, S, E, C
{
  id: "R6",
  dimension: "R",
  scenario: "The Model Maker",
  gamified: "In a group quest, others write the plan, but you propose building a real model. Do you push for action?",
  setting: "School project room",
  avatar: "🛠️",
  bgGradient: "from-blue-50 via-sky-50 to-cyan-50 dark:from-blue-950 dark:via-sky-950 dark:to-cyan-950",
  accentColor: "bg-blue-600"
}, {
  id: "I6",
  dimension: "I",
  scenario: "The Lightning Question",
  gamified: "Someone asks, 'Why does lightning strike?' Do you research until you uncover the truth?",
  setting: "Stormy sky, library full of books",
  avatar: "⚡",
  bgGradient: "from-indigo-50 via-blue-50 to-violet-50 dark:from-indigo-950 dark:via-blue-950 dark:to-violet-950",
  accentColor: "bg-indigo-600"
}, {
  id: "A6",
  dimension: "A",
  scenario: "Free Time, New Idea",
  gamified: "Someone gives you free time. Do you prefer experimenting with brand new ideas?",
  setting: "Cozy room, notebook glowing",
  avatar: "💡",
  bgGradient: "from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950",
  accentColor: "bg-orange-500"
}, {
  id: "S6",
  dimension: "S",
  scenario: "The Team Coach",
  gamified: "A sports team needs a coach. Do you feel excited to train and motivate them?",
  setting: "School ground",
  avatar: "⚽",
  bgGradient: "from-cyan-50 via-blue-50 to-sky-50 dark:from-cyan-950 dark:via-blue-950 dark:to-sky-950",
  accentColor: "bg-sky-500"
}, {
  id: "E6",
  dimension: "E",
  scenario: "The Competition",
  gamified: "You're in a competition. Do you enjoy the fast-paced, competitive energy?",
  setting: "Sports stadium",
  avatar: "🏆",
  bgGradient: "from-orange-50 via-red-50 to-amber-50 dark:from-orange-950 dark:via-red-950 dark:to-amber-950",
  accentColor: "bg-orange-600"
}, {
  id: "C6",
  dimension: "C",
  scenario: "Error Detective",
  gamified: "You're asked to check for report errors. Do you feel motivated to find them?",
  setting: "Desk with magnifying glass",
  avatar: "🔍",
  bgGradient: "from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950",
  accentColor: "bg-cyan-600"
}];
const dimensionInfo = {
  R: {
    name: "Realistic",
    emoji: "🔧",
    color: "blue"
  },
  I: {
    name: "Investigative",
    emoji: "🔬",
    color: "indigo"
  },
  A: {
    name: "Artistic",
    emoji: "🎨",
    color: "orange"
  },
  S: {
    name: "Social",
    emoji: "🤝",
    color: "sky"
  },
  E: {
    name: "Enterprising",
    emoji: "💼",
    color: "orange"
  },
  C: {
    name: "Conventional",
    emoji: "📋",
    color: "cyan"
  }
};
export function QuizQuestions() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [xp, setXp] = useState(0);
  const [showXpBadge, setShowXpBadge] = useState(false);
  const [canExit, setCanExit] = useState(false);
  const currentQuestion = questionBank[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questionBank.length * 100;
  const answeredCount = Object.keys(answers).length;

  // Calculate dimension coverage
  const dimensionCoverage = () => {
    const coverage = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0
    };
    Object.keys(answers).forEach(qId => {
      const dimension = qId[0];
      coverage[dimension]++;
    });
    return coverage;
  };
  useEffect(() => {
    setCanExit(answeredCount >= 12);
  }, [answeredCount]);
  const handleAnswer = value => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
    setXp(xp + 10);
    setShowXpBadge(true);
    setTimeout(() => setShowXpBadge(false), 1000);
    setTimeout(() => {
      if (currentQuestionIndex < questionBank.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleComplete();
      }
    }, 800);
  };
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleComplete = () => {
    // Calculate RIASEC scores
    const scores = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0
    };
    Object.entries(answers).forEach(([qId, value]) => {
      const dimension = qId[0];
      scores[dimension] += value;
    });

    // Store results
    localStorage.setItem("quizResults", JSON.stringify(scores));
    localStorage.setItem("quizXP", xp.toString());
    localStorage.setItem("quizAnswerCount", answeredCount.toString());
    navigate("/quiz-results");
  };
  const handleExit = () => {
    if (canExit) {
      const coverage = dimensionCoverage();
      const allCovered = Object.values(coverage).every(count => count >= 2);
      if (allCovered || window.confirm(`You've answered ${answeredCount} questions across all dimensions. See your results now?`)) {
        handleComplete();
      }
    } else {
      alert(`Please answer at least 12 questions (${12 - answeredCount} more needed) to ensure balanced results across all personality dimensions.`);
    }
  };
  const handleForceExit = () => {
    if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
      navigate("/dashboard");
    }
  };
  const coverage = dimensionCoverage();
  return /*#__PURE__*/React.createElement("div", {
    className: `min-h-screen bg-gradient-to-br ${currentQuestion.bgGradient} p-2 sm:p-4 md:p-8 transition-all duration-700`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 md:mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2 flex-wrap"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0 shadow-lg"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "w-3 h-3 mr-1"
  }), xp, " XP"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-white dark:bg-gray-900 border-2 border-current shadow-lg",
    style: {
      borderColor: currentQuestion.accentColor.replace('bg-', ''),
      color: currentQuestion.accentColor.replace('bg-', '')
    }
  }, dimensionInfo[currentQuestion.dimension].emoji, " ", dimensionInfo[currentQuestion.dimension].name)), /*#__PURE__*/React.createElement("div", {
    className: "text-xs sm:text-sm font-medium text-foreground mb-2"
  }, "Question ", currentQuestionIndex + 1, " of ", questionBank.length, " \u2022 ", answeredCount, " answered"), /*#__PURE__*/React.createElement(Progress, {
    value: progress,
    className: "w-full h-2 sm:h-3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 mt-2"
  }, Object.entries(coverage).map(([dim, count]) => /*#__PURE__*/React.createElement("div", {
    key: dim,
    className: "flex-1 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-foreground/70"
  }, dim), /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-semibold text-primary"
  }, count))))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: handleForceExit,
    className: "ml-2"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-5 h-5"
  })))), /*#__PURE__*/React.createElement(AnimatePresence, {
    mode: "wait"
  }, /*#__PURE__*/React.createElement(motion.div, {
    key: currentQuestionIndex,
    initial: {
      opacity: 0,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.95
    },
    transition: {
      duration: 0.3
    }
  }, /*#__PURE__*/React.createElement(Card, {
    className: "mb-4 md:mb-8 border-4 border-primary/30 shadow-2xl"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4 sm:p-6 md:p-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      scale: 0
    },
    animate: {
      scale: 1,
      rotate: [0, 10, -10, 0]
    },
    transition: {
      delay: 0.2,
      type: "spring"
    },
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(Avatar, {
    className: "w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mx-auto border-4 shadow-xl",
    style: {
      borderColor: currentQuestion.accentColor.replace('bg-', '')
    }
  }, /*#__PURE__*/React.createElement(AvatarFallback, {
    className: "text-5xl sm:text-6xl md:text-7xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  }, currentQuestion.avatar))), currentQuestion.image && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 rounded-xl overflow-hidden shadow-lg"
  }, /*#__PURE__*/React.createElement(ImageWithFallback, {
    src: currentQuestion.image,
    alt: currentQuestion.scenario,
    className: "w-full h-48 sm:h-56 md:h-64 object-cover"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 leading-tight text-foreground"
  }, currentQuestion.scenario), /*#__PURE__*/React.createElement("div", {
    className: `rounded-xl p-3 sm:p-4 mb-4 md:mb-6 border-2 bg-gradient-to-r ${currentQuestion.bgGradient}`,
    style: {
      borderColor: currentQuestion.accentColor.replace('bg-', '') + '40'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base md:text-lg text-foreground/90 italic font-medium"
  }, currentQuestion.gamified)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-muted-foreground"
  }, "\uD83D\uDCCD ", currentQuestion.setting)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 md:space-y-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base font-bold mb-2 text-foreground"
  }, "How much does this resonate with you?"), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs sm:text-sm text-muted-foreground px-2 font-medium"
  }, /*#__PURE__*/React.createElement("span", null, "Not at all"), /*#__PURE__*/React.createElement("span", null, "Completely!"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Slider, {
    min: 1,
    max: 6,
    step: 1,
    value: [answers[currentQuestion.id] || 3],
    onValueChange: value => {
      setAnswers({
        ...answers,
        [currentQuestion.id]: value[0]
      });
    },
    className: "cursor-pointer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs sm:text-sm"
  }, [1, 2, 3, 4, 5, 6].map(num => /*#__PURE__*/React.createElement("button", {
    key: num,
    onClick: () => setAnswers({
      ...answers,
      [currentQuestion.id]: num
    }),
    className: `w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold transition-all shadow-md flex items-center justify-center ${answers[currentQuestion.id] === num ? `${currentQuestion.accentColor} text-white scale-125 shadow-lg` : "bg-white dark:bg-gray-800 text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600"}`
  }, num)))), answers[currentQuestion.id] && /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    className: "text-center mt-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-foreground/80"
  }, answers[currentQuestion.id] >= 5 && "🌟 You seem passionate about this!", (answers[currentQuestion.id] === 3 || answers[currentQuestion.id] === 4) && "👍 Moderately interested", answers[currentQuestion.id] <= 2 && "💭 Not quite your thing"))), /*#__PURE__*/React.createElement(Button, {
    onClick: () => handleAnswer(answers[currentQuestion.id] || 3),
    disabled: !answers[currentQuestion.id],
    className: `w-full text-white hover:opacity-90 text-base sm:text-lg py-6 rounded-xl shadow-lg transition-all ${currentQuestion.accentColor}`,
    size: "lg"
  }, "Continue")))))), /*#__PURE__*/React.createElement(AnimatePresence, null, showXpBadge && /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0
    },
    animate: {
      opacity: 1,
      y: -100,
      scale: 1.5
    },
    exit: {
      opacity: 0,
      y: -200
    },
    className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full shadow-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold"
  }, "+10 XP")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row justify-between items-center gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: handlePrevious,
    disabled: currentQuestionIndex === 0,
    className: "w-full sm:w-auto",
    size: "sm"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Previous"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, canExit && /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: handleExit,
    className: "text-xs sm:text-sm border-2 border-primary",
    size: "sm"
  }, "Finish Early (", answeredCount, " answered)")), currentQuestionIndex === questionBank.length - 1 && answers[currentQuestion.id] && /*#__PURE__*/React.createElement(Button, {
    className: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white w-full sm:w-auto",
    onClick: handleComplete,
    size: "sm"
  }, "See Results", /*#__PURE__*/React.createElement(Sparkles, {
    className: "w-4 h-4 ml-2"
  }))), !canExit && /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm font-semibold text-foreground/70"
  }, "\u23F3 Answer ", 12 - answeredCount, " more question", 12 - answeredCount !== 1 ? "s" : "", " to finish early"))));
}
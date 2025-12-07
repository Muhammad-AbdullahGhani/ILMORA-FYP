import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { quizService } from "../../application/quizService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Loader2, Eye, ClipboardList, Calendar, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function QuizHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      if (!user) {
        navigate("/auth");
        return;
      }
      
      try {
        setLoading(true);
        const userId = user.id || user.email;
        const data = await quizService.getUserHistory(userId);
        setHistory(data || []);
      } catch (error) {
        console.error("Failed to load quiz history:", error);
        setError("Failed to load quiz history");
      } finally {
        setLoading(false);
      }
    }
    
    fetchHistory();
  }, [user, navigate]);

  // Holland Code color mapping
  const getHollandColors = (code) => {
    const colors = {
      'R': 'bg-blue-500',
      'I': 'bg-indigo-500',
      'A': 'bg-orange-500',
      'S': 'bg-sky-500',
      'E': 'bg-red-500',
      'C': 'bg-cyan-500'
    };
    return code.split('').map(letter => colors[letter] || 'bg-gray-500');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600">Loading your quiz history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Quiz History
              </h1>
              <p className="text-gray-600">
                View all your past career quiz attempts
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </motion.div>

        {/* Stats Summary */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ClipboardList className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Attempts</p>
                    <p className="text-2xl font-bold">{history.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Latest Code</p>
                    <p className="text-2xl font-bold">{history[0]?.holland_code || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Questions</p>
                    <p className="text-2xl font-bold">
                      {Math.round(history.reduce((acc, h) => acc + h.total_questions, 0) / history.length)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center py-12">
              <CardContent>
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Quiz History Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Take your first career quiz to discover your ideal career path!
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/quiz-intro")}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500"
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Start Your First Quiz
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => {
              const hollandColors = getHollandColors(item.holland_code);
              const completedDate = new Date(item.completed_at);
              
              return (
                <motion.div
                  key={item.session_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">
                              Holland Code: {item.holland_code}
                            </CardTitle>
                            <div className="flex gap-1">
                              {hollandColors.map((color, idx) => (
                                <div
                                  key={idx}
                                  className={`w-3 h-3 rounded-full ${color}`}
                                  title={item.holland_code[idx]}
                                />
                              ))}
                            </div>
                          </div>
                          <CardDescription className="flex items-center gap-4 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {completedDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <ClipboardList className="w-4 h-4" />
                              {item.total_questions} questions answered
                            </span>
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          Attempt #{history.length - index}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Button
                          variant="default"
                          onClick={() => {
                            // Navigate to results with session ID as query param
                            navigate(`/quiz-results?session=${item.session_id}`);
                          }}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Detailed Results
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate("/quiz-intro")}
                        >
                          Retake Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer Action */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Button
              onClick={() => navigate("/quiz-intro")}
              size="lg"
              variant="outline"
              className="border-2"
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

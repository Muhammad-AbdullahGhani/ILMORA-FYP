import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { GraduationCap, TrendingUp, Clock, DollarSign, Search, Filter, Star, Building2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// 1. Import Store and API Client
import { useQuizStore } from "../../../quiz/application/quizStore";
import { axiosClient } from "@/shared/utils/axiosClient";

export function DegreeRecommendations() {
  const navigate = useNavigate();
  
  // 2. Get User Data from Store
  const { scores, studentBackground } = useQuizStore();
  
  // 3. State for AI Data
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");

  // 4. Fetch Recommendations on Mount
  useEffect(() => {
    async function fetchDegrees() {
      // Safety Check: If no scores, redirect to quiz
      if (!scores || !scores.dimension_averages) {
        // navigate("/quiz-intro"); // Uncomment to enforce flow
        console.warn("No quiz scores found. Using fallback/empty state.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Prepare Payload for Python Backend
        // Backend Controller expects: R, I, A, S, E, C (float 1-5) and background object
        // Ensure background has valid string values (not null)
        const background = studentBackground && studentBackground.level && studentBackground.group
          ? studentBackground
          : { level: "Intermediate", group: "Pre-Engineering" };
        
        const payload = {
          R: scores.dimension_averages.R,
          I: scores.dimension_averages.I,
          A: scores.dimension_averages.A,
          S: scores.dimension_averages.S,
          E: scores.dimension_averages.E,
          C: scores.dimension_averages.C,
          background: {
            level: background.level || "Intermediate",
            group: background.group || "Pre-Engineering"
          }
        };

        // Call the Recommendation Microservice
        // Ensure your vite.config.js proxies /api -> localhost:3003
        const response = await axiosClient.post("/recommend/degrees", payload);
        
        setRecommendations(response.data);
      } catch (err) {
        console.error("AI Recommendation Failed:", err);
        
        // Provide more specific error messages
        if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
          setError("Request timed out. The AI model may be loading. Please wait a moment and try again.");
        } else if (err.response?.status === 500) {
          setError("Server error. The recommendation service may be unavailable. Please try again later.");
        } else if (err.response?.status === 404) {
          setError("No recommendations available. Please ensure you've completed the quiz.");
        } else {
          setError("Could not generate recommendations. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDegrees();
  }, [scores, studentBackground, navigate]);

  // 5. Filter Logic (Applied to AI Results)
  const filteredDegrees = recommendations.filter(degree => {
    const matchesSearch = degree.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          degree.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Backend returns 'field', we filter by it
    const matchesField = fieldFilter === "all" || degree.field === fieldFilter;
    
    return matchesSearch && matchesField;
  });

  // --- RENDER STATES ---

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-semibold">Analyzing your profile...</h2>
        <p className="text-muted-foreground">Consulting with AI for the best degree matches.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4 text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // --- MAIN UI ---
  return (
    <div className="min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/quiz-results")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>

        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Recommended Degrees for You</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                AI-Powered suggestions based on your {studentBackground?.group || "academic"} background
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-4 flex items-center gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">
                  We analyzed {scores?.holland_code} profile against successful alumni data.
                  These degrees have the highest predicted satisfaction for you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search degrees..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={fieldFilter} onValueChange={setFieldFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredDegrees.length} recommended degree{filteredDegrees.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-6">
          {filteredDegrees.map((degree) => (
            <motion.div 
              key={degree.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-xl transition-all hover:scale-[1.01] border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold">{degree.name}</h3>
                            <Badge className={`${degree.match > 85 ? "bg-green-600" : "bg-primary"}`}>
                              {degree.match}% Match
                            </Badge>
                          </div>
                          <Badge variant="outline">{degree.field}</Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{degree.description}</p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-muted-foreground">Duration</div>
                            <div className="font-medium text-sm sm:text-base">{degree.duration || "4 Years"}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-muted-foreground">Avg. Salary</div>
                            <div className="font-medium text-sm sm:text-base">{degree.avgSalary}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-muted-foreground">Job Growth</div>
                            <div className="font-medium text-green-600 text-sm sm:text-base">High Demand</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg mb-4">
                        <div className="text-sm text-muted-foreground mb-1">Requirements</div>
                        <div className="font-medium">{degree.requirements}</div>
                      </div>

                      {/* Mock Universities - Could be fetched from another API later */}
                      <div>
                        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Top Universities Offering This Degree
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["NUST", "LUMS", "FAST", "GIKI"].map((uni, index) => (
                            <Badge key={index} variant="outline" className="bg-card">{uni}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-48 flex flex-col gap-3 justify-center">
                      <Link to="/universities">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          View Universities <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">Save Degree</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDegrees.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No degrees found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or retake the quiz.</p>
            <Button onClick={() => { setSearchTerm(""); setFieldFilter("all"); }}>Clear Filters</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
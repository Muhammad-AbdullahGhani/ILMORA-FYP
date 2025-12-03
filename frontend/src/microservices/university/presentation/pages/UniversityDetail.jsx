import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { MapPin, Star, Users, ArrowLeft, Brain, Sparkles, Heart, Share2, ExternalLink, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "@/shared/components/ImageWithFallback";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const API_BASE = "http://localhost:3005";

export function UniversityDetail() {
  const { id } = useParams();

  const [universityName, setUniversityName] = React.useState("");
  const [stats, setStats] = React.useState(null);
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadUniversityData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Fetch University Details (works with ID or Name)
        // Encode the ID to handle spaces and special characters
        const uniRes = await fetch(`${API_BASE}/api/universities/${encodeURIComponent(id)}`);
        if (!uniRes.ok) {
          throw new Error("University not found");
        }
        const uniData = await uniRes.json();

        const name = uniData.name || id;
        // Use apiName if available, otherwise normalize the full name
        const normalizedName = uniData.apiName || name
          .toUpperCase()
          .replace(/-/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        setUniversityName(name); // Use original name for display

        // 2. Fetch AI Stats
        let statsData = { stats: {} };
        try {
          const statsRes = await fetch(`${API_BASE}/api/reviews/${normalizedName}/stats`);
          if (statsRes.ok) {
            statsData = await statsRes.json();
          }
        } catch (e) {
          console.warn("Could not load stats:", e);
        }

        // 3. Merge Data
        setStats({
          ...statsData,
          university: uniData
        });

        // 4. Fetch Reviews
        const reviewsRes = await fetch(`${API_BASE}/api/reviews/${normalizedName}`);
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          const reviewsList = (reviewsData.reviews || [])
            .map(r => ({
              text: r.reviewText || r.review_text || '',
              factor: r.factor || 'General',
              author: r.authorName || 'Anonymous',
              date: r.createdAt || new Date().toISOString(),
              aiRating: r.aiRating || 3.0
            }))
            .filter(r => r.text)
            .slice(0, 10);
          setReviews(reviewsList);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load university data");
      } finally {
        setLoading(false);
      }
    };

    loadUniversityData();
  }, [id]);

  // Correct data path: stats.stats
  const sentimentData = (stats?.stats?.rating_breakdown && typeof stats.stats.rating_breakdown === 'object')
    ? Object.entries(stats.stats.rating_breakdown).map(([cat, score]) => ({
      category: cat.replace(/_/g, " "),
      score: typeof score === 'number' ? Number(score.toFixed(1)) : 0
    }))
    : [];

  const reviewDistribution = stats?.stats?.review_distribution
    ? [5, 4, 3, 2, 1].map(stars => ({
      name: `${stars} Star${stars > 1 ? "s" : ""}`,
      value: Math.round(stats.stats.review_distribution[stars] || 0),
      color: stars === 5 ? "#1976D2" : stars === 4 ? "#42A5F5" : stars === 3 ? "#90CAF9" : "#BBDEFB"
    })).filter(d => d.value > 0)
    : [];

  const overallRating = stats?.stats?.overall_rating
    ? Number(stats.stats.overall_rating).toFixed(1)
    : null;

  const totalReviews = stats?.stats?.total_reviews || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary rounded-full border-t-transparent mx-auto mb-4" />
          <p className="text-lg">Loading university insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Back Button */}
      <Button variant="secondary" onClick={() => window.history.back()} className="absolute top-4 left-4 z-50 shadow-lg">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1595837979282-2db3e1e83e5e?q=80&w=2070"
          alt="Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className="text-lg px-4 py-2">95% Match</Badge>
              <Badge variant="secondary" className="text-lg">#1 in Pakistan</Badge>
              <Badge className="bg-green-600">
                <Sparkles className="w-4 h-4 mr-2" /> AI Insights Live
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{universityName}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2"><MapPin className="w-6 h-6" /> Pakistan</div>
              <div className="flex items-center gap-2"><Users className="w-6 h-6" /> {totalReviews}+ Reviews</div>
              {overallRating && (
                <div className="flex items-center gap-2 font-bold text-yellow-400">
                  <Star className="w-6 h-6 fill-current" />
                  {overallRating}/5.0
                  <span className="text-sm font-normal text-white/80 ml-1">(AI Analyzed)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="sentiments" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="sentiments">AI Reviews</TabsTrigger>
                <TabsTrigger value="scholarships">Aid</TabsTrigger>
                <TabsTrigger value="hostels">Housing</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Brain className="w-8 h-8 text-primary" />
                      About {universityName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">General Information</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Type</dt>
                            <dd className="font-medium">{stats?.university?.type || 'N/A'}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Established</dt>
                            <dd className="font-medium">{stats?.university?.established || 'N/A'}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Location</dt>
                            <dd className="font-medium">{stats?.university?.location || 'Islamabad'}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Campus</dt>
                            <dd className="font-medium">{stats?.university?.campus || 'Main Campus'}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Statistics</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Total Students</dt>
                            <dd className="font-medium">{stats?.university?.totalStudents?.toLocaleString() || 'N/A'}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Academic Staff</dt>
                            <dd className="font-medium">{stats?.university?.academicStaff?.toLocaleString() || 'N/A'}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Student/Staff Ratio</dt>
                            <dd className="font-medium">{stats?.university?.studentStaffRatio || 'N/A'}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {stats?.university?.viceChancellor && typeof stats.university.viceChancellor === 'string' && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Leadership</h3>
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                            {stats.university.viceChancellor.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{stats.university.viceChancellor}</p>
                            <p className="text-sm text-muted-foreground">Vice Chancellor</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programs">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats?.university?.programs?.map((prog, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div>
                            <h4 className="font-semibold">{prog.name}</h4>
                            <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                              <span>{prog.duration}</span>
                              <span>•</span>
                              <span>{prog.feePerSemester ? `PKR ${prog.feePerSemester}/sem` : 'Fee N/A'}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={prog.detailUrl} target="_blank" rel="noopener noreferrer">Details</a>
                          </Button>
                        </div>
                      ))}
                      {(!stats?.university?.programs || stats.university.programs.length === 0) && (
                        <p className="text-muted-foreground text-center py-8">No program information available.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sentiments">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Brain className="w-8 h-8 text-primary" />
                      AI-Powered Sentiment Analysis
                      <span className="text-sm font-normal text-muted-foreground">
                        • Based on {totalReviews} real student reviews
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Category Ratings */}
                      <div>
                        <h3 className="font-bold text-lg mb-4">Category Ratings</h3>
                        <ResponsiveContainer width="100%" height={320}>
                          <BarChart data={sentimentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                            <YAxis domain={[0, 5]} />
                            <Tooltip formatter={(v) => `${v}/5.0`} />
                            <Bar dataKey="score" fill="#1976D2" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Rating Distribution */}
                      <div>
                        <h3 className="font-bold text-lg mb-4">Rating Distribution</h3>
                        <ResponsiveContainer width="100%" height={320}>
                          <PieChart>
                            <Pie
                              data={reviewDistribution}
                              dataKey="value"
                              nameKey="name"
                              cx="50%" cy="50%"
                              outerRadius={110}
                              label={({ name, value }) => `${name}: ${value}%`}
                            >
                              {reviewDistribution.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v) => `${v}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    {reviews.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-bold text-lg mb-4">Recent Student Reviews</h3>
                        <div className="space-y-4">
                          {reviews.map((review, i) => (
                            <div key={i} className="p-6 bg-muted/30 rounded-lg border-l-4 border-primary">
                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline" className="text-sm">{review.factor}</Badge>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${star <= Math.round(review.aiRating || 3) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                  <span className="text-xs ml-1 font-semibold">{(review.aiRating || 3).toFixed(1)}</span>
                                </div>
                              </div>
                              <p className="text-base leading-relaxed mb-3">{review.text}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{review.author}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="scholarships">
                <Card>
                  <CardHeader>
                    <CardTitle>Scholarships & Financial Aid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">No scholarship information available yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="hostels">
                <Card>
                  <CardHeader>
                    <CardTitle>Hostel & Housing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">No housing information available yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-primary">
                  <Heart className="w-4 h-4 mr-2" /> Add to Favorites
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" /> Share University
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" /> Visit Website
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" /> Contact Admissions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Rating</span>
                    <span className="font-bold text-primary text-2xl">{overallRating || '0.0'}/5.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${star <= Math.round(overallRating || 0) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {totalReviews} AI-analyzed student reviews
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

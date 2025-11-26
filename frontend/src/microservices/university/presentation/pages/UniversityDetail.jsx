import React from 'react';
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { MapPin, DollarSign, Star, Users, Home, BookOpen, Heart, Share2, ExternalLink, TrendingUp, ThumbsUp, MessageSquare, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "@/shared/components/ImageWithFallback";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
export function UniversityDetail() {
  const {
    id
  const scholarships = [
    { name: "Merit Scholarship", amount: "$20,000", eligibility: "GPA > 3.8" },
    { name: "Need-Based Aid", amount: "$15,000", eligibility: "Financial need" },
    { name: "Diversity Scholarship", amount: "$10,000", eligibility: "Underrepresented groups" }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Button variant="secondary" onClick={() => window.history.back()} className="absolute top-4 left-4 z-50 shadow-lg">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMTgzMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="University"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
              <Badge className="bg-primary text-xs sm:text-sm">95% Match</Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm">#1 in Pakistan</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">National University of Sciences &amp; Technology (NUST)</h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-white/90">
              <div className="flex items-center gap-1 sm:gap-2"><MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> Islamabad, Pakistan</div>
              <div className="flex items-center gap-1 sm:gap-2"><Users className="w-4 h-4 sm:w-5 sm:h-5" /> 18,000 Students</div>
              <div className="flex items-center gap-1 sm:gap-2"><Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> 4.7/5.0 Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-4 sm:mb-6 md:mb-8 h-auto">
                <TabsTrigger value="overview" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Overview</TabsTrigger>
                <TabsTrigger value="programs" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Programs</TabsTrigger>
                <TabsTrigger value="sentiments" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Reviews</TabsTrigger>
                <TabsTrigger value="scholarships" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Aid</TabsTrigger>
                <TabsTrigger value="hostels" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Housing</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>About the University</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. Established in 1861, MIT has played a key role in the development of modern technology and science, ranking it among the most prestigious academic institutions in the world.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Founded</div>
                        <div className="font-semibold">1861</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Campus Size</div>
                        <div className="font-semibold">168 acres</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Student-Faculty Ratio</div>
                        <div className="font-semibold">3:1</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Accreditation</div>
                        <div className="font-semibold">AACSB, ABET, NEASC</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programs">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {programs.map((program, index) => (
                        <div key={index} className="p-4 border-2 rounded-lg hover:border-primary/50 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{program.name}</h4>
                            <Badge>{program.seats} seats</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /><span className="text-muted-foreground">Duration:</span> <span className="font-medium">{program.duration}</span></div>
                            <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-600" /><span className="text-muted-foreground">Fee:</span> <span className="font-medium">{program.fee}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sentiments">
                <Card>
                  <CardHeader>
                    <CardTitle>Student &amp; Alumni Sentiments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-semibold mb-4">Rating Breakdown</h4>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={sentimentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={1.5} />
                            <XAxis dataKey="category" tick={{ fontSize: 10, fill: 'hsl(var(--foreground))', fontWeight: 600 }} angle={-45} textAnchor="end" height={80} />
                            <YAxis domain={[0, 5]} tick={{ fill: 'hsl(var(--foreground))', fontWeight: 600 }} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '2px solid #1976D2', borderRadius: '12px', fontWeight: 600 }} />
                            <Bar dataKey="score" fill="#1976D2" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4">Review Distribution</h4>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={reviewDistribution} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                              {reviewDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[1, 2].map((review) => (
                        <div key={review} className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-current text-secondary" />)}</div>
                            <span className="font-semibold">Amazing Experience!</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">The faculty is world-class and the research opportunities are unmatched. Highly recommend for anyone serious about STEM fields.</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>John Doe - Class of 2023</span>
                            <div className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 245</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scholarships">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Scholarships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scholarships.map((scholarship, index) => (
                        <div key={index} className="p-4 border-2 rounded-lg hover:border-primary/50 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{scholarship.name}</h4>
                            <Badge className="bg-green-600">{scholarship.amount}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Eligibility: {scholarship.eligibility}</p>
                          <Button size="sm" variant="outline">Apply Now</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hostels">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Accommodation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Find student housing and hostels near the campus</p>
                    <Link to="/hostels">
                      <Button className="bg-primary"><Home className="w-4 h-4 mr-2" />Browse Hostels</Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-primary"><Heart className="w-4 h-4 mr-2" />Add to Favorites</Button>
                <Button variant="outline" className="w-full"><Share2 className="w-4 h-4 mr-2" />Share University</Button>
                <Button variant="outline" className="w-full"><ExternalLink className="w-4 h-4 mr-2" />Visit Website</Button>
                <Button variant="outline" className="w-full"><MessageSquare className="w-4 h-4 mr-2" />Contact Admissions</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Overall Rating</span>
                    <span className="font-bold text-primary">4.8/5.0</span>
                  </div>
                  <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-current text-secondary" />)}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Acceptance Rate</div>
                  <div className="font-bold">7%</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Average GPA</div>
                  <div className="font-bold">3.95</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Job Placement</div>
                  <div className="font-bold flex items-center gap-1">98% <TrendingUp className="w-4 h-4 text-green-600" /></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
    className: "text-muted-foreground mb-4"
  }, "Find student housing and hostels near the campus"), /*#__PURE__*/React.createElement(Link, {
    to: "/hostels"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "bg-primary"
  }, /*#__PURE__*/React.createElement(Home, {
    className: "w-4 h-4 mr-2"
  }), "Browse Hostels"))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Quick Actions")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-primary"
  }, /*#__PURE__*/React.createElement(Heart, {
    className: "w-4 h-4 mr-2"
  }), "Add to Favorites"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(Share2, {
    className: "w-4 h-4 mr-2"
  }), "Share University"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 mr-2"
  }), "Visit Website"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    className: "w-4 h-4 mr-2"
  }), "Contact Admissions"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Key Stats")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "Overall Rating"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary"
  }, "4.8/5.0")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, [1, 2, 3, 4, 5].map(star => /*#__PURE__*/React.createElement(Star, {
    key: star,
    className: "w-4 h-4 fill-current text-secondary"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Acceptance Rate"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold"
  }, "7%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Average GPA"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold"
  }, "3.95")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Job Placement"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold flex items-center gap-1"
  }, "98%", /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 text-green-600"
  })))))))));
}
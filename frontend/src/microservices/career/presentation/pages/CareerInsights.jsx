import React from 'react';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Briefcase, TrendingUp, DollarSign, Search, Target, ArrowLeft } from "lucide-react";
import { CareerDetailDialog } from "@/shared/components/CareerDetailDialog";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export function CareerInsights() {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const salaryData = [{
    years: "0-2",
    salary: 65
  }, {
    years: "3-5",
    salary: 85
  }, {
    years: "6-10",
    salary: 110
  }, {
    years: "11-15",
    salary: 135
  }, {
    years: "16+",
    salary: 160
  }];
  const demandData = [{
    year: "2020",
    demand: 100
  }, {
    year: "2021",
    demand: 115
  }, {
    year: "2022",
    demand: 130
  }, {
    year: "2023",
    demand: 145
  }, {
    year: "2024",
    demand: 165
  }, {
    year: "2025",
    demand: 185
  }];
  const careers = [{
    title: "Software Engineer (Pakistan)",
    field: "Technology",
    avgSalary: "PKR 80,000-150,000/mo",
    globalSalary: "$60,000-95,000/yr",
    growth: "+25%",
    demand: "Very High",
    skills: ["Programming", "Algorithms", "Problem Solving"],
    location: "Karachi, Lahore, Islamabad"
  }, {
    title: "Data Scientist",
    field: "Technology",
    avgSalary: "PKR 100,000-200,000/mo",
    globalSalary: "$70,000-110,000/yr",
    growth: "+30%",
    demand: "Very High",
    skills: ["Statistics", "Machine Learning", "Python"],
    location: "Major cities + Remote"
  }, {
    title: "Product Manager",
    field: "Business",
    avgSalary: "PKR 120,000-250,000/mo",
    globalSalary: "$80,000-120,000/yr",
    growth: "+18%",
    demand: "High",
    skills: ["Strategy", "Communication", "Analytics"],
    location: "Tech hubs Pakistan/Global"
  }, {
    title: "Electrical Engineer",
    field: "Engineering",
    avgSalary: "PKR 60,000-120,000/mo",
    globalSalary: "$55,000-90,000/yr",
    growth: "+12%",
    demand: "High",
    skills: ["Circuit Design", "Power Systems", "Automation"],
    location: "Industrial areas"
  }, {
    title: "Digital Marketing Manager",
    field: "Marketing",
    avgSalary: "PKR 70,000-140,000/mo",
    globalSalary: "$45,000-75,000/yr",
    growth: "+20%",
    demand: "Very High",
    skills: ["SEO/SEM", "Social Media", "Analytics"],
    location: "Pakistan + Remote"
  }, {
    title: "Civil Engineer",
    field: "Engineering",
    avgSalary: "PKR 50,000-100,000/mo",
    globalSalary: "$50,000-85,000/yr",
    growth: "+8%",
    demand: "Medium",
    skills: ["AutoCAD", "Structural Design", "Project Management"],
    location: "Construction sites nationwide"
  }];
  return (
    <div className="min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Career Insights</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Explore salary trends in Pakistan & globally</p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search careers..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Salary vs Experience</CardTitle>
              <CardDescription>Average salary progression in thousands</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={1.5} />
                  <XAxis dataKey="years" tick={{ fill: "hsl(var(--foreground))", fontWeight: 600 }} />
                  <YAxis tick={{ fill: "hsl(var(--foreground))", fontWeight: 600 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "2px solid #1976D2", borderRadius: "12px", fontWeight: 600 }} />
                  <Bar dataKey="salary" fill="#1976D2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Market Demand Trend</CardTitle>
              <CardDescription>Projected demand growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={1.5} />
                  <XAxis dataKey="year" tick={{ fill: "hsl(var(--foreground))", fontWeight: 600 }} />
                  <YAxis tick={{ fill: "hsl(var(--foreground))", fontWeight: 600 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "2px solid #FB8C00", borderRadius: "12px", fontWeight: 600 }} />
                  <Line type="monotone" dataKey="demand" stroke="#FB8C00" strokeWidth={4} dot={{ fill: "#FB8C00", r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {careers.map((career, index) => (
            <Card key={index} className="hover:shadow-xl transition-all hover:scale-[1.02] border-2 hover:border-primary/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">{career.title}</h3>
                    <Badge variant="outline" className="text-xs">{career.field}</Badge>
                  </div>
                  <Badge className={`${career.demand === "Very High" ? "bg-green-600" : "bg-blue-600"} text-xs whitespace-nowrap`}>{career.demand}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-muted-foreground">Pakistan Salary</div>
                      <div className="font-bold text-sm sm:text-base truncate">{career.avgSalary}</div>
                      <div className="text-xs text-muted-foreground">Global: {career.globalSalary}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Growth Rate</div>
                      <div className="font-bold text-green-600 text-sm sm:text-base">{career.growth}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-2">Location:</div>
                  <div className="text-xs sm:text-sm font-medium text-primary">{career.location}</div>
                </div>

                <div className="mb-4">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-2">Key Skills:</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">{career.skills.map((skill, i) => <Badge key={i} variant="outline" className="bg-card text-xs">{skill}</Badge>)}</div>
                </div>

                <Button className="w-full bg-primary text-sm sm:text-base" size="sm" onClick={() => { setSelectedCareer(career); setDialogOpen(true); }}>
                  <Target className="w-4 h-4 mr-2" />
                  Explore Career Path
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <CareerDetailDialog open={dialogOpen} onOpenChange={setDialogOpen} career={selectedCareer} />
      </div>
    </div>
  );
}
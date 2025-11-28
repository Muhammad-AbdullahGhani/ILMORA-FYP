import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function SentimentDashboard() {
  const sentimentData = [{
    category: "Faculty",
    score: 4.5,
    color: "#1976D2"
  }, {
    category: "Infrastructure",
    score: 4.2,
    color: "#FB8C00"
  }, {
    category: "Placement",
    score: 4.7,
    color: "#0D47A1"
  }, {
    category: "Campus Life",
    score: 4.3,
    color: "#2196F3"
  }, {
    category: "Management",
    score: 3.9,
    color: "#FFA726"
  }];
  
  const universityComparison = [{
    name: "MIT",
    overall: 4.8
  }, { name: "Stanford", overall: 4.6 }];

  return (
    <div className="min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Select defaultValue="all">
          <SelectTrigger className="w-48"><SelectValue placeholder="City" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            <SelectItem value="cambridge">Cambridge</SelectItem>
            <SelectItem value="stanford">Stanford</SelectItem>
          </SelectContent>
        </Select>


        <div className="grid lg:grid-cols-2 gap-8 mb-8 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Categories</CardTitle>
              <CardDescription>Average ratings across dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={1.5} />
                  <XAxis dataKey="category" tick={{ fill: 'hsl(var(--foreground))', fontWeight: 600 }} />
                  <YAxis domain={[0, 5]} tick={{ fill: 'hsl(var(--foreground))', fontWeight: 600 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '2px solid #1976D2', borderRadius: '12px', fontWeight: 600 }} />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>University Comparison</CardTitle>
              <CardDescription>Overall sentiment scores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={universityComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" strokeWidth={1.5} />
                  <XAxis type="number" domain={[0, 5]} tick={{ fill: 'hsl(var(--foreground))', fontWeight: 600 }} />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'hsl(var(--foreground))', fontWeight: 600 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '2px solid #FB8C00', borderRadius: '12px', fontWeight: 600 }} />
                  <Bar dataKey="overall" fill="#FB8C00" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Student Feedback</CardTitle>
            <CardDescription>Latest reviews and comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge>MIT</Badge>
                      <div className="flex">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-current text-secondary" />)}</div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm">Excellent research facilities and world-class faculty. The campus culture promotes innovation.</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
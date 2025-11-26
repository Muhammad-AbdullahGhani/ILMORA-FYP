import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { DollarSign, TrendingUp, MapPin, Briefcase, GraduationCap, Target } from "lucide-react";
import { Link } from "react-router-dom";
export function CareerDetailDialog({
  open,
  onOpenChange,
  career
}) {
  if (!career) return null;
  const relatedDegrees = career.field === "Technology" ? ["Computer Science", "Software Engineering", "Data Science"] : career.field === "Engineering" ? ["Electrical Engineering", "Mechanical Engineering", "Civil Engineering"] : ["Business Administration", "Marketing", "Management"];
  const careerPath = [{
    title: "Junior Level",
    years: "0-2 years",
    salary: "Entry level"
  }, {
    title: "Mid Level",
    years: "3-5 years",
    salary: "40% increase"
  }, {
    title: "Senior Level",
    years: "6-10 years",
    salary: "80% increase"
  }, {
    title: "Expert/Lead",
    years: "10+ years",
    salary: "150% increase"
  }];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{career.title}</DialogTitle>
          <DialogDescription>Complete career path and requirements</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-sm text-muted-foreground">Pakistan Salary</div>
                    <div className="font-bold">{career.avgSalary}</div>
                    {career.globalSalary && <div className="text-xs text-muted-foreground">Global: {career.globalSalary}</div>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Market Growth</div>
                    <div className="font-bold text-green-600">{career.growth}</div>
                    <Badge className={career.demand === "Very High" ? "bg-green-600" : "bg-blue-600"}>{career.demand} Demand</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Where You Can Work</h3>
              </div>
              <p className="text-muted-foreground">{career.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Key Skills Required</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="bg-card">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Career Progression Path</h3>
              </div>
              <div className="space-y-3">
                {careerPath.map((level, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                    <div>
                      <div className="font-semibold">{level.title}</div>
                      <div className="text-sm text-muted-foreground">{level.years}</div>
                      <div className="text-sm text-green-600">{level.salary}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Recommended Degrees</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedDegrees.map((degree, i) => (
                  <Badge key={i} variant="outline" className="bg-primary/5">{degree}</Badge>
                ))}
              </div>
              <Link to="/degrees">
                <Button className="w-full mt-4 bg-primary">View Degree Programs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
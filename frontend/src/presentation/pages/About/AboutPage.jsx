import React from 'react';
import { Card, CardContent } from "./../../../shared/components/ui/card";
import { Button } from "./../../../shared/components/ui/button";
import { Mail, Github, Linkedin, Twitter, Users, Target, Heart } from "lucide-react";
export function AboutPage() {
  const team = [{
    name: "Taimoor Raza Asif",
    role: "Full Stack Developer",
    img: ""
  }, {
    name: "Hamza Aftab",
    role: "UX Designer",
    img: ""
  }, {
    name: "Abdullah Ghani",
    role: "Data Scientist",
    img: ""
  }];
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent py-20 px-4">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">About ILM-ORA</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">Empowering students to make informed decisions about their educational future through AI-powered recommendations and comprehensive university insights.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">To democratize access to quality education by helping students find the perfect university match</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Values</h3>
              <p className="text-muted-foreground">Student-first approach, data-driven insights, and commitment to educational excellence</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Impact</h3>
              <p className="text-muted-foreground">50,000+ students helped in finding their ideal university and career path</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h4 className="font-bold mb-1">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Have questions or suggestions? We'd love to hear from you!</p>
            <div className="flex justify-center gap-4 mb-8">
              <Button variant="outline" size="icon" className="rounded-full"><Mail className="w-5 h-5" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Github className="w-5 h-5" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Linkedin className="w-5 h-5" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Twitter className="w-5 h-5" /></Button>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90"><Mail className="w-5 h-5 mr-2" />Contact Us</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
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
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-primary via-primary/90 to-accent py-20 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto text-center text-white"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl font-bold mb-6"
  }, "About ILM-ORA"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl opacity-90 max-w-3xl mx-auto"
  }, "Empowering students to make informed decisions about their educational future through AI-powered recommendations and comprehensive university insights."))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-8 mb-16"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-8 h-8 text-primary"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold mb-2"
  }, "Our Mission"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "To democratize access to quality education by helping students find the perfect university match"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/React.createElement(Heart, {
    className: "w-8 h-8 text-secondary"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold mb-2"
  }, "Our Values"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Student-first approach, data-driven insights, and commitment to educational excellence"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-8 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-8 h-8 text-accent"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold mb-2"
  }, "Our Impact"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "50,000+ students helped in finding their ideal university and career path")))), /*#__PURE__*/React.createElement("div", {
    className: "mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold text-center mb-12"
  }, "Meet Our Team"), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-4 gap-8"
  }, team.map((member, index) => /*#__PURE__*/React.createElement(Card, {
    key: index,
    className: "text-center hover:shadow-lg transition-all"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
  }, member.name.split(" ").map(n => n[0]).join("")), /*#__PURE__*/React.createElement("h4", {
    className: "font-bold mb-1"
  }, member.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, member.role)))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-br from-primary/10 to-secondary/10 border-2"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-12 text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold mb-4"
  }, "Get in Touch"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground mb-8 max-w-2xl mx-auto"
  }, "Have questions or suggestions? We'd love to hear from you!"), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center gap-4 mb-8"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "icon",
    className: "rounded-full"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "icon",
    className: "rounded-full"
  }, /*#__PURE__*/React.createElement(Github, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "icon",
    className: "rounded-full"
  }, /*#__PURE__*/React.createElement(Linkedin, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "icon",
    className: "rounded-full"
  }, /*#__PURE__*/React.createElement(Twitter, {
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-primary hover:bg-primary/90"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 mr-2"
  }), "Contact Us")))));
}
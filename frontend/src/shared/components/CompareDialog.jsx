import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Star, MapPin, DollarSign, Users, Award } from "lucide-react";
export function CompareDialog({
  open,
  onOpenChange,
  universities
}) {
  if (universities.length === 0) return null;
  return /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onOpenChange: onOpenChange
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-4xl max-h-[90vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, null, "Compare Universities"), /*#__PURE__*/React.createElement(DialogDescription, null, "Side-by-side comparison of ", universities.length, " universities")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full border-collapse"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "bg-muted"
  }, /*#__PURE__*/React.createElement("th", {
    className: "p-3 text-left font-semibold"
  }, "Feature"), universities.map(uni => /*#__PURE__*/React.createElement("th", {
    key: uni.id,
    className: "p-3 text-left font-semibold min-w-[200px]"
  }, uni.name)))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-medium"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4 inline mr-2"
  }), "Location"), universities.map(uni => /*#__PURE__*/React.createElement("td", {
    key: uni.id,
    className: "p-3"
  }, uni.location))), /*#__PURE__*/React.createElement("tr", {
    className: "border-b bg-muted/30"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-medium"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-4 h-4 inline mr-2"
  }), "Tuition Fee"), universities.map(uni => /*#__PURE__*/React.createElement("td", {
    key: uni.id,
    className: "p-3"
  }, uni.tuitionFee))), /*#__PURE__*/React.createElement("tr", {
    className: "border-b"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-medium"
  }, /*#__PURE__*/React.createElement(Star, {
    className: "w-4 h-4 inline mr-2"
  }), "Sentiment Rating"), universities.map(uni => /*#__PURE__*/React.createElement("td", {
    key: uni.id,
    className: "p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, uni.sentiment, "/5.0", /*#__PURE__*/React.createElement(Star, {
    className: "w-4 h-4 fill-secondary text-secondary"
  }))))), /*#__PURE__*/React.createElement("tr", {
    className: "border-b bg-muted/30"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-medium"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-4 h-4 inline mr-2"
  }), "Ranking"), universities.map(uni => /*#__PURE__*/React.createElement("td", {
    key: uni.id,
    className: "p-3"
  }, /*#__PURE__*/React.createElement(Badge, null, uni.ranking)))), /*#__PURE__*/React.createElement("tr", {
    className: "border-b"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-medium"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4 inline mr-2"
  }), "Total Students"), universities.map(uni => /*#__PURE__*/React.createElement("td", {
    key: uni.id,
    className: "p-3"
  }, uni.studentsCount))), /*#__PURE__*/React.createElement("tr", {
    className: "border-b bg-muted/30"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-medium"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-4 h-4 inline mr-2"
  }), "Accreditation"), universities.map(uni => /*#__PURE__*/React.createElement("td", {
    key: uni.id,
    className: "p-3"
  }, uni.accreditation))))))));
}
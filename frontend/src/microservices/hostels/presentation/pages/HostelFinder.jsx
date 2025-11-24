import React from 'react';
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Home, Search, MapPin, DollarSign, Star, ArrowLeft } from "lucide-react";
export function HostelFinder() {
  const hostels = [{
    id: 1,
    name: "NUST Boys Hostel",
    location: "On-campus H-12",
    price: "PKR 15,000/month",
    rating: 4.5,
    capacity: "Shared rooms (2-4 students)",
    amenities: ["WiFi", "Mess", "Laundry", "Study Room", "Sports"]
  }, {
    id: 2,
    name: "Islamabad Student Apartments",
    location: "0.5 km from NUST",
    price: "PKR 25,000/month",
    rating: 4.7,
    capacity: "Single & Shared",
    amenities: ["WiFi", "Kitchen", "24/7 Security", "Parking"]
  }, {
    id: 3,
    name: "FAST Hostel Islamabad",
    location: "On-campus",
    price: "PKR 12,000/month",
    rating: 4.3,
    capacity: "Shared rooms",
    amenities: ["WiFi", "Cafeteria", "Common Room", "Sports"]
  }, {
    id: 4,
    name: "Private PG near LUMS",
    location: "DHA Lahore",
    price: "PKR 20,000/month",
    rating: 4.4,
    capacity: "Single rooms",
    amenities: ["WiFi", "Meals", "AC", "Cleaning"]
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => window.history.back(),
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back"), /*#__PURE__*/React.createElement("div", {
    className: "mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Home, {
    className: "w-6 h-6 sm:w-8 sm:h-8 text-white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-4xl font-bold"
  }, "Hostel Finder"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-muted-foreground"
  }, "Find hostels & accommodation near Pakistani universities")))), /*#__PURE__*/React.createElement(Card, {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative md:col-span-2"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "City or University name...",
    className: "pl-10"
  })), /*#__PURE__*/React.createElement(Button, {
    className: "bg-primary"
  }, "Search Hostels")))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-8 mb-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "h-96 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full bg-muted flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-16 h-16 mx-auto mb-4 text-primary"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Map view would appear here")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, hostels.map(hostel => /*#__PURE__*/React.createElement(Card, {
    key: hostel.id,
    className: "hover:shadow-lg transition-all"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold"
  }, hostel.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm text-muted-foreground"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4"
  }), hostel.location)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Star, {
    className: "w-4 h-4 fill-current text-secondary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, hostel.rating))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-5 h-5 text-green-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary"
  }, hostel.price)), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, hostel.capacity)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, hostel.amenities.map((amenity, i) => /*#__PURE__*/React.createElement(Badge, {
    key: i,
    variant: "outline",
    className: "text-xs"
  }, amenity))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    className: "w-full bg-primary"
  }, "View Details"))))))));
}
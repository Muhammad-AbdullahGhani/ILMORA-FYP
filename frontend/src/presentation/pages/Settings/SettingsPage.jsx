import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Bell, Shield, LogOut, ArrowLeft } from "lucide-react";
export function SettingsPage() {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => window.history.back(),
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back"), /*#__PURE__*/React.createElement("div", {
    className: "mb-6 md:mb-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-muted-foreground"
  }, "Manage your account and preferences")), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "profile",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-3 mb-8"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "profile"
  }, "Profile"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "preferences"
  }, "Preferences"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "privacy"
  }, "Privacy")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "profile"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Profile Information"), /*#__PURE__*/React.createElement(CardDescription, null, "Update your personal details")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6"
  }, /*#__PURE__*/React.createElement(Avatar, {
    className: "w-24 h-24"
  }, /*#__PURE__*/React.createElement(AvatarFallback, {
    className: "bg-primary text-primary-foreground text-2xl"
  }, "JD")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Change Photo"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mt-2"
  }, "JPG or PNG, max 5MB"))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "name"
  }, "Full Name"), /*#__PURE__*/React.createElement(Input, {
    id: "name",
    defaultValue: "John Doe"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email"
  }, "Email"), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    defaultValue: "john.doe@example.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "phone"
  }, "Phone"), /*#__PURE__*/React.createElement(Input, {
    id: "phone",
    defaultValue: "+1 (555) 123-4567"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "location"
  }, "Location"), /*#__PURE__*/React.createElement(Input, {
    id: "location",
    defaultValue: "New York, USA"
  }))), /*#__PURE__*/React.createElement(Button, {
    className: "bg-primary"
  }, "Save Changes")))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "preferences"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Preferences"), /*#__PURE__*/React.createElement(CardDescription, null, "Customize your experience")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, "Email Notifications"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Receive updates via email"))), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, "Weekly Newsletter"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Get weekly career insights")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, "Scholarship Alerts"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Notify about new scholarships")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, "University Updates"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "News from saved universities")), /*#__PURE__*/React.createElement(Switch, null)), /*#__PURE__*/React.createElement(Button, {
    className: "bg-primary"
  }, "Save Preferences")))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "privacy"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Privacy & Security"), /*#__PURE__*/React.createElement(CardDescription, null, "Manage your privacy settings")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, "Profile Visibility"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Make profile visible to others"))), /*#__PURE__*/React.createElement(Switch, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, "Share Quiz Results"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Allow universities to see results")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-6 border-t"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold mb-4"
  }, "Account Actions"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full justify-start"
  }, "Change Password"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full justify-start"
  }, "Download My Data"), /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    className: "w-full justify-start"
  }, /*#__PURE__*/React.createElement(LogOut, {
    className: "w-4 h-4 mr-2"
  }), "Logout")))))))));
}
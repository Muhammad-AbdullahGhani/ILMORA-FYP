import React from 'react';
import { AlertCircle } from "lucide-react";
export function ErrorMessage({
  message,
  onRetry
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center py-8 px-4"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-12 h-12 text-destructive mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-muted-foreground mb-4"
  }, message), onRetry && /*#__PURE__*/React.createElement("button", {
    onClick: onRetry,
    className: "px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
  }, "Try Again"));
}
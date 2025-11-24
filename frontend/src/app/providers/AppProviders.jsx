import React from 'react';
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { QueryProvider } from "./QueryProvider";
export function AppProviders({
  children
}) {
  return /*#__PURE__*/React.createElement(QueryProvider, null, /*#__PURE__*/React.createElement(ThemeProvider, null, /*#__PURE__*/React.createElement(AuthProvider, null, children)));
}
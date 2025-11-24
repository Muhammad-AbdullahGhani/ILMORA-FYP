// frontend/src/presentation/components/layout/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
export function AppRoutes() {
  return /*#__PURE__*/React.createElement(Routes, null, publicRoutes.map(route => /*#__PURE__*/React.createElement(Route, {
    key: route.path,
    path: route.path,
    element: route.element
  })), protectedRoutes.map(route => /*#__PURE__*/React.createElement(Route, {
    key: route.path,
    path: route.path,
    element: /*#__PURE__*/React.createElement(ProtectedRoute, null, route.element)
  })), /*#__PURE__*/React.createElement(Route, {
    path: "*",
    element: /*#__PURE__*/React.createElement(Navigate, {
      to: "/",
      replace: true
    })
  }));
}
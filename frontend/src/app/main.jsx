// frontend/src/app/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./../../index.css";

// StrictMode disabled to prevent duplicate API calls in development
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
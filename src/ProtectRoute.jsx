// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({ children }) {
  const userData = useSelector((state) => state?.userProfile?.user);
  debugger
  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

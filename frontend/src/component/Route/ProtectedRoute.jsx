import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    // Show loading spinner or some placeholder while loading
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAdmin && user.role !== "admin") {
    // Redirect to login if not an admin
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the component if authenticated and authorized
  return element;
};


export default ProtectedRoute;

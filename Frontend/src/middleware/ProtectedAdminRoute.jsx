// src/middleware/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  if (isLoading) return <div className="text-center pt-20">Loading...</div>;

  if (!isAuthenticated || user?.email !== adminEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;

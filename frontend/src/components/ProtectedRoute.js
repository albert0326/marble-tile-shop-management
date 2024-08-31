// src/components/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? element : <Navigate to="/products" />;
};

export default ProtectedRoute;

// src/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

// Create a Context for the authentication status
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and makes auth object available to any child component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to log in the user (you should implement your authentication logic here)
  const login = () => setIsLoggedIn(true);

  // Function to log out the user
  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      login();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

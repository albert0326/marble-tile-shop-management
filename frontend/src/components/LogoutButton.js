// src/components/LogoutButton.js

import React from "react";
import { Button } from "reactstrap";
import { useAuth } from "../AuthContext";
import { setAuthToken } from "../axiosConfig"; // Import setAuthToken

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("authToken");

    // Remove the token from axios headers
    setAuthToken(null);

    // Perform other logout logic
    logout();
  };

  return (
    <Button color="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;

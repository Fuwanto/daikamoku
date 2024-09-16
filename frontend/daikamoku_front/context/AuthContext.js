import React, { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "../services/auth_services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await isAuthenticated();
        setAuthenticated(result);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

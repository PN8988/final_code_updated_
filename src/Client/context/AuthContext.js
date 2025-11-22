// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null, // "ADMIN" or "CLIENT"
    token: null,
  });

  const login = (role, token) => {
    setAuth({ isAuthenticated: true, role, token });
    localStorage.setItem("auth", JSON.stringify({ role, token }));
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, role: null, token: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

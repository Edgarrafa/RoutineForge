"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  mounted: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  mounted: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("rf_auth") === "true");
    setMounted(true);
  }, []);

  function login() {
    localStorage.setItem("rf_auth", "true");
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("rf_auth");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, mounted, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

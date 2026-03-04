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
    // TODO: replace localStorage check with: const user = await authApi.getMe(); setIsLoggedIn(user !== null);
    setIsLoggedIn(localStorage.getItem("rf_auth") === "true");
    setMounted(true);
  }, []);

  function login() {
    // TODO: replace with: await authApi.login(email, password) — update signature to accept (email, password)
    localStorage.setItem("rf_auth", "true");
    setIsLoggedIn(true);
  }

  function logout() {
    // TODO: replace with: await authApi.logout()
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

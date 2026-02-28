"use client";

import { createContext, useContext, useState } from "react";
import type { User } from "@/types";
import { MOCK_USER } from "@/data/mockData";

interface UserContextValue {
  user: User;
  todayCalories: number;
  todayWeight: number;
  logCalories: (kcal: number) => void;
  logWeight: (kg: number) => void;
}

const UserContext = createContext<UserContextValue>({
  user: MOCK_USER,
  todayCalories: 0,
  todayWeight: 0,
  logCalories: () => {},
  logWeight: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User>(MOCK_USER);
  const [todayCalories, setTodayCalories] = useState(0);
  const [todayWeight, setTodayWeight] = useState(0);

  function logCalories(kcal: number) {
    setTodayCalories((prev) => prev + kcal);
  }

  function logWeight(kg: number) {
    setTodayWeight(kg);
  }

  return (
    <UserContext.Provider value={{ user, todayCalories, todayWeight, logCalories, logWeight }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SessionExercise } from "@/types";
import { SESSION_EXERCISES, WORKOUT_NAME } from "@/data/mockData";

interface SessionContextValue {
  workoutName: string;
  exercises: SessionExercise[];
  currentIndex: number;
  restTimeLeft: number;
  restIsRunning: boolean;
  restTotal: number;
  startRestTimer: (seconds: number) => void;
  addRestTime: (seconds: number) => void;
  skipRest: () => void;
  advanceExercise: () => void;
}

const SessionContext = createContext<SessionContextValue>({
  workoutName: WORKOUT_NAME,
  exercises: SESSION_EXERCISES,
  currentIndex: 0,
  restTimeLeft: 0,
  restIsRunning: false,
  restTotal: 120,
  startRestTimer: () => {},
  addRestTime: () => {},
  skipRest: () => {},
  advanceExercise: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [restIsRunning, setRestIsRunning] = useState(false);
  const [restTotal, setRestTotal] = useState(120);

  useEffect(() => {
    if (!restIsRunning || restTimeLeft <= 0) return;
    const t = setTimeout(() => setRestTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [restTimeLeft, restIsRunning]);

  function startRestTimer(seconds: number) {
    setRestTotal(seconds);
    setRestTimeLeft(seconds);
    setRestIsRunning(true);
  }

  function addRestTime(seconds: number) {
    setRestTimeLeft((v) => Math.min(v + seconds, restTotal + seconds));
    setRestTotal((v) => Math.min(v + seconds, v + seconds));
    setRestIsRunning(true);
  }

  function skipRest() {
    setRestTimeLeft(0);
    setRestIsRunning(false);
  }

  function advanceExercise() {
    setCurrentIndex((v) => Math.min(v + 1, SESSION_EXERCISES.length - 1));
    skipRest();
  }

  return (
    <SessionContext.Provider
      value={{
        workoutName: WORKOUT_NAME,
        exercises: SESSION_EXERCISES,
        currentIndex,
        restTimeLeft,
        restIsRunning,
        restTotal,
        startRestTimer,
        addRestTime,
        skipRest,
        advanceExercise,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

import type { SessionExercise } from "@/types";
import { SESSION_EXERCISES, WORKOUT_NAME } from "@/data/mockData";

export type SessionData = {
  sessionId: string;
  workoutName: string;
  exercises: SessionExercise[];
};

export type LogSetPayload = {
  exerciseId: string;
  setNumber: number;
  weight: string;
  reps: string;
};

/**
 * Fetches the exercise list and metadata for an active workout session.
 *
 * @example
 * // Real implementation:
 * const res = await fetch(`/api/sessions/${sessionId}`);
 * if (!res.ok) throw new Error("Session not found");
 * return res.json();
 */
export async function getSession(sessionId: string): Promise<SessionData> {
  void sessionId;
  // TODO: replace with real API call — see @example above
  return { sessionId: "mock-session", workoutName: WORKOUT_NAME, exercises: SESSION_EXERCISES };
}

/**
 * Persists a single logged set during an active session.
 *
 * @example
 * // Real implementation:
 * await fetch(`/api/sessions/${sessionId}/sets`, {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(payload),
 * });
 */
export async function logSet(sessionId: string, payload: LogSetPayload): Promise<void> {
  void sessionId; void payload;
  // TODO: replace with real API call — see @example above
}

/**
 * Marks a session as complete and triggers XP calculation on the server.
 *
 * @example
 * // Real implementation:
 * await fetch(`/api/sessions/${sessionId}/complete`, { method: "POST" });
 */
export async function completeSession(sessionId: string): Promise<void> {
  void sessionId;
  // TODO: replace with real API call — see @example above
}

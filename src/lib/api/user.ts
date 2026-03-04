import type { User, Achievement, WorkoutLog } from "@/types";
import { MOCK_USER, ACHIEVEMENTS, HISTORY_LOGS } from "@/data/mockData";

/**
 * Fetches the authenticated user's full profile.
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/user/profile");
 * if (!res.ok) throw new Error("Failed to fetch profile");
 * return res.json();
 */
export async function getUserProfile(): Promise<User> {
  // TODO: replace with real API call — see @example above
  return MOCK_USER;
}

/**
 * Logs a calorie entry for the current day.
 *
 * @example
 * // Real implementation:
 * await fetch("/api/user/calories/log", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({ kcal }),
 * });
 */
export async function logCalories(kcal: number): Promise<void> {
  void kcal;
  // TODO: replace with real API call — see @example above
}

/**
 * Logs a bodyweight entry for the current day.
 *
 * @example
 * // Real implementation:
 * await fetch("/api/user/weight/log", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({ kg }),
 * });
 */
export async function logWeight(kg: number): Promise<void> {
  void kg;
  // TODO: replace with real API call — see @example above
}

/**
 * Returns all achievements for the authenticated user.
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/user/achievements");
 * return res.json();
 */
export async function getAchievements(): Promise<Achievement[]> {
  // TODO: replace with real API call — see @example above
  return ACHIEVEMENTS;
}

/**
 * Returns the N most recent completed workout logs.
 *
 * @example
 * // Real implementation:
 * const res = await fetch(`/api/user/workouts/recent?limit=${limit}`);
 * return res.json();
 */
export async function getRecentWorkouts(limit = 10): Promise<WorkoutLog[]> {
  void limit;
  // TODO: replace with real API call — see @example above
  return HISTORY_LOGS.slice(0, limit);
}

/**
 * Returns full paginated workout history.
 *
 * @example
 * // Real implementation:
 * const res = await fetch(`/api/user/workouts/history?page=${page}&limit=${limit}`);
 * return res.json();
 */
export async function getWorkoutHistory(page = 1, limit = 20): Promise<WorkoutLog[]> {
  void page; void limit;
  // TODO: replace with real API call — see @example above
  return HISTORY_LOGS;
}

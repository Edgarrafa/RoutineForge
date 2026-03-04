import type { TodayWorkout, WeekWorkout } from "@/types";

/**
 * Returns the workout scheduled for today from the user's active program.
 * Used by TodayFocusCard (workout page) and WotdCard (dashboard).
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/workouts/today");
 * if (!res.ok) throw new Error("No workout scheduled for today");
 * return res.json();
 */
export async function getTodayWorkout(): Promise<TodayWorkout> {
  // TODO: replace with real API call — see @example above
  return {
    sessionId: "stub-session",
    name: "Upper Body Power",
    estimatedMinutes: 45,
    intensity: "High",
    estimatedXp: 850,
    programName: "12-Week Strength Program",
    programWeek: 1,
    programTotalWeeks: 12,
  };
}

/**
 * Returns the 7-day workout schedule for a given week offset.
 * offset=0 is the current week; offset=-1 is last week; offset=1 is next week.
 * Used by WeekScheduleCard.
 *
 * @example
 * // Real implementation:
 * const res = await fetch(`/api/workouts/week?offset=${offset}`);
 * return res.json();
 */
export async function getWeekWorkouts(offset = 0): Promise<WeekWorkout[]> {
  void offset;
  // TODO: replace with real API call — see @example above
  return [];
}

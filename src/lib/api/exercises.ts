import type { ExerciseDetail } from "@/types";
import { EXERCISE_DETAILS } from "@/data/mockData";

export type ExerciseFilters = {
  category?: string;
  equipment?: string;
  bodyPart?: string;
  query?: string;
};

export type LibraryExerciseSummary = {
  id: string;
  name: string;
  category: string;
  equipment: string;
  bodyPart: string;
  image?: string;
};

/**
 * Returns a filtered list of exercises for the exercise library modal.
 * The large inline EXERCISES array in ExerciseLibraryModal.tsx will move here.
 *
 * @example
 * // Real implementation:
 * const params = new URLSearchParams();
 * if (filters.category) params.set("category", filters.category);
 * if (filters.equipment) params.set("equipment", filters.equipment);
 * if (filters.bodyPart) params.set("bodyPart", filters.bodyPart);
 * if (filters.query) params.set("q", filters.query);
 * const res = await fetch(`/api/exercises?${params}`);
 * return res.json();
 */
export async function getExercises(filters: ExerciseFilters = {}): Promise<LibraryExerciseSummary[]> {
  void filters;
  // TODO: replace with real API call — see @example above
  // Inline mock data currently lives in ExerciseLibraryModal.tsx; move to mockData.ts when wiring up
  return [];
}

/**
 * Returns detailed coaching info, muscle maps, and history for a single exercise.
 *
 * @example
 * // Real implementation:
 * const res = await fetch(`/api/exercises/${exerciseId}`);
 * return res.json();
 */
export async function getExerciseDetail(exerciseId: string): Promise<ExerciseDetail> {
  void exerciseId;
  // TODO: replace with real API call — see @example above
  return EXERCISE_DETAILS[0];
}

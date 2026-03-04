import type { Program } from "@/types";

export type CreateProgramPayload = {
  name: string;
  goal: string;
  durationWeeks: number;
  tags: string[];
  isPublic: boolean;
};

export type AddExercisePayload = {
  name: string;
  category: string;
  sets: number;
  reps: string;
  rpe: string;
};

/**
 * Returns all programs created by or shared with the authenticated user.
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/programs");
 * return res.json();
 */
export async function getPrograms(): Promise<Program[]> {
  // TODO: replace with real API call — see @example above
  return [];
}

/**
 * Creates a new program and returns it with its generated id.
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/programs", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(payload),
 * });
 * return res.json();
 */
export async function createProgram(payload: CreateProgramPayload): Promise<Program> {
  void payload;
  // TODO: replace with real API call — see @example above
  return { id: "stub", ...payload, createdAt: new Date().toISOString() };
}

/**
 * Returns a single program by id.
 *
 * @example
 * // Real implementation:
 * const res = await fetch(`/api/programs/${programId}`);
 * return res.json();
 */
export async function getProgram(programId: string): Promise<Program> {
  void programId;
  // TODO: replace with real API call — see @example above
  return { id: programId, name: "", goal: "", durationWeeks: 12, tags: [], isPublic: true, createdAt: "" };
}

/**
 * Updates mutable fields on an existing program.
 *
 * @example
 * // Real implementation:
 * const res = await fetch(`/api/programs/${programId}`, {
 *   method: "PUT",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(patch),
 * });
 * return res.json();
 */
export async function updateProgram(
  programId: string,
  patch: Partial<CreateProgramPayload>
): Promise<Program> {
  void programId; void patch;
  // TODO: replace with real API call — see @example above
  return { id: programId, name: "", goal: "", durationWeeks: 12, tags: [], isPublic: true, createdAt: "" };
}

/**
 * Permanently deletes a program.
 *
 * @example
 * // Real implementation:
 * await fetch(`/api/programs/${programId}`, { method: "DELETE" });
 */
export async function deleteProgram(programId: string): Promise<void> {
  void programId;
  // TODO: replace with real API call — see @example above
}

/**
 * Adds an exercise to a specific day within a program week.
 *
 * @example
 * // Real implementation:
 * await fetch(`/api/programs/${programId}/days/${dayNum}/exercises`, {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(payload),
 * });
 */
export async function addExerciseToDay(
  programId: string,
  dayNum: number,
  payload: AddExercisePayload
): Promise<void> {
  void programId; void dayNum; void payload;
  // TODO: replace with real API call — see @example above
}

/**
 * Updates an exercise slot on a specific program day.
 *
 * @example
 * // Real implementation:
 * await fetch(`/api/programs/${programId}/days/${dayNum}/exercises/${exerciseId}`, {
 *   method: "PUT",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(patch),
 * });
 */
export async function updateExerciseInDay(
  programId: string,
  dayNum: number,
  exerciseId: string,
  patch: Partial<AddExercisePayload>
): Promise<void> {
  void programId; void dayNum; void exerciseId; void patch;
  // TODO: replace with real API call — see @example above
}

/**
 * Removes an exercise from a specific program day.
 *
 * @example
 * // Real implementation:
 * await fetch(`/api/programs/${programId}/days/${dayNum}/exercises/${exerciseId}`, {
 *   method: "DELETE",
 * });
 */
export async function removeExerciseFromDay(
  programId: string,
  dayNum: number,
  exerciseId: string
): Promise<void> {
  void programId; void dayNum; void exerciseId;
  // TODO: replace with real API call — see @example above
}

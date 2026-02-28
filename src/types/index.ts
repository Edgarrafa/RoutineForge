export type User = {
  name: string;
  username: string;
  level: number;
  title: string;
  xp: number;
  xpToNext: number;
  streak: number;
  avatarUrl: string;
};

export type SessionExercise = {
  id: string;
  name: string;
  numSets: number;
  targetReps: string;
  defaultWeight: string;
  lastPerf: string | null;
  restSeconds: number;
  muscleGroup: string;
  category: string;
  badge?: string;
  superset?: boolean;
  image?: string;
};

export type SetEntry = {
  weight: string;
  reps: string;
  logged: boolean;
};

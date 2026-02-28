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

export type CommunityWorkout = {
  name: string;
  tags: string[];
  rating: string | null;
  count: string;
  countColor: string;
  hoverBorder: string;
  hoverShadow: string;
  hoverTitle: string;
  image: string;
};

export type RecentRoutine = {
  name: string;
  meta: string;
  stat: string;
  icon: string;
  accentColor: string;
  accentOpacity: string;
  hoverTitle: string;
  gradientFrom: string;
};

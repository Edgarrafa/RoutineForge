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

export type LoggedSet = {
  set: number;
  weight: string;
  reps: number;
  rpe: number;
  isPR?: boolean;
};

export type LoggedExercise = {
  id: string;
  name: string;
  muscleGroup: string;
  category: string;
  equipment: string;
  image?: string;
  note?: string;
  sets: LoggedSet[];
  estOneRM: number;
};

export type XPBreakdown = {
  volumeBase: number;
  clanBonus: number;
  achievements: number;
};

export type WorkoutLog = {
  id: string;
  name: string;
  date: string;    // Display string, e.g. "Today, 07:30 AM"
  isoDate: string; // YYYY-MM-DD for calendar/date logic
  time: string;
  duration: string;
  volume: string;
  totalSets: number;
  prsBroken: number;
  tags: string[];
  image?: string;
  exercises: LoggedExercise[];
  xp: number;
  xpBreakdown: XPBreakdown;
  quest?: { title: string; description: string };
  isNewPR?: boolean;
};

export type Achievement = {
  id: string;
  icon: string;
  color: string;
  unlocked: boolean;
};

export type PerformanceCue = {
  step: number;
  title: string;
  desc: string;
};

export type PrimaryMover = {
  name: string;
  pct: number;
};

export type ExerciseDetail = {
  id: string;
  name: string;
  level: string;
  type: string;
  muscles: string[];
  equipment: string;
  cues: PerformanceCue[];
  movers: PrimaryMover[];
  historyData: number[];
};

export type TemplateExercise = {
  name: string;
  category: string;
  sets: number;
  reps: string;
  rpe: string;
};

export type PrebuiltDay = {
  id: string;
  name: string;
  focus: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  exercises: TemplateExercise[];
};

export type PrebuiltWeekDay = {
  name: string;
  focus: string;
  exercises: TemplateExercise[];
} | null;

export type PrebuiltWeek = {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  focus: string;
  days: PrebuiltWeekDay[]; // 7 entries, null = rest
};

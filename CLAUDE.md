# RoutineForge — CLAUDE.md

Gamified fitness RPG app. Next.js 16 + Tailwind CSS v4 + shadcn/ui v3.

## Stack

- **Framework**: Next.js 16.1.6 (App Router), React 19, React Compiler enabled
- **Styling**: Tailwind CSS v4 — no `tailwind.config.js`. Theme via `@theme inline` in `globals.css`. Uses `@import "tailwindcss"`.
- **Components**: shadcn/ui v3 — `@import "shadcn/tailwind.css"`, oklch colors, components in `src/components/ui/`
- **Icons**: Material Symbols Outlined — loaded via `<link>` in `layout.tsx` head (not CSS `@import url()`)
- **Auth**: Mock auth via localStorage (`rf_auth` key) + React Context in `src/context/AuthContext.tsx`

## Project Structure

```
src/
├── app/
│   ├── globals.css          # All theme tokens + custom utility classes
│   ├── layout.tsx           # Root layout: fonts, AuthProvider, UserProvider, Material Symbols <link>
│   ├── page.tsx             # Landing page
│   ├── dashboard/page.tsx   # Protected dashboard
│   ├── workout/page.tsx     # Protected workout overview
│   ├── builder/page.tsx     # Protected program builder (full-screen app layout)
│   └── session/page.tsx     # Protected active workout session (full-screen, SessionProvider scoped here)
├── components/
│   ├── ui/                  # shadcn: button, input, badge
│   ├── landing/             # Navbar, HeroSection, RoutineCreatorSection, CharacterSheetSection,
│   │                        # WorkoutPathsSection, ClanSection, CtaSection, Footer
│   ├── dashboard/           # DashboardNavbar, WotdCard, QuickStatsRow,
│   │                        # CommunityFavorites, RecentRoutines
│   ├── workout/             # TodayFocusCard, WeekScheduleCard, MilestonesCard, ProgramProgressionCard
│   ├── session/             # SessionHeader, RoutineSidebar, ExerciseCard, RestTimerPanel
│   └── builder/             # BuilderHeader, ProgramSidebar, BuilderMain, ExerciseLibraryModal
├── context/
│   ├── AuthContext.tsx      # useAuth() → { isLoggedIn, mounted, login, logout }
│   ├── UserContext.tsx      # useUser() → { user, logCalories, logWeight }
│   └── SessionContext.tsx   # useSession() → { exercises, currentIndex, restTimeLeft, startRestTimer, ... }
├── data/
│   └── mockData.ts          # MOCK_USER, SESSION_EXERCISES, WORKOUT_NAME
├── types/
│   └── index.ts             # User, SessionExercise, SetEntry
└── lib/utils.ts             # cn() helper
```

## Fonts (all loaded via `next/font/google`)

| Variable           | Font          | Usage                        |
|--------------------|---------------|------------------------------|
| `--font-orbitron`  | Orbitron      | Session/workout headings     |
| `--font-inter`     | Inter         | Body / default               |
| `--font-lexend`    | Lexend        | Dashboard UI                 |
| `--font-grotesk`   | Space Grotesk | Builder page                 |

Class syntax: `font-[family-name:var(--font-lexend)]`

## Color Palettes

**Landing** (`src/components/landing/`):
- Pink: `#ec4899`, Purple: `#a855f7`, Cyan: `#06b6d4`
- Background: `#09090b`

**Dashboard** (`src/components/dashboard/`):
- Pink: `#ff00ff`, Purple: `#bc13fe`, Cyan: `#00f3ff`
- Background: `#050510`, Card: `#0f0f23`, Border: `#2d2d55`
- Available as `bg-synth-bg`, `border-synth-border`, etc.

**Workout** (`src/components/workout/`):
- Uses landing palette: Pink: `#ec4899`, Purple: `#a855f7`, Green: `#10b981`

**Session** (`src/components/session/`):
- Uses landing palette: Pink: `#ec4899`, Purple: `#a855f7`, Green: `#10b981`
- Background: `#0d0d14`, Panel: `#0a0a0f`

**Builder** (`src/components/builder/`):
- Primary: `#f4257b`, Background: `#0d060a`, Panel: `#1a0f14`
- Save button: neon green `#39ff14`
- Colors used as inline arbitrary values only

## Key Custom CSS Classes (globals.css)

- `.gradient-text` — animated pink→purple gradient text
- `.text-glow` — neon text shadow
- `.grid-bg` — purple grid background (landing)
- `.bg-grid-synth` — grid background (dashboard/workout, masked bottom)
- `.cyber-card` — hover-lift dark card
- `.btn-synth` — gradient pink→purple pill button
- `.hide-scroll` — hides scrollbar cross-browser
- `.material-symbols-outlined` — icon font settings

## Auth Pattern

All protected pages use the same pattern:
```tsx
const { isLoggedIn, mounted } = useAuth();
useEffect(() => { if (mounted && !isLoggedIn) router.replace("/"); }, [mounted, isLoggedIn, router]);
if (!mounted || !isLoggedIn) return null; // anti-flash
```

## Context Architecture

**UserContext** — provided globally in `layout.tsx` (wraps all pages):
```tsx
const { user, logCalories, logWeight } = useUser();
// user: { name, username, level, title, xp, xpToNext, streak, avatarUrl }
```

**SessionContext** — provided only inside `session/page.tsx` (scoped to session):
```tsx
const { workoutName, exercises, currentIndex, restTimeLeft, restIsRunning,
        restTotal, startRestTimer, addRestTime, skipRest, advanceExercise } = useSession();
```
- `startRestTimer(seconds)` — called by ExerciseCard on set log → auto-starts RestTimerPanel
- `advanceExercise()` — increments currentIndex; session/page.tsx passes `key={currentIndex}` to ExerciseCard, causing it to remount with fresh state for the next exercise
- `exercises` comes from `src/data/mockData.ts` (SESSION_EXERCISES)

## Session Flow

```
Log set in ExerciseCard → startRestTimer(ex.restSeconds) → RestTimerPanel counts down
All sets logged → "Next Exercise" button → advanceExercise()
  → currentIndex++ → ExerciseCard remounts (key prop) → RoutineSidebar updates status
```

## Important Rules

- **Tailwind v4**: No `tailwind.config.js`. Custom tokens go in `@theme inline` in `globals.css`.
- **shadcn v3**: Preserve `@import "shadcn/tailwind.css"` and `@import "tw-animate-css"` in globals.css.
- **Icons**: Always load Material Symbols via `<link>` tag. Never `@import url()` in CSS.
- **`"use client"`**: Only add where state/effects/event handlers are needed.
- **Builder layout**: `h-screen overflow-hidden flex flex-col` — no page scroll. Sidebar and day canvas scroll independently.
- **Session layout**: `h-screen overflow-hidden flex flex-col` — no page scroll. Same pattern as builder.
- **Images**: Use plain `<img>` tags, not `next/image` (avoids domain config).
- **Mock data**: All shared data lives in `src/data/mockData.ts`. Types in `src/types/index.ts`.

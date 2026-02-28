## RoutineForge

RoutineForge is a gamified fitness RPG web app where training feels like progression in a game. Users can explore workouts, run guided sessions, build programs, and track character-style stats through a neon cyber-fantasy UI.

## Features

- **Landing experience** with themed sections for hero content, workout paths, character sheet, and call-to-action
- **Mock auth flow** using localStorage and protected pages with anti-flash redirect behavior
- **Dashboard** with workout-of-the-day, quick stats, community favorites, and recent routines
- **Workout overview** with today’s focus, weekly schedule, milestones, and progression cards
- **Program Builder** full-screen layout with sidebar + day canvas workflow for assembling routines
- **Active Session** full-screen guided workout flow with exercise logging, rest timer, and routine progress

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 + global theme tokens in `src/app/globals.css`
- **UI primitives:** shadcn/ui v3 components in `src/components/ui`
- **State/Context:** Auth, User, and Session context providers
- **Language/tooling:** TypeScript + ESLint

## App Routes

- `/` — landing page
- `/dashboard` — protected dashboard
- `/workout` — protected workout overview
- `/builder` — protected program builder
- `/session` — protected active workout session

## Project Structure

```text
src/
	app/           # App Router pages + global styles
	components/    # Feature components (landing, dashboard, workout, builder, session, ui)
	context/       # AuthContext, UserContext, SessionContext
	data/          # Mock data and seeded content
	types/         # Shared TypeScript types
	lib/           # Utility helpers
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` — run local dev server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Notes

- Authentication is mocked via localStorage (`rf_auth`) for frontend flow development.
- Shared mock data is defined in `src/data/mockData.ts`.
- Material Symbols icons are loaded via a `<link>` tag in the root layout.

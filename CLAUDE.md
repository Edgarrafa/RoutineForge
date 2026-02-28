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
│   ├── layout.tsx           # Root layout: fonts, AuthProvider, Material Symbols <link>
│   ├── page.tsx             # Landing page
│   ├── dashboard/page.tsx   # Protected dashboard
│   └── builder/page.tsx     # Protected program builder (full-screen app layout)
├── components/
│   ├── ui/                  # shadcn: button, input, badge
│   ├── landing/             # Navbar, HeroSection, RoutineCreatorSection, CharacterSheetSection,
│   │                        # WorkoutPathsSection, ClanSection, CtaSection, Footer
│   ├── dashboard/           # DashboardNavbar, WotdCard, QuickStatsRow,
│   │                        # CommunityFavorites, RecentRoutines
│   └── builder/             # BuilderHeader, ProgramSidebar, BuilderMain
├── context/
│   └── AuthContext.tsx      # useAuth() → { isLoggedIn, mounted, login, logout }
└── lib/utils.ts             # cn() helper
```

## Fonts (all loaded via `next/font/google`)

| Variable           | Font          | Usage                        |
|--------------------|---------------|------------------------------|
| `--font-orbitron`  | Orbitron      | Landing headings (sci-fi)    |
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

**Builder** (`src/components/builder/`):
- Primary: `#f4257b`, Background: `#0d060a`, Panel: `#1a0f14`
- Save button: neon green `#39ff14`
- Colors used as inline arbitrary values only

## Key Custom CSS Classes (globals.css)

- `.gradient-text` — animated pink→purple gradient text
- `.text-glow` — neon text shadow
- `.grid-bg` — purple grid background (landing)
- `.bg-grid-synth` — grid background (dashboard, masked bottom)
- `.cyber-card` — hover-lift dark card
- `.btn-synth` — gradient pink→purple pill button
- `.hide-scroll` — hides scrollbar cross-browser
- `.material-symbols-outlined` — icon font settings

## Auth Pattern

All protected pages (`/dashboard`, `/builder`) use the same pattern:
```tsx
const { isLoggedIn, mounted } = useAuth();
useEffect(() => { if (mounted && !isLoggedIn) router.replace("/"); }, [mounted, isLoggedIn, router]);
if (!mounted || !isLoggedIn) return null; // anti-flash
```

## Important Rules

- **Tailwind v4**: No `tailwind.config.js`. Custom tokens go in `@theme inline` in `globals.css`.
- **shadcn v3**: Preserve `@import "shadcn/tailwind.css"` and `@import "tw-animate-css"` in globals.css.
- **Icons**: Always load Material Symbols via `<link>` tag. Never `@import url()` in CSS.
- **`"use client"`**: Only add where state/effects/event handlers are needed.
- **Builder layout**: `h-screen overflow-hidden flex flex-col` — no page scroll. Sidebar and day canvas scroll independently.
- **Images**: Use plain `<img>` tags, not `next/image` (avoids domain config).

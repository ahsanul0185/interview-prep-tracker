# Interview Prep Tracker

One responsive dashboard for job seekers to track job applications, interview
rounds, DSA prep, HR questions, and reminders — backed by Supabase Auth and
Postgres. Product spec: [`requirement/PRD.md`](requirement/PRD.md).

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS 4**
- **Supabase** — Auth (email/password) + Postgres with row-level security
- **@supabase/ssr** — server/client auth helpers
- Hosting: Vercel / Netlify (free tier)

## Design

- **Font:** Outfit (`next/font/google`)
- **Primary:** `#00917a` teal, full 50–950 shade scale → `primary-*` utilities
- **Style:** soft modern — small rounded corners, subtle 1px borders, light backgrounds, minimal shadows
- **Surfaces:** `background` `#fafafa`, `surface` white, `foreground` `#171717`
- Tokens are defined in `src/app/globals.css` via Tailwind 4 `@theme`; reusable primitives live in `src/components/ui/` (Button, Input, Textarea, Select, Badge, Card, Modal, Spinner, EmptyState, DataTable)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
#    → fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
#      from https://supabase.com/dashboard/project/_/settings/api-keys
#    (use the publishable key — never the secret key)
#
#    Email verification is not used in this app — turn off "Confirm email" at
#    https://supabase.com/dashboard/project/_/auth/providers (Email provider)
#    so new users are signed in immediately after signup.

# 3. Create the database schema
#    → open supabase/schema.sql and run it in the Supabase SQL editor

# 4. Run the dev server
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
├── proxy.ts                     # Next 16 request interceptor: session refresh + route protection
├── app/
│   ├── layout.tsx               # Root layout + metadata
│   ├── globals.css              # Tailwind 4 entry + design tokens
│   ├── page.tsx                 # / — redirects by auth state
│   ├── (auth)/
│   │   ├── layout.tsx           # Centered auth shell
│   │   ├── login/page.tsx       # /login
│   │   └── signup/page.tsx      # /signup
│   └── (dashboard)/             # Protected routes (PRD 7.1)
│       ├── layout.tsx           # App shell (sidebar/mobile nav)
│       ├── dashboard/page.tsx   # /dashboard — overview widgets
│       ├── applications/
│       │   ├── page.tsx         # /applications — data table with filter + pagination
│       │   └── [id]/page.tsx    # /applications/:id — detail + interview rounds
│       ├── dsa/page.tsx         # /dsa — DSA topic tracker + progress
│       ├── hr/page.tsx          # /hr — HR question tracker
│       └── reminders/page.tsx   # /reminders — reminders with overdue flags
├── components/
│   ├── ui/                      # Button, Input, Modal, Card, Badge, DataTable, …
│   ├── layout/                  # Sidebar, MobileNav, UserMenu
│   ├── auth/                    # LoginForm, SignupForm
│   ├── applications/            # ApplicationForm, StageBadge/Counts/Filter
│   ├── rounds/                  # Interview round components
│   ├── dsa/                     # DSA tracker components
│   ├── hr/                      # HR tracker components
│   └── reminders/               # Reminder components
├── hooks/                       # Per-domain Supabase data hooks
├── lib/
│   ├── supabase/                # client.ts (browser), server.ts (server), proxy.ts helper
│   ├── constants.ts             # Stages, statuses, states (PRD fixed sets)
│   └── utils.ts                 # cn(), date helpers
└── types/                       # Domain types (PRD §9 data model)
supabase/
└── schema.sql                   # Tables + RLS policies + profile trigger
```

## Features

All MVP (P0) features from the PRD are implemented:

- Email/password auth with session persistence and protected routes
- Job applications with full CRUD, stage tracking, and stage counts
- Interview rounds per application with status tracking
- DSA topic tracker with three-state progress and confidence summary
- HR question tracker with prepared/needs-work state
- Reminders with overdue and due-today flags + done toggle
- Responsive layout (sidebar on desktop, bottom tab bar on mobile)
- Reusable `DataTable` with client-side filter and pagination

## Deploy

```bash
# 1. Verify quality
npm run lint
npm run build

# 2. Create a production build
#    → set the same Supabase env vars in your host (Vercel/Netlify)
#    → ensure the schema.sql has been run on the production Supabase project

# 3. Push/deploy via your host's CLI or Git integration
```

## Final QC checklist

Before calling the project done, run through these manually:

- [ ] Sign up a fresh account → a `profiles` row is created automatically.
- [ ] Create two accounts and confirm neither can see the other's data (RLS test).
- [ ] Add an application, edit it, delete it — data persists after logout/re-login.
- [ ] Add interview rounds, DSA topics, HR questions, reminders — all persist.
- [ ] Check overdue/due-today reminder flags.
- [ ] Resize the browser to 320px width — no horizontal scroll, all tap targets reachable.
- [ ] `npm run lint` and `npm run build` both pass.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (flat config) |

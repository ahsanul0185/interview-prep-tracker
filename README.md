# Interview Prep Tracker

One responsive dashboard for job seekers to track job applications, interview
rounds, DSA prep, HR questions, and reminders — backed by Supabase Auth and
Postgres. Product spec: [`requirement/PRD.md`](requirement/PRD.md).

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS 4**
- **Supabase** — Auth (email/password) + Postgres with row-level security
- **@supabase/ssr** — server/client auth helpers
- Hosting: Vercel / Netlify (free tier)

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
#    → run supabase/schema.sql in the Supabase SQL editor (once implemented)

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
│   ├── globals.css              # Tailwind 4 entry
│   ├── page.tsx                 # / — entry point (TODO: redirect by auth state)
│   ├── (auth)/
│   │   ├── layout.tsx           # Centered auth shell
│   │   ├── login/page.tsx       # /login
│   │   └── signup/page.tsx      # /signup
│   └── (dashboard)/             # Protected routes (PRD 7.1)
│       ├── layout.tsx           # App shell (sidebar/mobile nav)
│       ├── dashboard/page.tsx   # /dashboard — overview: stage counts, reminders, DSA progress
│       ├── applications/
│       │   ├── page.tsx         # /applications — list/grid, CRUD
│       │   └── [id]/page.tsx    # /applications/:id — detail + interview rounds
│       ├── dsa/page.tsx         # /dsa — DSA topic tracker
│       ├── hr/page.tsx          # /hr — HR question tracker
│       └── reminders/page.tsx   # /reminders — reminders with overdue flags
├── components/
│   ├── ui/                      # Button, Input, Modal, Card, Badge, …
│   ├── layout/                  # Sidebar, MobileNav, UserMenu
│   ├── auth/                    # LoginForm, SignupForm
│   ├── applications/            # ApplicationCard/Form, StageBadge/Counts/Filter
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
└── schema.sql                   # Tables + RLS policies (PRD §9)
```

**Implemented (M1):** email/password auth, session persistence, protected
routes, login/logout, dashboard shell. Remaining feature files contain TODO
stubs following the PRD milestones (M2 core CRUD → M3 prep modules → M4
reminders/polish → M5 delivery).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint (flat config) |

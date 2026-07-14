# PRD: Interview Prep Tracker

**Project ID:** WD-0508
**Category:** Web Development / Web Application Development
**Document type:** Product Requirements Document
**Status:** MVP scope, draft v1
**Last updated:** 2026-07-08

---

## 1. Overview

Interview Prep Tracker is a frontend-focused web app that gives students, freshers, and job seekers one place to run their job search and interview preparation. Today this information is scattered across spreadsheets, notes apps, and chat threads. Applications sit in one file, DSA practice in another, HR prep somewhere else, and deadlines get lost. This product pulls all of it into a single responsive dashboard backed by Supabase.

This document defines the MVP. The goal is a clean, working single-user app that covers applications, stages, interview rounds, DSA topics, HR questions, and reminders, with real persistence through Supabase Auth and database.

## 2. Problem Statement

Job seekers juggle many parallel tracks during a search: which companies they applied to, what stage each application is in, when interviews are scheduled, which DSA topics they still need to practice, and which behavioral questions they have prepared. No single lightweight tool ties these together. Existing options are either heavy applicant-tracking systems built for recruiters, or generic spreadsheets that require manual upkeep and offer no structure.

The result is missed follow-ups, forgotten interview dates, and uneven prep. A focused tracker built around the job seeker's own workflow removes that friction.

## 3. Goals and Non-Goals

### Goals

1. Let a user manage every job application from one dashboard with clear stage tracking.
2. Let a user log interview rounds per application with dates, status, and notes.
3. Give a user a simple tracker for DSA topics and HR questions tied to their prep.
4. Remind a user of upcoming deadlines so nothing slips.
5. Persist all data per user through Supabase, usable across sessions and devices.

### Non-Goals

- No multi-user teams, sharing, or collaboration.
- No recruiter or employer side of the marketplace.
- No payments, ads, or premium tiers.
- No email sending, push notifications, or calendar sync in this MVP.
- No analytics suite or reporting dashboards beyond basic on-screen counts.

## 4. Target Users

| Persona | Description | Core need |
|---|---|---|
| The student | Final-year student applying to campus and off-campus roles | Track many applications and keep DSA prep on schedule |
| The fresher | Recent graduate in an active job hunt | See interview rounds and deadlines at a glance |
| The switcher | Working professional preparing on the side | Organize prep in short, focused sessions without setup overhead |

All three want a fast, no-clutter tool that works on a phone during commutes and on a laptop during focused prep.

## 5. User Stories

### Auth

- As a new user, I can sign up with email and password so I have my own private space.
- As a returning user, I can log in and log out, and my session survives a refresh.
- As a logged-out user, I cannot reach the dashboard.

### Applications

- As a user, I can add a job application with company, role, stage, date applied, link, and notes.
- As a user, I can edit or delete an application.
- As a user, I can see all my applications in a list or card grid, newest first.

### Stage tracking

- As a user, I can set each application to one of six stages and change it as I progress.
- As a user, I can see how many applications sit in each stage.

### Interview rounds

- As a user, I can add interview rounds to an application with type, date, status, and notes.
- As a user, I can update a round's status as the outcome becomes known.

### DSA tracker

- As a user, I can add DSA topics and mark each as Not Started, In Progress, or Confident.
- As a user, I can see how many topics I am confident on out of the total.

### HR tracker

- As a user, I can add HR questions with my prepared answer notes.
- As a user, I can mark each question Prepared or Needs Work.

### Reminders

- As a user, I can create a reminder with a title, due date, and optional linked application.
- As a user, I can see overdue and due-today reminders flagged, and mark them done.

## 6. Features and Priorities

Priority key: **P0** = must ship for MVP, **P1** = ship if time allows, **P2** = future.

| Feature | Priority | Notes |
|---|---|---|
| Supabase email/password auth | P0 | Signup, login, logout, protected routes |
| Job application CRUD | P0 | Full create, edit, delete |
| Stage tracking with counts | P0 | Six fixed stages, per-stage counts |
| Interview rounds per application | P0 | Type, date, status, notes |
| DSA topic tracker | P0 | Three-state status, progress summary |
| HR question tracker | P0 | Prepared / needs-work state |
| Reminders with overdue flags | P0 | Due-today and overdue highlighting |
| Responsive mobile layout | P0 | Usable at 320px width |
| Search or filter applications | P1 | Filter by stage or company |
| Dark mode | P2 | Developer's choice |
| Calendar view of reminders | P2 | Out of MVP scope |

## 7. Functional Requirements

### 7.1 Authentication

- Auth is handled by Supabase Auth with email and password.
- Session persists across page reloads.
- All dashboard routes are protected. Unauthenticated users redirect to login.

### 7.2 Data ownership

- Every record belongs to exactly one user.
- Row-level security ensures no user can read or write another user's data.

### 7.3 Job applications

- Fields: company name (required), role/title (required), stage (required), date applied, job link (optional), notes (optional).
- Stages, fixed set: `Wishlist`, `Applied`, `Online Assessment`, `Interview`, `Offer`, `Rejected`.
- Deleting an application prompts a confirm step and removes its child interview rounds.

### 7.4 Interview rounds

- A round belongs to one application.
- Fields: round type (for example Phone Screen, Technical, HR, System Design), date, status (`Scheduled`, `Cleared`, `Failed`), notes.

### 7.5 DSA topics

- Fields: topic name, status (`Not Started`, `In Progress`, `Confident`).
- A summary shows count of Confident topics over total.

### 7.6 HR questions

- Fields: question text, answer notes, state (`Prepared`, `Needs Work`).

### 7.7 Reminders

- Fields: title, due date, optional linked application, done flag.
- Overdue and due-today reminders are visually flagged on the dashboard.

## 8. Non-Functional Requirements

- **Responsiveness:** usable from 320px up, no horizontal scroll on mobile.
- **Performance:** dashboard first paint under 3 seconds on a normal connection.
- **Reliability:** every write persists to Supabase and survives logout and re-login.
- **Browser support:** latest Chrome, Edge, Firefox, Safari.
- **Accessibility:** readable contrast, keyboard-operable forms, meaningful labels.
- **Code quality:** clean folder structure, reusable components, sensible naming.

## 9. Technical Architecture

- **Frontend:** React 18+ or Next.js 14+ with Tailwind CSS.
- **Backend:** Supabase for Auth and Postgres database. No custom server layer.
- **Client library:** Supabase JS client for auth and data access.
- **State:** React hooks or a light state utility.
- **Hosting:** Vercel, Netlify, or a similar free host.

### Suggested data model

| Table | Key fields |
|---|---|
| profiles | id, user_id, display_name |
| applications | id, user_id, company, role, stage, date_applied, link, notes |
| interview_rounds | id, application_id, user_id, round_type, date, status, notes |
| dsa_topics | id, user_id, name, status |
| hr_questions | id, user_id, question, answer_notes, state |
| reminders | id, user_id, title, due_date, application_id, is_done |

All tables carry `user_id` and enforce row-level security scoped to the authenticated user.

## 10. Success Metrics

For this MVP, success is measured by working behavior rather than usage analytics:

- A fresh user can go from signup to a saved first application in under two minutes.
- All six feature areas work end to end with data that persists across sessions.
- Zero cross-user data leakage in testing.
- The app is fully usable on a 320px mobile viewport.
- No console errors and no broken flows in the acceptance pass.

## 11. Out of Scope

- Team accounts, sharing, and multi-user collaboration.
- Payments, ads, and in-app purchases.
- Email, push, or SMS notifications.
- Third-party job board imports or scraping.
- Advanced analytics and reporting.
- Native mobile apps.

## 12. Milestones

| Milestone | Outcome |
|---|---|
| M1 Setup | Project scaffold, Tailwind, Supabase project, auth working |
| M2 Core CRUD | Applications and stage tracking complete and persisting |
| M3 Prep modules | Interview rounds, DSA tracker, HR tracker complete |
| M4 Reminders and polish | Reminders, responsive pass, empty states, error handling |
| M5 Delivery | Deployed URL, README, schema file, final QC pass |

## 13. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Supabase RLS misconfigured, data leaks across users | Test with two accounts before delivery; ship RLS policies in the schema file |
| Scope creep into P1/P2 features | Hold the P0 line; treat filter, dark mode, and calendar as optional |
| Mobile layout breaks on narrow screens | Test at 320px early, not at the end |
| Lost data on refresh | Confirm every write hits Supabase and reloads correctly |

## 14. Acceptance Summary

The MVP is accepted when a fresh user can sign up, log in, and manage a full job search from one responsive dashboard: adding applications, moving them through all six stages, logging interview rounds, tracking DSA topics and HR questions, and setting reminders that flag deadlines, with every action saved to their own Supabase-backed account and available on their next login.
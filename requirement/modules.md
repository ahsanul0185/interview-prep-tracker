# Interview Prep Tracker — Module-by-Module Task List

This file lists the exact files/tasks per module so you can pick up where you left off. The plan follows the PRD milestones (M1 → M5). Modules 0–2 are already implemented; Modules 3–8 remain.

---

## Status overview

| Module | Status | Notes |
|---|---|---|
| 0 — Database schema | ✅ Done | Run `supabase/schema.sql` in your Supabase SQL editor |
| 1 — Foundations | ✅ Done | Types, constants, utils, Modal, ConfirmDialog |
| 2 — Applications + stage tracking | ✅ Done | Full CRUD, stage filter, detail page shell |
| 3 — Interview rounds | ✅ Done | |
| 4 — DSA tracker | ⏳ To do | |
| 5 — HR tracker | ⏳ To do | |
| 6 — Reminders | ⏳ To do | |
| 7 — Dashboard + polish | ⏳ To do | |
| 8 — Delivery | ⏳ To do | |

---

## Module 0 — Database foundation

> ✅ Already implemented in `supabase/schema.sql`. You still need to execute it once in Supabase.

- [x] Create `profiles` table (`id`, `user_id`, `display_name`)
- [x] Create `applications` table with six-stage CHECK constraint
- [x] Create `interview_rounds` table with CASCADE delete from `applications`
- [x] Create `dsa_topics`, `hr_questions`, `reminders` tables
- [x] Add indexes on `user_id` and foreign keys
- [x] Enable RLS on all six tables
- [x] Add SELECT/INSERT/UPDATE/DELETE policies scoped to `auth.uid() = user_id`
- [x] Add `handle_new_user()` trigger + `on_auth_user_created` to auto-create a profile at signup
- [ ] **Run the script in Supabase SQL Editor** (manual step)

**Acceptance:** signup creates a profile; two test accounts cannot see each other's rows.

---

## Module 1 — Shared foundations

> ✅ Already implemented.

- [x] `src/types/index.ts` — domain types (`Profile`, `Application`, `InterviewRound`, `DsaTopic`, `HrQuestion`, `Reminder`) and union types
- [x] `src/lib/constants.ts` — `APPLICATION_STAGES`, `ROUND_TYPES`, `ROUND_STATUSES`, `DSA_STATUSES`, `HR_STATES`, plus badge color maps
- [x] `src/lib/utils.ts` — `cn()`, `formatDate()`, `isOverdue()`, `isDueToday()`
- [x] `src/components/ui/Modal.tsx` — accessible modal (Esc/backdrop close, scroll lock, `role="dialog"`)
- [x] `src/components/ui/ConfirmDialog.tsx` — reusable delete confirmation
- [x] `src/components/ui/Button.tsx` — added `asChild` support for Next.js `<Link>`

**Acceptance:** `npx tsc --noEmit` passes.

---

## Module 2 — Applications + stage tracking

> ✅ Already implemented.

- [x] `src/hooks/useApplications.ts` — fetch, create, update, delete applications (newest first)
- [x] `src/hooks/useApplication.ts` — fetch single application by ID
- [x] `src/components/applications/StageBadge.tsx` — colored stage pill
- [x] `src/components/applications/StageCounts.tsx` — per-stage count cards
- [x] `src/components/applications/StageFilter.tsx` — filter dropdown (P1)
- [x] `src/components/applications/ApplicationCard.tsx` — card with link + edit/delete actions
- [x] `src/components/applications/ApplicationForm.tsx` — create/edit form (company, role, stage, date, link, notes)
- [x] `src/app/(dashboard)/applications/page.tsx` — list/grid with modal CRUD and delete confirm
- [x] `src/app/(dashboard)/applications/[id]/page.tsx` — detail view + placeholder for rounds

**Acceptance:** full CRUD persists across logout/re-login; stage counts update live.

---

## Module 3 — Interview rounds

> ✅ Already implemented.

- [x] `src/hooks/useInterviewRounds.ts`
- [x] `src/components/rounds/RoundStatusBadge.tsx`
- [x] `src/components/rounds/RoundForm.tsx`
- [x] `src/components/rounds/RoundList.tsx`
- [x] `src/app/(dashboard)/applications/[id]/page.tsx` wired for rounds

### Acceptance

- [x] Can add/update/delete rounds on an application detail page.
- [x] Round status updates persist.
- [x] Deleting an application cascades via database FK.

---

## Module 4 — DSA tracker

### Files to create/modify

- [ ] `src/hooks/useDsaTopics.ts`
  - fetch/create/update/delete DSA topics
- [ ] `src/components/dsa/DsaProgressBar.tsx`
  - show `Confident / total`
- [ ] `src/components/dsa/DsaTopicForm.tsx`
  - field: `name`; default status `Not Started`
- [ ] `src/components/dsa/DsaTopicList.tsx`
  - show topic name + status selector (`Not Started`, `In Progress`, `Confident`)
  - edit name + delete action
- [ ] `src/app/(dashboard)/dsa/page.tsx`
  - header + progress bar + "Add topic" modal + list

### Acceptance

- [ ] Can add/edit/delete DSA topics.
- [ ] Three-state status toggles persist.
- [ ] Progress bar shows correct `Confident / total` ratio.

---

## Module 5 — HR tracker

### Files to create/modify

- [ ] `src/hooks/useHrQuestions.ts`
  - fetch/create/update/delete HR questions
- [ ] `src/components/hr/HrQuestionForm.tsx`
  - fields: `question` (Textarea), `answer_notes` (Textarea)
- [ ] `src/components/hr/HrQuestionList.tsx`
  - show question + answer notes
  - toggle `Prepared` / `Needs Work`
  - edit/delete actions
- [ ] `src/app/(dashboard)/hr/page.tsx`
  - header + "Add question" modal + list

### Acceptance

- [ ] Can add/edit/delete HR questions with answer notes.
- [ ] State toggle persists.

---

## Module 6 — Reminders

### Files to create/modify

- [ ] `src/hooks/useReminders.ts`
  - fetch/create/update/delete/toggle-done reminders
  - optional linked `application_id`
- [ ] `src/components/reminders/DueBadge.tsx`
  - show "Overdue", "Due today", or future due date
  - use `isOverdue` / `isDueToday` from utils
- [ ] `src/components/reminders/ReminderForm.tsx`
  - fields: `title`, `due_date` (date), optional linked application (Select)
- [ ] `src/components/reminders/ReminderList.tsx`
  - show title, due date, optional company, DueBadge, done checkbox, edit/delete
- [ ] `src/app/(dashboard)/reminders/page.tsx`
  - header + "Add reminder" modal + list

### Acceptance

- [ ] Can add/edit/delete reminders.
- [ ] Overdue and due-today reminders are visually flagged.
- [ ] Done toggle persists.

---

## Module 7 — Dashboard overview + polish

### Files to create/modify

- [ ] `src/app/(dashboard)/dashboard/page.tsx`
  - import `useApplications`, `useReminders`, `useDsaTopics`
  - show `StageCounts` widget
  - show overdue/due-today reminders widget
  - show `DsaProgressBar` summary
  - quick links to `/applications`, `/dsa`, `/hr`, `/reminders`
- [ ] `src/app/page.tsx`
  - already redirects by auth state; verify it still works
- [ ] All feature pages
  - add empty states where missing
  - add inline error messages
  - add loading spinners
- [ ] Responsive pass
  - test at 320px width
  - ensure no horizontal scroll on mobile
  - check tap targets (≥44px)

### Acceptance

- [ ] Dashboard shows live stage counts, reminders, and DSA progress.
- [ ] Clean layout at 320px.
- [ ] No console errors.

---

## Module 8 — Delivery

### Tasks

- [ ] Update `README.md`
  - mark M1–M5 milestones complete
  - confirm setup steps still match code/env
- [ ] Final QC pass
  - create two Supabase test accounts and verify RLS isolation
  - verify every write survives logout/re-login
  - verify responsive behavior on narrow viewport
- [ ] `npm run lint` — clean
- [ ] `npm run build` — clean
- [ ] Deploy to Vercel/Netlify
- [ ] Add deployed URL to README

### Acceptance

- [ ] Fresh user can sign up and add a first application in under two minutes.
- [ ] `npm run build` succeeds with no errors.
- [ ] No cross-user data leakage.

---

## Quick reference: fixed value sets (PRD)

Keep these in sync with `src/lib/constants.ts` and `supabase/schema.sql` CHECK constraints.

| Domain | Values |
|---|---|
| Application stages | Wishlist, Applied, Online Assessment, Interview, Offer, Rejected |
| Round types | Phone Screen, Technical, HR, System Design, Behavioral, Final |
| Round statuses | Scheduled, Cleared, Failed |
| DSA statuses | Not Started, In Progress, Confident |
| HR states | Prepared, Needs Work |

---

## Profile creation reminder

A `profiles` row is created **automatically at signup** by the `handle_new_user()` trigger in `supabase/schema.sql`. It is **not** created by app code and **not** created on login. The trigger pulls `display_name` from signup metadata if available, otherwise falls back to the part before `@` in the email.

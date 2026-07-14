-- Interview Prep Tracker — Supabase schema (PRD §9 data model)
-- Run this once in the Supabase SQL editor (SQL Editor → New query → Run).
--
-- Contents:
--   1. Tables (profiles, applications, interview_rounds, dsa_topics, hr_questions, reminders)
--   2. Indexes
--   3. Row-level security (every table scoped to auth.uid() = user_id)
--   4. handle_new_user() trigger — auto-creates a profile at signup
--
-- Data ownership (PRD 7.2): every row carries user_id referencing auth.users(id),
-- and RLS guarantees no user can read or write another user's data.

-- ----------------------------------------------------------------------------
-- 1. Tables
-- ----------------------------------------------------------------------------

create table if not exists public.profiles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null unique references auth.users (id) on delete cascade,
  display_name text,
  created_at   timestamptz not null default now()
);

create table if not exists public.applications (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  company      text not null,
  role         text not null,
  stage        text not null default 'Wishlist'
                 check (stage in (
                   'Wishlist', 'Applied', 'Online Assessment',
                   'Interview', 'Offer', 'Rejected'
                 )),
  date_applied date,
  link         text,
  notes        text,
  created_at   timestamptz not null default now()
);

create table if not exists public.interview_rounds (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  application_id uuid not null references public.applications (id) on delete cascade,
  round_type     text not null,
  date           date,
  status         text not null default 'Scheduled'
                   check (status in ('Scheduled', 'Cleared', 'Failed')),
  notes          text,
  created_at     timestamptz not null default now()
);

create table if not exists public.dsa_topics (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  name       text not null,
  status     text not null default 'Not Started'
               check (status in ('Not Started', 'In Progress', 'Confident')),
  created_at timestamptz not null default now()
);

create table if not exists public.hr_questions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  question     text not null,
  answer_notes text,
  state        text not null default 'Needs Work'
                 check (state in ('Prepared', 'Needs Work')),
  created_at   timestamptz not null default now()
);

create table if not exists public.reminders (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  title          text not null,
  due_date       date not null,
  application_id uuid references public.applications (id) on delete set null,
  is_done        boolean not null default false,
  created_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2. Indexes
-- ----------------------------------------------------------------------------

create index if not exists applications_user_id_idx        on public.applications (user_id);
create index if not exists applications_stage_idx          on public.applications (stage);
create index if not exists interview_rounds_user_id_idx    on public.interview_rounds (user_id);
create index if not exists interview_rounds_app_id_idx     on public.interview_rounds (application_id);
create index if not exists dsa_topics_user_id_idx          on public.dsa_topics (user_id);
create index if not exists hr_questions_user_id_idx        on public.hr_questions (user_id);
create index if not exists reminders_user_id_idx           on public.reminders (user_id);
create index if not exists reminders_due_date_idx          on public.reminders (due_date);

-- ----------------------------------------------------------------------------
-- 3. Row-level security
-- ----------------------------------------------------------------------------
-- Pattern per table: a user may only select / insert / update / delete rows
-- where user_id matches their own auth.uid().

alter table public.profiles         enable row level security;
alter table public.applications     enable row level security;
alter table public.interview_rounds enable row level security;
alter table public.dsa_topics       enable row level security;
alter table public.hr_questions     enable row level security;
alter table public.reminders        enable row level security;

-- profiles
create policy "profiles are viewable by owner"   on public.profiles for select using (auth.uid() = user_id);
create policy "profiles are insertable by owner" on public.profiles for insert with check (auth.uid() = user_id);
create policy "profiles are updatable by owner"  on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "profiles are deletable by owner"  on public.profiles for delete using (auth.uid() = user_id);

-- applications
create policy "applications are viewable by owner"   on public.applications for select using (auth.uid() = user_id);
create policy "applications are insertable by owner" on public.applications for insert with check (auth.uid() = user_id);
create policy "applications are updatable by owner"  on public.applications for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "applications are deletable by owner"  on public.applications for delete using (auth.uid() = user_id);

-- interview_rounds
create policy "rounds are viewable by owner"   on public.interview_rounds for select using (auth.uid() = user_id);
create policy "rounds are insertable by owner" on public.interview_rounds for insert with check (auth.uid() = user_id);
create policy "rounds are updatable by owner"  on public.interview_rounds for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "rounds are deletable by owner"  on public.interview_rounds for delete using (auth.uid() = user_id);

-- dsa_topics
create policy "dsa topics are viewable by owner"   on public.dsa_topics for select using (auth.uid() = user_id);
create policy "dsa topics are insertable by owner" on public.dsa_topics for insert with check (auth.uid() = user_id);
create policy "dsa topics are updatable by owner"  on public.dsa_topics for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "dsa topics are deletable by owner"  on public.dsa_topics for delete using (auth.uid() = user_id);

-- hr_questions
create policy "hr questions are viewable by owner"   on public.hr_questions for select using (auth.uid() = user_id);
create policy "hr questions are insertable by owner" on public.hr_questions for insert with check (auth.uid() = user_id);
create policy "hr questions are updatable by owner"  on public.hr_questions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "hr questions are deletable by owner"  on public.hr_questions for delete using (auth.uid() = user_id);

-- reminders
create policy "reminders are viewable by owner"   on public.reminders for select using (auth.uid() = user_id);
create policy "reminders are insertable by owner" on public.reminders for insert with check (auth.uid() = user_id);
create policy "reminders are updatable by owner"  on public.reminders for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "reminders are deletable by owner"  on public.reminders for delete using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 4. Auto-create a profile when a new auth user signs up
-- ----------------------------------------------------------------------------
-- Runs with definer rights so it can insert into public.profiles even before
-- the new user has an active session (and bypasses RLS for that one insert).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

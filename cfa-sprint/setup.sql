-- CFA Sprint: private per-user learning progress. Run in a Supabase SQL editor.
create table if not exists public.cfa_sprint_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.cfa_sprint_progress enable row level security;
drop policy if exists "cfa_progress_select" on public.cfa_sprint_progress;
drop policy if exists "cfa_progress_insert" on public.cfa_sprint_progress;
drop policy if exists "cfa_progress_update" on public.cfa_sprint_progress;
create policy "cfa_progress_select" on public.cfa_sprint_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "cfa_progress_insert" on public.cfa_sprint_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "cfa_progress_update" on public.cfa_sprint_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant select, insert, update on public.cfa_sprint_progress to authenticated;
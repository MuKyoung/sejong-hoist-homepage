-- ============================================================
-- Sejong Hoist CMS — Supabase schema + Row Level Security
-- Run this in the Supabase SQL Editor. Re-runnable (idempotent).
-- ============================================================

-- 1) Profiles — admin accounts + roles ------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  role       text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Role checks. SECURITY DEFINER bypasses RLS on profiles (avoids recursion).
-- is_admin  → role 'admin' only (manages members/roles).
-- is_staff  → 'admin' or 'editor' (manages content + inquiries).
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','editor')
  );
$$;

-- 2) Notices — 최근소식 / posts -------------------------------------------
create table if not exists public.notices (
  id           bigint generated always as identity primary key,
  category     text not null default '회사소식',
  title        text not null,
  body         text,
  is_important boolean not null default false,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 3) Portfolio — 시공사례 -------------------------------------------------
create table if not exists public.portfolio (
  id              bigint generated always as identity primary key,
  slug            text unique not null,
  title           text not null,
  client          text,
  industry        text,
  capacity        text,
  capacity_bucket text,
  category        text,
  year            text,
  location        text,
  period          text,
  scope           text[] not null default '{}',
  description     text,
  specs           jsonb not null default '[]',
  src             text,
  gallery         text[] not null default '{}',
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 4) Inquiries — 견적·문의 접수 ------------------------------------------
create table if not exists public.inquiries (
  id               bigint generated always as identity primary key,
  name             text not null,
  company          text,
  phone            text,
  email            text,
  product_category text,
  message          text not null,
  status           text not null default 'new' check (status in ('new','in_progress','done','archived')),
  admin_note       text,
  handled_by       uuid references public.profiles(id),
  handled_at       timestamptz,
  created_at       timestamptz not null default now()
);

-- 문의 첨부파일 경로 목록 (2026-07-13 — storage 'inquiry-files' 버킷의 object path)
alter table public.inquiries
  add column if not exists attachments text[] not null default '{}';

-- updated_at auto-touch
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists notices_touch on public.notices;
create trigger notices_touch before update on public.notices
  for each row execute function public.touch_updated_at();
drop trigger if exists portfolio_touch on public.portfolio;
create trigger portfolio_touch before update on public.portfolio
  for each row execute function public.touch_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles  enable row level security;
alter table public.notices   enable row level security;
alter table public.portfolio enable row level security;
alter table public.inquiries enable row level security;

-- profiles: a user sees their own; admins see/manage all
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete on public.profiles for delete
  using (public.is_admin());

-- notices: public reads published rows; staff manage everything
drop policy if exists notices_public_read on public.notices;
create policy notices_public_read on public.notices for select
  using (is_published or public.is_staff());
drop policy if exists notices_staff_write on public.notices;
create policy notices_staff_write on public.notices for all
  using (public.is_staff()) with check (public.is_staff());

-- portfolio: public reads published rows; staff manage everything
drop policy if exists portfolio_public_read on public.portfolio;
create policy portfolio_public_read on public.portfolio for select
  using (is_published or public.is_staff());
drop policy if exists portfolio_staff_write on public.portfolio;
create policy portfolio_staff_write on public.portfolio for all
  using (public.is_staff()) with check (public.is_staff());

-- inquiries: ANYONE may submit (insert only); only staff can read/manage
drop policy if exists inquiries_public_insert on public.inquiries;
create policy inquiries_public_insert on public.inquiries for insert
  with check (char_length(message) between 1 and 5000);
drop policy if exists inquiries_staff_read on public.inquiries;
create policy inquiries_staff_read on public.inquiries for select
  using (public.is_staff());
drop policy if exists inquiries_staff_update on public.inquiries;
create policy inquiries_staff_update on public.inquiries for update
  using (public.is_staff()) with check (public.is_staff());
drop policy if exists inquiries_staff_delete on public.inquiries;
create policy inquiries_staff_delete on public.inquiries for delete
  using (public.is_staff());

-- ============================================================
-- Storage — 시공사례 이미지 버킷 (public read / staff write)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

drop policy if exists "portfolio_images_public_read" on storage.objects;
create policy "portfolio_images_public_read" on storage.objects
  for select using (bucket_id = 'portfolio-images');

drop policy if exists "portfolio_images_staff_insert" on storage.objects;
create policy "portfolio_images_staff_insert" on storage.objects
  for insert with check (bucket_id = 'portfolio-images' and public.is_staff());

drop policy if exists "portfolio_images_staff_update" on storage.objects;
create policy "portfolio_images_staff_update" on storage.objects
  for update using (bucket_id = 'portfolio-images' and public.is_staff());

drop policy if exists "portfolio_images_staff_delete" on storage.objects;
create policy "portfolio_images_staff_delete" on storage.objects
  for delete using (bucket_id = 'portfolio-images' and public.is_staff());

-- ============================================================
-- Storage — 문의 첨부파일 버킷 (비공개: 업로드는 누구나, 열람은 staff만)
-- 10MB 제한 + 문서/이미지 위주 MIME 허용 (hwp/dwg 등은 octet-stream으로 옴)
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'inquiry-files', 'inquiry-files', false, 10485760,
  array[
    'image/jpeg','image/png','image/gif','image/webp','image/bmp',
    'application/pdf','application/zip','application/x-zip-compressed',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/x-hwp','application/haansofthwp','application/vnd.hancom.hwp',
    'application/octet-stream'
  ]
)
on conflict (id) do nothing;

drop policy if exists "inquiry_files_public_insert" on storage.objects;
create policy "inquiry_files_public_insert" on storage.objects
  for insert with check (bucket_id = 'inquiry-files');

drop policy if exists "inquiry_files_staff_read" on storage.objects;
create policy "inquiry_files_staff_read" on storage.objects
  for select using (bucket_id = 'inquiry-files' and public.is_staff());

drop policy if exists "inquiry_files_staff_delete" on storage.objects;
create policy "inquiry_files_staff_delete" on storage.objects
  for delete using (bucket_id = 'inquiry-files' and public.is_staff());

-- ============================================================
-- FIRST ADMIN — after creating a user in Supabase (Auth → Users),
-- promote them once:
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- ============================================================

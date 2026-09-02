-- Enquiries submitted from the public forms.
--
-- Anonymous visitors may INSERT and nothing else: these rows are personal
-- contact details, so there is deliberately no SELECT policy for anon. Only
-- an admin can read them back.

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'calculator'
    check (source in ('calculator', 'home')),
  name text not null check (length(btrim(name)) between 1 and 200),
  phone text check (phone is null or length(btrim(phone)) between 1 and 40),
  email text check (email is null or length(btrim(email)) between 1 and 200),
  location text check (location is null or length(location) <= 300),
  message text check (message is null or length(message) <= 5000),
  consented boolean not null default false,
  status text not null default 'new'
    check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now(),
  -- Something has to be answerable, or the lead is useless.
  check (
    coalesce(btrim(phone), '') <> '' or coalesce(btrim(email), '') <> ''
  )
);

comment on table public.enquiries is
  'Public form submissions. Anon inserts only; admins read and manage.';
comment on column public.enquiries.source is
  'Which form it came from: the calculator page or the home contact card.';

create index enquiries_new_first on public.enquiries (created_at desc);

alter table public.enquiries enable row level security;

-- A visitor can leave an enquiry...
create policy "visitors submit enquiries"
  on public.enquiries for insert
  to anon, authenticated
  with check (true);

-- ...and cannot read, change or remove any.
create policy "admins read enquiries"
  on public.enquiries for select
  using (private.is_admin());

create policy "admins update enquiries"
  on public.enquiries for update
  using (private.is_admin()) with check (private.is_admin());

create policy "admins delete enquiries"
  on public.enquiries for delete
  using (private.is_admin());

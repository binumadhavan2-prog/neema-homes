-- Price calculator content, editable from the #/admin dashboard.
-- Mirrors the gallery_items pattern: public reads published rows,
-- private.is_admin() gates every write.

create table public.calculator_categories (
  key text primary key
    check (key in ('kitchen','bedroom','dining','living','decor','kids')),
  name text not null,
  href text not null default '',
  default_area integer not null default 120 check (default_area between 10 and 2000),
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.calculator_categories is
  'One card on the #/calculator page per row, in sort_order.';

create table public.calculator_rates (
  id uuid primary key default gen_random_uuid(),
  category_key text not null
    references public.calculator_categories (key) on delete cascade,
  tier text not null check (tier in ('essential','premium','luxury')),
  rate_low integer not null check (rate_low >= 0),
  rate_high integer not null check (rate_high >= 0),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_key, tier),
  check (rate_high >= rate_low)
);

comment on column public.calculator_rates.rate_low is
  'Rupees per square foot, low end of the quoted range.';
comment on column public.calculator_rates.note is
  'What this tier includes for this room. Shown under the tier name.';

-- Single row. Keeps the placeholder warning and the disclaimer editable
-- without a code deploy.
create table public.calculator_settings (
  id smallint primary key default 1 check (id = 1),
  rates_are_placeholder boolean not null default true,
  disclaimer text not null default 'Indicative only, and not a quote.',
  updated_at timestamptz not null default now()
);

alter table public.calculator_categories enable row level security;
alter table public.calculator_rates enable row level security;
alter table public.calculator_settings enable row level security;

-- categories
create policy "visitors read published categories"
  on public.calculator_categories for select
  using (published);

create policy "admins read every category"
  on public.calculator_categories for select
  using (published or private.is_admin());

create policy "admins insert categories"
  on public.calculator_categories for insert
  with check (private.is_admin());

create policy "admins update categories"
  on public.calculator_categories for update
  using (private.is_admin()) with check (private.is_admin());

create policy "admins delete categories"
  on public.calculator_categories for delete
  using (private.is_admin());

-- rates
create policy "visitors read rates"
  on public.calculator_rates for select
  using (true);

create policy "admins insert rates"
  on public.calculator_rates for insert
  with check (private.is_admin());

create policy "admins update rates"
  on public.calculator_rates for update
  using (private.is_admin()) with check (private.is_admin());

create policy "admins delete rates"
  on public.calculator_rates for delete
  using (private.is_admin());

-- settings
create policy "visitors read settings"
  on public.calculator_settings for select
  using (true);

create policy "admins update settings"
  on public.calculator_settings for update
  using (private.is_admin()) with check (private.is_admin());

-- Media library behind the public site: the #/gallery tiles and the photo
-- grids on each room page. One row per card.

create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

comment on table public.admins is
  'Allowlist of accounts permitted to write site content. Rows are added by
   hand (SQL editor / dashboard); there is no public path to insert one.';

-- security definer so the gallery_items policies can call it without the
-- caller needing select rights on admins (and without RLS recursion).
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create table if not exists public.gallery_items (
  id          uuid primary key default gen_random_uuid(),
  collection  text not null check (collection in
                ('gallery','kitchen','bedroom','dining','living','decor','kids')),
  slug        text not null,
  name        text not null,
  description text,
  alt         text,
  href        text,
  span        smallint not null default 12 check (span between 1 and 12),
  image_path  text,
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (collection, slug)
);

comment on column public.gallery_items.slug is
  'Stable key within the collection. Room pages use it to pick the drawn
   fallback (KitchenPlan, BedroomIcon, ...) when image_path is null.';
comment on column public.gallery_items.image_path is
  'Either a path inside the public "gallery" storage bucket, or a "/images/..."
   path served from the app''s own public folder. Null renders the drawing.';
comment on column public.gallery_items.span is
  'Column span in the 12-column product grid. Ignored by the gallery grid.';

create index if not exists gallery_items_collection_order_idx
  on public.gallery_items (collection, sort_order, created_at);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists gallery_items_touch_updated_at on public.gallery_items;
create trigger gallery_items_touch_updated_at
  before update on public.gallery_items
  for each row execute function public.touch_updated_at();

-- Row level security -------------------------------------------------------

alter table public.admins enable row level security;
alter table public.gallery_items enable row level security;

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

-- Visitors see published rows; an admin also sees drafts, so the dashboard
-- can list everything through the same table.
drop policy if exists "published items are public" on public.gallery_items;
create policy "published items are public" on public.gallery_items
  for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins insert items" on public.gallery_items;
create policy "admins insert items" on public.gallery_items
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists "admins update items" on public.gallery_items;
create policy "admins update items" on public.gallery_items
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete items" on public.gallery_items;
create policy "admins delete items" on public.gallery_items
  for delete to authenticated
  using (public.is_admin());

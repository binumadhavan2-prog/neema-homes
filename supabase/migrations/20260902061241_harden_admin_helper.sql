-- The advisor flagged is_admin() as reachable at /rest/v1/rpc/is_admin. RLS
-- policy expressions run with the caller's privileges, so it cannot simply be
-- revoked from `authenticated`; instead it moves to a schema PostgREST does
-- not expose, and only signed-in users keep EXECUTE.

create schema if not exists private;
revoke all on schema private from anon, authenticated;
grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

revoke all on function private.is_admin() from public, anon, authenticated;
grant execute on function private.is_admin() to authenticated;

-- Visitors are never asked the admin question, so `anon` needs no access to
-- the helper at all: it only ever sees published rows.
drop policy if exists "published items are public" on public.gallery_items;

create policy "visitors read published items" on public.gallery_items
  for select to anon
  using (published);

create policy "admins read every item" on public.gallery_items
  for select to authenticated
  using (published or private.is_admin());

drop policy if exists "admins insert items" on public.gallery_items;
create policy "admins insert items" on public.gallery_items
  for insert to authenticated with check (private.is_admin());

drop policy if exists "admins update items" on public.gallery_items;
create policy "admins update items" on public.gallery_items
  for update to authenticated
  using (private.is_admin()) with check (private.is_admin());

drop policy if exists "admins delete items" on public.gallery_items;
create policy "admins delete items" on public.gallery_items
  for delete to authenticated using (private.is_admin());

drop policy if exists "admins upload gallery images" on storage.objects;
create policy "admins upload gallery images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'gallery' and private.is_admin());

drop policy if exists "admins replace gallery images" on storage.objects;
create policy "admins replace gallery images" on storage.objects
  for update to authenticated
  using (bucket_id = 'gallery' and private.is_admin())
  with check (bucket_id = 'gallery' and private.is_admin());

drop policy if exists "admins delete gallery images" on storage.objects;
create policy "admins delete gallery images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'gallery' and private.is_admin());

drop function if exists public.is_admin();

-- Pin the trigger function's search_path as well.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

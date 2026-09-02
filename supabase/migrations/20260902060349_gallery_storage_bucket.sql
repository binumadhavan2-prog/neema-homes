-- Public-read bucket for photographs uploaded through the dashboard.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery', 'gallery', true, 10485760,
  array['image/jpeg','image/png','image/webp','image/avif','image/gif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "gallery images are public" on storage.objects;
create policy "gallery images are public" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "admins upload gallery images" on storage.objects;
create policy "admins upload gallery images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "admins replace gallery images" on storage.objects;
create policy "admins replace gallery images" on storage.objects
  for update to authenticated
  using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "admins delete gallery images" on storage.objects;
create policy "admins delete gallery images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'gallery' and public.is_admin());

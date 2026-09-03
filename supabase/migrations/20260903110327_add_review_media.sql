-- Photos and videos attached to a review. Paths into the review-media
-- bucket, in the order the visitor picked them.
alter table public.reviews
  add column media jsonb not null default '[]'::jsonb;

comment on column public.reviews.media is
  'Array of {path, type} into the review-media bucket. Nothing here is shown until the review itself is published.';

-- A separate bucket from `gallery`: that one only admins may write to, and
-- this one has to accept uploads from the public. The size and MIME limits
-- are the guard rails on that — the bucket refuses anything else outright,
-- so the form cannot be used as free file hosting.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'review-media',
  'review-media',
  true,
  26214400, -- 25 MB
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/heic',
    'video/mp4', 'video/webm', 'video/quicktime'
  ]
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create policy "visitors attach review media"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'review-media');

create policy "review media is public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'review-media');

create policy "admins delete review media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'review-media' and private.is_admin());

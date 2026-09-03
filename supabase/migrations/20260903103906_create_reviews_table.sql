-- Customer reviews shown on the home page. Modelled on gallery_items: a
-- visitor can post one, but nothing reaches the page until an admin
-- publishes it. Without that gate anyone on the internet could put whatever
-- they liked on NEEMA HOMES' home page.
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  location text check (char_length(location) <= 80),
  rating smallint not null check (rating between 1 and 5),
  message text not null check (char_length(btrim(message)) between 1 and 1200),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.reviews is
  'Visitor-submitted reviews. Anon inserts only, and only unpublished; nothing shows on the site until an admin publishes it.';

create index reviews_published_created_at_idx
  on public.reviews (published, created_at desc);

alter table public.reviews enable row level security;

-- A visitor may post a review, but may not publish it: the with_check
-- pins published to false, so the flag cannot be set from the form.
create policy "visitors submit reviews"
  on public.reviews for insert
  to anon, authenticated
  with check (published = false);

create policy "visitors read published reviews"
  on public.reviews for select
  to anon
  using (published);

create policy "admins read every review"
  on public.reviews for select
  to authenticated
  using (published or private.is_admin());

create policy "admins update reviews"
  on public.reviews for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "admins delete reviews"
  on public.reviews for delete
  to authenticated
  using (private.is_admin());

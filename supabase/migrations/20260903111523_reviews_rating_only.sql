-- A rating on its own is a valid review: someone may want to leave five
-- stars without writing anything or giving a name. The rating stays
-- required — it is the one thing a review cannot do without.
alter table public.reviews alter column name drop not null;
alter table public.reviews alter column message drop not null;

alter table public.reviews drop constraint reviews_name_check;
alter table public.reviews add constraint reviews_name_check
  check (name is null or char_length(btrim(name)) between 1 and 80);

alter table public.reviews drop constraint reviews_message_check;
alter table public.reviews add constraint reviews_message_check
  check (message is null or char_length(btrim(message)) between 1 and 1200);

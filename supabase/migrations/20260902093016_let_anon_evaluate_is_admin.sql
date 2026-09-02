-- private.is_admin() was executable only by `authenticated`, so any policy
-- mentioning it raised "permission denied for function is_admin" for a signed
-- out visitor instead of returning false. That blocked anonymous reads of
-- calculator_categories outright, and would have done the same on
-- gallery_items for any row with published = false.
--
-- The function is `select exists (... where user_id = auth.uid())`, which is
-- false for anon, so granting execute leaks nothing.
grant execute on function private.is_admin() to anon;

-- One SELECT policy rather than two: a visitor sees published rows, an admin
-- sees everything.
drop policy "visitors read published categories" on public.calculator_categories;
drop policy "admins read every category" on public.calculator_categories;

create policy "read published categories, admins read all"
  on public.calculator_categories for select
  using (published or private.is_admin());

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Content dashboard

The Gallery page and every room page (Kitchen, Bedroom, Dining, Living,
Decorative Units, Kids) read their cards from the `gallery_items` table in
Supabase. They are edited at **`/#/admin`**, which is not linked from the site.

Each page keeps its original array in the component as a fallback, so a
missing `.env.local`, a failed request or an empty collection still renders
the site rather than a blank grid.

### Creating the first admin

The dashboard has no sign-up: accounts are made in Supabase and then added to
the `admins` table by hand.

1. Supabase dashboard → **Authentication → Users → Add user**. Set an email
   and password and tick *Auto Confirm User*.
2. Run this in the **SQL Editor**, with that email:

   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'you@example.com'
   on conflict (user_id) do nothing;
   ```

3. Sign in at `/#/admin`.

An account that is authenticated but missing from `admins` can read published
rows and nothing else — row level security blocks every write.

### How content is stored

| | |
|---|---|
| `gallery_items.collection` | which grid the card belongs to (`gallery`, `kitchen`, …) |
| `gallery_items.slug` | unique key within the collection; on room pages it also picks the drawn fallback when there is no photograph |
| `gallery_items.span` | column span in the 12-column product grid |
| `gallery_items.published` | unpublished rows are invisible to visitors, visible to admins |
| `gallery_items.image_path` | a key in the public `gallery` storage bucket, or a `/images/...` path served from `public/` |

Photographs that shipped with the site still live in `public/images` and are
referenced by their `/images/...` path. Anything uploaded through the
dashboard goes to the `gallery` bucket (public read, admin write, 10 MB cap,
JPEG/PNG/WebP/AVIF/GIF).

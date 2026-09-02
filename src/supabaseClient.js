import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Only the publishable (anon) key belongs here. Everything Vite exposes through
// import.meta.env is inlined into the browser bundle, so a service-role key
// placed in this file would be readable by anyone who opens the site.
if (!url || !publishableKey || url.startsWith("PASTE_")) {
  throw new Error(
    "Supabase is not configured. Set VITE_SUPABASE_URL and " +
      "VITE_SUPABASE_PUBLISHABLE_KEY in .env.local, then restart `npm run dev`."
  );
}

export const supabase = createClient(url, publishableKey);

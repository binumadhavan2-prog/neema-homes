import { supabase } from "./supabaseClient.js";

// Public form submissions. Row level security lets anyone insert here and
// nobody but an admin read back, so the anon key is enough to post one.

export const ENQUIRY_TABLE = "enquiries";

const clean = (value) => {
  const trimmed = (value ?? "").trim();
  return trimmed === "" ? null : trimmed;
};

/**
 * Writes one enquiry. Returns { error } — a string to show the visitor, or
 * null when it landed. The caller decides what to say on success.
 */
export async function submitEnquiry({
  source,
  name,
  phone,
  email,
  location,
  message,
  consented
}) {
  if (!supabase) {
    return { error: "Enquiries aren't set up yet. Please call or email us." };
  }

  const { error } = await supabase.from(ENQUIRY_TABLE).insert({
    source,
    name: clean(name) ?? "",
    phone: clean(phone),
    email: clean(email),
    location: clean(location),
    message: clean(message),
    consented: Boolean(consented)
  });

  if (error) {
    // The table's own check constraint is the one a visitor can realistically
    // trip, by leaving both ways of reaching them blank.
    if (error.code === "23514") {
      return { error: "Please leave a phone number or an email address." };
    }
    return { error: "Something went wrong sending that. Please try again." };
  }

  return { error: null };
}

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

// Visitor-submitted reviews. Row level security lets anyone insert one and
// pins `published` to false on the way in, so nothing a visitor writes
// reaches the home page until an admin publishes it from #/admin.

export const REVIEW_TABLE = "reviews";
export const REVIEW_BUCKET = "review-media";

export const MIN_RATING = 1;
export const MAX_RATING = 5;

// Mirrored from the bucket's own limits, so a file that would be refused by
// storage is refused here first, with something a visitor can act on rather
// than a raw API error.
export const MAX_FILES = 4;
export const MAX_FILE_BYTES = 25 * 1024 * 1024;
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "video/mp4",
  "video/webm",
  "video/quicktime"
];

export const isVideo = (type) => (type ?? "").startsWith("video/");

/** Public URL for one stored attachment. */
export function mediaUrl(path) {
  if (!supabase || !path) return null;
  return supabase.storage.from(REVIEW_BUCKET).getPublicUrl(path).data.publicUrl;
}

/**
 * Uploads the chosen files and hands back what should go in the review's
 * `media` column. Rejects anything outside the bucket's limits before the
 * request is made.
 */
export async function uploadReviewMedia(files) {
  if (!supabase || files.length === 0) return { media: [], error: null };

  if (files.length > MAX_FILES) {
    return { media: [], error: `Please attach at most ${MAX_FILES} files.` };
  }

  const media = [];

  for (const file of files) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return { media: [], error: `${file.name} is not a photo or video we can take.` };
    }
    if (file.size > MAX_FILE_BYTES) {
      return { media: [], error: `${file.name} is over 25MB. Please attach a smaller file.` };
    }

    const suffix = file.name.includes(".") ? file.name.split(".").pop() : "bin";
    const path = `${crypto.randomUUID()}.${suffix.toLowerCase()}`;

    const { error } = await supabase.storage
      .from(REVIEW_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) {
      return { media: [], error: "Couldn't upload that attachment. Please try again." };
    }

    media.push({ path, type: file.type });
  }

  return { media, error: null };
}

const clean = (value) => (value ?? "").trim();

/**
 * Writes one review. Returns { error } — a string to show the visitor, or
 * null when it landed.
 */
export async function submitReview({ name, location, rating, message, media = [] }) {
  if (!supabase) {
    return { error: "Reviews aren't set up yet. Please email us instead." };
  }

  const score = Number(rating);
  if (!Number.isInteger(score) || score < MIN_RATING || score > MAX_RATING) {
    return { error: "Please choose a star rating." };
  }

  // A rating on its own is enough. Empty text goes in as null rather than
  // an empty string, so the card can tell "left blank" from "said nothing".
  const { error } = await supabase.from(REVIEW_TABLE).insert({
    name: clean(name) || null,
    location: clean(location) || null,
    rating: score,
    message: clean(message) || null,
    media
  });

  if (error) {
    // The table's own checks are what a visitor can realistically trip, by
    // leaving the name or the review itself empty.
    if (error.code === "23514") {
      return { error: "Please add your name and a few words about the work." };
    }
    return { error: "Something went wrong sending that. Please try again." };
  }

  return { error: null };
}

/**
 * The published reviews, newest first. Returns [] rather than throwing when
 * Supabase is unconfigured or the request fails — the section simply does
 * not appear, the same way the testimonials block behaves.
 */
export function usePublishedReviews() {
  const [reviews, setReviews] = useState([]);
  // Bumped after a visitor posts, so the list picks up their review if an
  // admin has already published it — and so the hook has a way to refetch
  // without the caller holding onto the loader itself.
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from(REVIEW_TABLE)
        .select("id, name, location, rating, message, media, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (cancelled) return;
      if (!error && data) setReviews(data);
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const reload = useCallback(() => setReloadToken((n) => n + 1), []);

  return { reviews, reload };
}

export function averageRating(reviews) {
  if (!reviews.length) return null;
  const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

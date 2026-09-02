import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

// The gallery_items table backs both the #/gallery tiles and the photo grid on
// every room page. `collection` says which grid a row belongs to.

export const TABLE = "gallery_items";
export const BUCKET = "gallery";

export const COLLECTIONS = [
  { key: "gallery", label: "Gallery", route: "#/gallery", kind: "gallery" },
  { key: "kitchen", label: "Kitchen", route: "#/kitchen", kind: "room" },
  { key: "bedroom", label: "Bedroom", route: "#/bedroom", kind: "room" },
  { key: "dining", label: "Dining Room", route: "#/dining", kind: "room" },
  { key: "living", label: "Living Room", route: "#/living", kind: "room" },
  { key: "decor", label: "Decorative Units", route: "#/decor", kind: "room" },
  { key: "kids", label: "Kids Room", route: "#/kids", kind: "room" }
];

/**
 * Photographs live in one of two places. Anything uploaded through the
 * dashboard is a key inside the public `gallery` bucket; the photographs that
 * shipped with the site are still served from /public/images. A leading slash
 * (or a full URL) marks the second kind and is handed back untouched.
 */
export function imageSrc(imagePath) {
  if (!imagePath) return null;
  if (/^(https?:)?\/\//.test(imagePath) || imagePath.startsWith("/")) {
    return imagePath;
  }
  if (!supabase) return null;
  return supabase.storage.from(BUCKET).getPublicUrl(imagePath).data.publicUrl;
}

// Rows arrive with the database's column names; the page components were
// written against `id`/`image`, so translate once here rather than at every
// call site.
export function toItem(row) {
  return {
    id: row.slug,
    rowId: row.id,
    name: row.name,
    description: row.description ?? "",
    alt: row.alt ?? "",
    href: row.href ?? "",
    span: row.span ?? 12,
    image: imageSrc(row.image_path)
  };
}

export function orderedQuery(query) {
  return query
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
}

/**
 * Published rows for one collection, with the array compiled into the calling
 * component as the fallback. The fallback covers three cases that should never
 * blank a page: Supabase unconfigured, the request failing, and the collection
 * being empty.
 */
export function useCollection(collection, fallback) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;

    orderedQuery(
      supabase
        .from(TABLE)
        .select("*")
        .eq("collection", collection)
        .eq("published", true)
    ).then(({ data, error }) => {
      if (cancelled || error || !data || data.length === 0) return;
      setItems(data.map(toItem));
    });

    return () => {
      cancelled = true;
    };
  }, [collection]);

  return items;
}

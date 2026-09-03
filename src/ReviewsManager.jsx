import { useEffect, useState } from "react";

import { supabase } from "./supabaseClient.js";
import { REVIEW_BUCKET, REVIEW_TABLE, isVideo, mediaUrl } from "./reviews.js";

// Reviews left through the home page form. They arrive unpublished — the
// table's insert policy pins the flag — so this is where they are read and
// either put on the site or thrown away. Nothing a visitor writes reaches
// the home page until it is published here.

const FILTERS = [
  { key: "pending", label: "Waiting" },
  { key: "published", label: "Published" },
  { key: "all", label: "All" }
];

const stamp = (value) =>
  new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

const stars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

export default function ReviewsManager() {
  const [filter, setFilter] = useState("pending");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!supabase) {
        if (!cancelled) {
          setError("Supabase isn't configured.");
          setLoading(false);
        }
        return;
      }

      let query = supabase
        .from(REVIEW_TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (filter === "pending") query = query.eq("published", false);
      if (filter === "published") query = query.eq("published", true);

      const { data, error: failure } = await query;
      if (cancelled) return;

      setRows(failure ? [] : (data ?? []));
      setError(failure ? "Couldn't load reviews." : "");
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [filter, refresh]);

  const setPublished = async (id, published) => {
    const { error: failure } = await supabase
      .from(REVIEW_TABLE)
      .update({ published })
      .eq("id", id);

    if (failure) {
      setError("Couldn't update that review.");
      return;
    }
    setRefresh((n) => n + 1);
  };

  // Drop one attachment but keep the review: the file leaves the bucket and
  // its entry leaves the row, so nothing is left pointing at a gap.
  const removeMedia = async (row, path) => {
    const { error: mediaFailure } = await supabase.storage
      .from(REVIEW_BUCKET)
      .remove([path]);

    if (mediaFailure) {
      setError("Couldn't delete that attachment.");
      return;
    }

    const rest = (row.media ?? []).filter((item) => item.path !== path);
    const { error: failure } = await supabase
      .from(REVIEW_TABLE)
      .update({ media: rest })
      .eq("id", row.id);

    if (failure) {
      setError("Deleted the file, but couldn't update the review.");
      return;
    }
    setRefresh((n) => n + 1);
  };

  const remove = async (row) => {
    // The attachments go first. Deleting only the row would leave whatever
    // was uploaded sitting in the bucket for good — still public, with
    // nothing left pointing at it to find it by.
    const paths = Array.isArray(row.media)
      ? row.media.map((item) => item.path).filter(Boolean)
      : [];

    if (paths.length) {
      const { error: mediaFailure } = await supabase.storage
        .from(REVIEW_BUCKET)
        .remove(paths);

      if (mediaFailure) {
        setError("Couldn't delete that review's attachments.");
        return;
      }
    }

    const { error: failure } = await supabase
      .from(REVIEW_TABLE)
      .delete()
      .eq("id", row.id);

    if (failure) {
      setError("Couldn't delete that review.");
      return;
    }
    setRefresh((n) => n + 1);
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="enq-filters">
        {FILTERS.map((entry) => (
          <button
            key={entry.key}
            type="button"
            className={
              entry.key === filter ? "admin-btn admin-btn--primary" : "admin-btn"
            }
            onClick={() => setFilter(entry.key)}
          >
            {entry.label}
          </button>
        ))}
        </div>
      </div>

      {error && <p className="admin-error admin-error--bar">{error}</p>}

      {loading ? (
        <p className="admin-note">Loading&hellip;</p>
      ) : rows.length === 0 ? (
        <p className="admin-note">Nothing here.</p>
      ) : (
        <ul className="enq-list">
          {rows.map((row) => (
            <li className="enq-row" key={row.id}>
              <div className="enq-main">
                <div className="enq-head">
                  <h2>
                  <span className="review-stars-admin">{stars(row.rating)}</span>{" "}
                  {row.name}
                  {row.location ? ` · ${row.location}` : ""}
                  </h2>
                </div>
                <p className="enq-message">{row.message}</p>

                {Array.isArray(row.media) && row.media.length > 0 && (
                  <div className="review-media-admin">
                    {row.media.map((item) => (
                      <figure className="review-media-item" key={item.path}>
                        {isVideo(item.type) ? (
                          <video
                            src={mediaUrl(item.path)}
                            controls
                            preload="metadata"
                          />
                        ) : (
                          <img src={mediaUrl(item.path)} alt="" />
                        )}
                        <button
                          type="button"
                          className="review-media-remove"
                          onClick={() => removeMedia(row, item.path)}
                          aria-label="Delete this attachment"
                          title="Delete this attachment"
                        >
                          ×
                        </button>
                      </figure>
                    ))}
                  </div>
                )}
                <p className="enq-source">
                  {stamp(row.created_at)} ·{" "}
                  {row.published ? "on the site" : "not published"}
                </p>
              </div>

              <div className="enq-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn--primary"
                  onClick={() => setPublished(row.id, !row.published)}
                >
                  {row.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--danger"
                  onClick={() => remove(row)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

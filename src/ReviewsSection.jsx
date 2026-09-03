import { useState } from "react";

import ActionButton from "./ActionButton.jsx";
import {
  ACCEPTED_TYPES,
  MAX_FILES,
  MAX_RATING,
  averageRating,
  isVideo,
  mediaUrl,
  submitReview,
  uploadReviewMedia,
  usePublishedReviews
} from "./reviews.js";
import "./reviews.css";

// Reviews on the home page: what past clients said, and a form for the next
// one to say something. A submitted review is stored unpublished — nothing
// reaches this list until an admin publishes it from #/admin — so the
// section can never show whatever a passer-by decided to type.

const STARS = Array.from({ length: MAX_RATING }, (_, i) => i + 1);

function Stars({ value }) {
  return (
    <span className="stars" aria-label={`${value} out of ${MAX_RATING} stars`}>
      {STARS.map((star) => (
        <span
          key={star}
          aria-hidden="true"
          className={star <= value ? "star is-on" : "star"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// Radios rather than buttons: a rating is a single choice out of five, and
// this way it arrives with keyboard support and grouping for free.
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const shown = hovered || value;

  return (
    <fieldset className="star-picker" onMouseLeave={() => setHovered(0)}>
      <legend>Your rating</legend>

      <div className="star-picker-row">
        {STARS.map((star) => (
          <label
            key={star}
            className={star <= shown ? "star-choice is-on" : "star-choice"}
            onMouseEnter={() => setHovered(star)}
          >
            <input
              type="radio"
              name="review-rating"
              value={star}
              checked={value === star}
              onChange={() => onChange(star)}
            />
            <span aria-hidden="true">★</span>
            <span className="visually-hidden">
              {star} star{star === 1 ? "" : "s"}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ReviewsSection() {
  const { reviews, reload } = usePublishedReviews();
  const average = averageRating(reviews);

  const [form, setForm] = useState({ name: "", location: "", message: "" });
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const send = async () => {
    setError("");
    setIsUploading(true);

    // Attachments go up first: the review row carries their paths, so there
    // is no point writing it if a file fails on the way.
    const { media, error: uploadFailure } = await uploadReviewMedia(files);

    if (uploadFailure) {
      setIsUploading(false);
      setError(uploadFailure);
      return;
    }

    const { error: failure } = await submitReview({ ...form, rating, media });
    setIsUploading(false);

    if (failure) {
      setError(failure);
      return;
    }

    setForm({ name: "", location: "", message: "" });
    setRating(0);
    setFiles([]);
    setIsSent(true);
    reload();
  };

  return (
    <section id="reviews" className="reviews">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Reviews</p>
          <h2>What our clients say</h2>
          {average !== null && (
            <p className="reviews-average">
              <Stars value={Math.round(average)} />
              <span>
                {average} out of {MAX_RATING} · {reviews.length} review
                {reviews.length === 1 ? "" : "s"}
              </span>
            </p>
          )}
        </div>

        <div className="reviews-layout">
          {/* Only published reviews arrive here, so an empty list means none
              have been published yet rather than none exist. */}
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="reviews-empty">
                No reviews published yet. If we have worked on your home, yours
                could be the first.
              </p>
            ) : (
              reviews.map((review) => (
                <article className="review-card" key={review.id}>
                  <Stars value={review.rating} />
                  {review.message && <blockquote>{review.message}</blockquote>}

                  {Array.isArray(review.media) && review.media.length > 0 && (
                    <div className="review-media">
                      {review.media.map((item) =>
                        isVideo(item.type) ? (
                          <video
                            key={item.path}
                            src={mediaUrl(item.path)}
                            controls
                            preload="metadata"
                            playsInline
                          />
                        ) : (
                          <img
                            key={item.path}
                            src={mediaUrl(item.path)}
                            alt=""
                            loading="lazy"
                          />
                        )
                      )}
                    </div>
                  )}
                  <p className="review-by">
                    <strong>{review.name || "Anonymous"}</strong>
                    {review.location && <span> · {review.location}</span>}
                  </p>
                </article>
              ))
            )}
          </div>

          <div className="review-form">
            <h3>Write a review</h3>

            {isSent ? (
              <p className="review-sent" role="status">
                Thank you — your review has been sent. We read every one before
                it goes on the site, so it will appear here once we have.
              </p>
            ) : (
              <>
                <StarPicker value={rating} onChange={setRating} />

                <label htmlFor="review-name">Name (optional)</label>
                <input
                  id="review-name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  autoComplete="name"
                />

                <label htmlFor="review-location">Locality (optional)</label>
                <input
                  id="review-location"
                  type="text"
                  value={form.location}
                  onChange={update("location")}
                />

                <label htmlFor="review-message">Your review (optional)</label>
                <textarea
                  id="review-message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                />

                <label htmlFor="review-media">
                  Photos or video (optional, up to {MAX_FILES})
                </label>
                <input
                  id="review-media"
                  className="review-file"
                  type="file"
                  multiple
                  accept={ACCEPTED_TYPES.join(",")}
                  onChange={(event) =>
                    setFiles(Array.from(event.target.files ?? []).slice(0, MAX_FILES))
                  }
                />

                {files.length > 0 && (
                  <ul className="review-attachments">
                    {files.map((file) => (
                      <li key={file.name + file.size}>
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFiles((current) => current.filter((f) => f !== file))
                          }
                          aria-label={`Remove ${file.name}`}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {error && (
                  <p className="review-error" role="alert">
                    {error}
                  </p>
                )}

                {/* The rating is the only thing required — a visitor may
                    leave stars and nothing else. */}
                <ActionButton
                  className="btn"
                  onAction={send}
                  disabled={isUploading || !rating}
                >
                  {isUploading ? "Sending…" : "Send Review"}
                </ActionButton>

                <p className="review-note">
                  A rating on its own is fine. Reviews are read before they
                  are published.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

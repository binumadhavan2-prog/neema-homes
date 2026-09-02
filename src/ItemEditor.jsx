import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "./supabaseClient.js";
import { BUCKET, TABLE, imageSrc } from "./content.js";

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const extensionOf = (file) => {
  const match = /\.([a-z0-9]+)$/i.exec(file.name);
  return match ? match[1].toLowerCase() : "jpg";
};

/**
 * Full-screen form for one card. Files are only sent to storage once the form
 * is saved, so cancelling never leaves an orphaned upload behind.
 */
export default function ItemEditor({ item, kind, onClose, onSaved }) {
  const [form, setForm] = useState(item);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef(null);

  const isNew = !item.id;

  // Shows the chosen file before it is uploaded; the effect exists only to
  // hand the blob URL back when it is replaced or the form closes.
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const set = (field) => (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.type === "number"
          ? Number(target.value)
          : target.value;

    setForm((current) => ({ ...current, [field]: value }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const slug = slugify(form.slug || form.name);
    if (!slug) {
      setError("Give the item a name.");
      setBusy(false);
      return;
    }

    let imagePath = form.image_path;
    const previousPath = item.image_path;

    if (file) {
      const path = `${form.collection}/${slug}-${Date.now()}.${extensionOf(file)}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "31536000", upsert: false });

      if (uploadError) {
        setError(uploadError.message);
        setBusy(false);
        return;
      }

      imagePath = path;
    }

    const payload = {
      collection: form.collection,
      slug,
      name: form.name.trim(),
      description: form.description?.trim() || null,
      alt: form.alt?.trim() || null,
      href: kind === "gallery" ? form.href?.trim() || null : null,
      span: kind === "gallery" ? 12 : form.span,
      image_path: imagePath,
      published: form.published,
      sort_order: form.sort_order
    };

    const { error: saveError } = isNew
      ? await supabase.from(TABLE).insert(payload)
      : await supabase.from(TABLE).update(payload).eq("id", item.id);

    if (saveError) {
      // The row did not change, so drop the file we just uploaded for it.
      if (file && imagePath) {
        await supabase.storage.from(BUCKET).remove([imagePath]);
      }
      setError(
        saveError.code === "23505"
          ? `Another item in this collection already uses the key “${slug}”.`
          : saveError.message
      );
      setBusy(false);
      return;
    }

    // A replaced upload is now unreferenced. Repository photographs
    // ("/images/...") are left alone — other collections still point at them.
    if (file && previousPath && !previousPath.startsWith("/")) {
      await supabase.storage.from(BUCKET).remove([previousPath]);
    }

    setBusy(false);
    onSaved();
  }

  const shownImage = preview ?? imageSrc(form.image_path);

  return (
    <div
      className="admin-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form className="admin-card admin-editor" onSubmit={onSubmit}>
        <h2>{isNew ? "Add item" : form.name || "Edit item"}</h2>

        <div className="admin-media">
          <div className="admin-media-preview">
            {shownImage ? (
              <img src={shownImage} alt="" />
            ) : (
              <span className="admin-thumb-empty">
                {kind === "gallery"
                  ? "No photograph — this tile stays hidden"
                  : "No photograph — the drawing shows instead"}
              </span>
            )}
          </div>

          <div className="admin-media-actions">
            <input
              className="admin-file"
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />

            {file ? (
              <button
                type="button"
                className="admin-btn"
                onClick={() => {
                  setFile(null);
                  if (fileInput.current) fileInput.current.value = "";
                }}
              >
                Undo choice
              </button>
            ) : form.image_path ? (
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={() =>
                  setForm((current) => ({ ...current, image_path: null }))
                }
              >
                Remove photograph
              </button>
            ) : null}

            <p className="admin-hint">JPEG, PNG, WebP, AVIF or GIF, up to 10 MB.</p>
          </div>
        </div>

        <label className="admin-field">
          <span>Name</span>
          <input
            value={form.name}
            required
            onChange={(event) => {
              const name = event.target.value;
              setForm((current) => ({
                ...current,
                name,
                // Existing keys stay put: changing one would orphan any link
                // already pointing at the card.
                slug: isNew ? slugify(name) : current.slug
              }));
            }}
          />
        </label>

        <label className="admin-field">
          <span>Key</span>
          <input value={form.slug} onChange={set("slug")} />
          <small className="admin-hint">
            Unique within this collection. On room pages it also picks the
            drawing shown when there is no photograph.
          </small>
        </label>

        {kind === "room" ? (
          <label className="admin-field">
            <span>Description</span>
            <textarea rows={4} value={form.description ?? ""} onChange={set("description")} />
          </label>
        ) : null}

        <label className="admin-field">
          <span>Alt text</span>
          <textarea rows={2} value={form.alt ?? ""} onChange={set("alt")} />
          <small className="admin-hint">
            What the photograph shows, for screen readers and search.
          </small>
        </label>

        {kind === "gallery" ? (
          <label className="admin-field">
            <span>Opens</span>
            <input
              value={form.href ?? ""}
              placeholder="#/kitchen"
              onChange={set("href")}
            />
          </label>
        ) : (
          <label className="admin-field">
            <span>Width</span>
            <select
              value={form.span}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  span: Number(event.target.value)
                }))
              }
            >
              <option value={12}>Full row</option>
              <option value={7}>Wide (7 of 12)</option>
              <option value={6}>Half (6 of 12)</option>
              <option value={5}>Narrow (5 of 12)</option>
            </select>
            <small className="admin-hint">
              Cards sit in a 12-column grid; pair a 7 with a 5 to fill a row.
            </small>
          </label>
        )}

        <label className="admin-check">
          <input
            type="checkbox"
            checked={form.published}
            onChange={set("published")}
          />
          <span>Published — visible on the site</span>
        </label>

        {error ? <p className="admin-error">{error}</p> : null}

        <div className="admin-editor-actions">
          <button type="button" className="admin-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="admin-btn admin-btn--primary" disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

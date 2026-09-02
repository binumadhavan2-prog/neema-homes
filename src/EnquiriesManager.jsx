import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import { ENQUIRY_TABLE } from "./enquiries.js";

// Enquiries left through the two public forms. Read only, apart from marking
// one read or archived, and deleting.

const FILTERS = [
  { key: "open", label: "Open" },
  { key: "archived", label: "Archived" },
  { key: "all", label: "All" }
];

const SOURCES = {
  calculator: "Price calculator",
  home: "Contact card"
};

const stamp = (value) =>
  new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

export default function EnquiriesManager() {
  const [filter, setFilter] = useState("open");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);

      let query = supabase
        .from(ENQUIRY_TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (filter === "open") query = query.in("status", ["new", "read"]);
      if (filter === "archived") query = query.eq("status", "archived");

      const { data, error: loadError } = await query;
      if (cancelled) return;

      if (loadError) setError(loadError.message);
      setRows(data ?? []);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [filter, refresh]);

  const reload = () => setRefresh((count) => count + 1);

  async function setStatus(row, status) {
    setError("");
    const { error: updateError } = await supabase
      .from(ENQUIRY_TABLE)
      .update({ status })
      .eq("id", row.id);

    if (updateError) setError(updateError.message);
    else reload();
  }

  async function remove(row) {
    const confirmed = window.confirm(
      `Delete the enquiry from ${row.name}? This cannot be undone.`
    );
    if (!confirmed) return;

    setError("");
    const { error: deleteError } = await supabase
      .from(ENQUIRY_TABLE)
      .delete()
      .eq("id", row.id);

    if (deleteError) setError(deleteError.message);
    else reload();
  }

  const newCount = rows.filter((row) => row.status === "new").length;

  return (
    <>
      <div className="admin-toolbar">
        <p className="admin-note">
          Enquiries from the contact card and the price calculator, newest
          first.
          {newCount > 0 ? ` ${newCount} unread.` : ""}
        </p>

        <div className="enq-filters">
          {FILTERS.map((entry) => (
            <button
              key={entry.key}
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

      {error ? <p className="admin-error admin-error--bar">{error}</p> : null}

      {loading ? (
        <p className="admin-note">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="admin-note">
          {filter === "archived"
            ? "Nothing archived."
            : "No enquiries yet. They land here as soon as somebody submits a form."}
        </p>
      ) : (
        <ul className="enq-list">
          {rows.map((row) => (
            <li
              className={row.status === "new" ? "enq-row is-new" : "enq-row"}
              key={row.id}
            >
              <div className="enq-main">
                <div className="enq-head">
                  <h2>{row.name}</h2>
                  {row.status === "new" ? (
                    <span className="admin-pill is-live">New</span>
                  ) : null}
                  <span className="enq-source">
                    {SOURCES[row.source] ?? row.source}
                  </span>
                  <time dateTime={row.created_at}>{stamp(row.created_at)}</time>
                </div>

                <p className="enq-contact">
                  {row.phone ? (
                    <a href={`tel:${row.phone}`}>{row.phone}</a>
                  ) : null}
                  {row.phone && row.email ? " · " : null}
                  {row.email ? (
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                  ) : null}
                  {row.location ? ` · ${row.location}` : null}
                </p>

                {row.message ? (
                  <p className="enq-message">{row.message}</p>
                ) : null}

                {!row.consented ? (
                  <p className="enq-noconsent">
                    Did not tick the contact consent box.
                  </p>
                ) : null}
              </div>

              <div className="enq-actions">
                {row.status === "new" ? (
                  <button
                    className="admin-btn"
                    onClick={() => setStatus(row, "read")}
                  >
                    Mark read
                  </button>
                ) : null}

                {row.status === "archived" ? (
                  <button
                    className="admin-btn"
                    onClick={() => setStatus(row, "read")}
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    className="admin-btn"
                    onClick={() => setStatus(row, "archived")}
                  >
                    Archive
                  </button>
                )}

                <button
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

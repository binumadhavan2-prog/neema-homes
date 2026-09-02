import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, CONFIG_HINT } from "./supabaseClient.js";
import { COLLECTIONS, TABLE, imageSrc, orderedQuery } from "./content.js";
import ItemEditor from "./ItemEditor.jsx";
import RatesManager from "./RatesManager.jsx";
import EnquiriesManager from "./EnquiriesManager.jsx";
import "./admin.css";

// Sort orders are stored in tens so a single move only has to renumber the
// list, never squeeze a value between two neighbours.
const STEP = 10;

function useSession() {
  // undefined = still asking Supabase, null = signed out.
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setSession(data.session ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  return session;
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (signInError) setError(signInError.message);
    setBusy(false);
  }

  return (
    <div className="admin-gate">
      <form className="admin-card admin-signin" onSubmit={onSubmit}>
        <p className="admin-eyebrow">NEEMA HOMES</p>
        <h1>Content dashboard</h1>
        <p className="admin-note">
          Sign in with the account added to the admin list.
        </p>

        <label className="admin-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            autoComplete="username"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error ? <p className="admin-error">{error}</p> : null}

        <button className="admin-btn admin-btn--primary" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <a className="admin-back" href="#/">
          ← Back to the site
        </a>
      </form>
    </div>
  );
}

function ItemsManager({ collection }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  // Bumped to re-run the fetch below after a write.
  const [refresh, setRefresh] = useState(0);

  const meta = COLLECTIONS.find((entry) => entry.key === collection);
  const reload = useCallback(() => setRefresh((count) => count + 1), []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error: loadError } = await orderedQuery(
        supabase.from(TABLE).select("*").eq("collection", collection)
      );

      if (cancelled) return;
      if (loadError) setError(loadError.message);
      setRows(data ?? []);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [collection, refresh]);

  async function togglePublished(row) {
    setError("");
    const { error: updateError } = await supabase
      .from(TABLE)
      .update({ published: !row.published })
      .eq("id", row.id);

    if (updateError) setError(updateError.message);
    else reload();
  }

  // Moving one card renumbers the whole collection, then writes back only the
  // rows whose position actually changed.
  async function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;

    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    setRows(next);
    setError("");

    const changed = next
      .map((row, position) => ({ row, sort_order: (position + 1) * STEP }))
      .filter((entry) => entry.row.sort_order !== entry.sort_order);

    for (const entry of changed) {
      const { error: moveError } = await supabase
        .from(TABLE)
        .update({ sort_order: entry.sort_order })
        .eq("id", entry.row.id);

      if (moveError) {
        setError(moveError.message);
        break;
      }
    }

    reload();
  }

  async function remove(row) {
    const confirmed = window.confirm(
      `Delete “${row.name}” from ${meta.label}? This cannot be undone.`
    );
    if (!confirmed) return;

    setError("");
    const { error: deleteError } = await supabase
      .from(TABLE)
      .delete()
      .eq("id", row.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    // Only uploaded files are ours to remove; "/images/..." photographs are
    // committed to the repository and shared between collections.
    if (row.image_path && !row.image_path.startsWith("/")) {
      await supabase.storage.from("gallery").remove([row.image_path]);
    }

    reload();
  }

  function addItem() {
    setEditing({
      collection,
      slug: "",
      name: "",
      description: "",
      alt: "",
      href: meta.kind === "gallery" ? "#/kitchen" : "",
      span: 12,
      image_path: null,
      published: false,
      sort_order: (rows.length + 1) * STEP
    });
  }

  return (
    <>
      <div className="admin-toolbar">
        <p className="admin-note">
          {meta.kind === "gallery"
            ? "Tiles on the Gallery page, in the order shown."
            : `Cards on the ${meta.label} page, in the order shown. A card with no photograph falls back to its drawing.`}{" "}
          <a href={meta.route}>Open {meta.label} →</a>
        </p>

        <button className="admin-btn admin-btn--primary" onClick={addItem}>
          + Add item
        </button>
      </div>

      {error ? <p className="admin-error admin-error--bar">{error}</p> : null}

      {loading ? (
        <p className="admin-note">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="admin-note">Nothing here yet. Add the first item.</p>
      ) : (
        <ul className="admin-list">
          {rows.map((row, index) => (
            <li className="admin-row" key={row.id}>
              <div className="admin-thumb">
                {row.image_path ? (
                  <img src={imageSrc(row.image_path)} alt="" loading="lazy" />
                ) : (
                  <span className="admin-thumb-empty">Drawing</span>
                )}
              </div>

              <div className="admin-row-body">
                <h2>{row.name}</h2>
                <p className="admin-slug">{row.slug}</p>
                {row.description ? (
                  <p className="admin-desc">{row.description}</p>
                ) : null}
              </div>

              <div className="admin-row-side">
                <button
                  className={
                    row.published
                      ? "admin-pill is-live"
                      : "admin-pill is-draft"
                  }
                  onClick={() => togglePublished(row)}
                  title="Click to change"
                >
                  {row.published ? "Live" : "Draft"}
                </button>

                <div className="admin-row-actions">
                  <button
                    className="admin-btn admin-btn--icon"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={`Move ${row.name} up`}
                  >
                    ↑
                  </button>
                  <button
                    className="admin-btn admin-btn--icon"
                    onClick={() => move(index, 1)}
                    disabled={index === rows.length - 1}
                    aria-label={`Move ${row.name} down`}
                  >
                    ↓
                  </button>
                  <button
                    className="admin-btn"
                    onClick={() => setEditing(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn--danger"
                    onClick={() => remove(row)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing ? (
        <ItemEditor
          item={editing}
          kind={meta.kind}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      ) : null}
    </>
  );
}

// The tab shell: collections, plus the price calculator.
const TABS = [
  ...COLLECTIONS.map((entry) => ({ key: entry.key, label: entry.label })),
  { key: "rates", label: "Price Calculator" },
  { key: "enquiries", label: "Enquiries" }
];

function Manager({ session }) {
  const [tab, setTab] = useState(TABS[0].key);

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">NEEMA HOMES</p>
          <h1>Content dashboard</h1>
        </div>

        <div className="admin-header-side">
          <span className="admin-user">{session.user.email}</span>
          <a className="admin-btn" href="#/">
            View site
          </a>
          <button
            className="admin-btn"
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map((entry) => (
          <button
            key={entry.key}
            className={entry.key === tab ? "admin-tab is-active" : "admin-tab"}
            onClick={() => setTab(entry.key)}
          >
            {entry.label}
          </button>
        ))}
      </nav>

      {/* Keyed, so switching tabs starts each manager from a clean slate. */}
      {tab === "rates" ? (
        <RatesManager />
      ) : tab === "enquiries" ? (
        <EnquiriesManager />
      ) : (
        <ItemsManager collection={tab} key={tab} />
      )}
    </div>
  );
}

export default function AdminPage() {
  const session = useSession();
  // Held against the user it was checked for, so signing in as somebody else
  // shows "checking" rather than the previous account's answer.
  const [checked, setChecked] = useState(null);
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    if (!userId) return undefined;

    let cancelled = false;

    // Row level security only lets an account read its own admins row, so a
    // hit here is proof of membership and a miss is proof of the opposite.
    supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setChecked({ userId, ok: Boolean(data) });
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const isAdmin = checked?.userId === userId ? checked.ok : undefined;

  if (!isSupabaseConfigured) {
    return (
      <div className="admin-gate">
        <div className="admin-card">
          <h1>Not configured</h1>
          <p className="admin-note">{CONFIG_HINT}</p>
        </div>
      </div>
    );
  }

  if (session === undefined) {
    return (
      <div className="admin-gate">
        <p className="admin-note">Checking your session…</p>
      </div>
    );
  }

  if (session === null) return <SignIn />;

  if (isAdmin === undefined) {
    return (
      <div className="admin-gate">
        <p className="admin-note">Checking permissions…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-gate">
        <div className="admin-card">
          <h1>No access</h1>
          <p className="admin-note">
            {session.user.email} is signed in but is not on the admin list, so
            it cannot change site content.
          </p>
          <button
            className="admin-btn"
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <Manager session={session} />;
}

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import {
  CATEGORY_TABLE,
  MAX_AREA,
  MIN_AREA,
  RATE_TABLE,
  SETTINGS_TABLE,
  TIERS,
  formatINR
} from "./calculatorRates.js";

// Editor for the #/calculator page: a per-square-foot range for every
// category and tier, plus the placeholder warning and the disclaimer.

const blankRate = (categoryKey, tier) => ({
  category_key: categoryKey,
  tier,
  rate_low: 0,
  rate_high: 0,
  note: ""
});

// Rate rows keyed "category:tier", so an edit is a single lookup.
const rateKey = (categoryKey, tier) => `${categoryKey}:${tier}`;

export default function RatesManager() {
  const [categories, setCategories] = useState([]);
  const [rates, setRates] = useState({});
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [categoryResult, rateResult, settingsResult] = await Promise.all([
        supabase
          .from(CATEGORY_TABLE)
          .select("*")
          .order("sort_order", { ascending: true }),
        supabase.from(RATE_TABLE).select("*"),
        supabase.from(SETTINGS_TABLE).select("*").eq("id", 1).maybeSingle()
      ]);

      if (cancelled) return;

      const failure =
        categoryResult.error || rateResult.error || settingsResult.error;
      if (failure) setError(failure.message);

      const categoryRows = categoryResult.data ?? [];
      setCategories(categoryRows);

      const byKey = {};
      for (const row of categoryRows) {
        for (const tier of TIERS) {
          byKey[rateKey(row.key, tier.id)] = blankRate(row.key, tier.id);
        }
      }
      for (const row of rateResult.data ?? []) {
        byKey[rateKey(row.category_key, row.tier)] = {
          ...row,
          note: row.note ?? ""
        };
      }
      setRates(byKey);

      setSettings(
        settingsResult.data ?? {
          id: 1,
          rates_are_placeholder: true,
          disclaimer: ""
        }
      );
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const touch = () => {
    setSaved(false);
    setError("");
  };

  function editRate(categoryKey, tier, field, value) {
    touch();
    setRates((current) => ({
      ...current,
      [rateKey(categoryKey, tier)]: {
        ...current[rateKey(categoryKey, tier)],
        [field]: value
      }
    }));
  }

  function editCategory(key, field, value) {
    touch();
    setCategories((current) =>
      current.map((row) => (row.key === key ? { ...row, [field]: value } : row))
    );
  }

  // Every range has to be a sane pair before anything is written, so a bad
  // number can't reach the public page.
  function validate() {
    for (const category of categories) {
      const area = Number(category.default_area);
      if (!Number.isInteger(area) || area < MIN_AREA || area > MAX_AREA) {
        return `${category.name}: default area must be between ${MIN_AREA} and ${MAX_AREA} sq ft.`;
      }

      for (const tier of TIERS) {
        const rate = rates[rateKey(category.key, tier.id)];
        const low = Number(rate.rate_low);
        const high = Number(rate.rate_high);

        if (!Number.isFinite(low) || !Number.isFinite(high) || low < 0) {
          return `${category.name} · ${tier.name}: rates must be numbers.`;
        }
        if (high < low) {
          return `${category.name} · ${tier.name}: the high rate is below the low rate.`;
        }
      }
    }
    return "";
  }

  async function save() {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }

    setSaving(true);
    setError("");

    const stamp = new Date().toISOString();

    const categoryPayload = categories.map((row) => ({
      key: row.key,
      name: row.name,
      href: row.href ?? "",
      default_area: Number(row.default_area),
      sort_order: row.sort_order,
      published: row.published,
      updated_at: stamp
    }));

    const ratePayload = Object.values(rates).map((row) => ({
      category_key: row.category_key,
      tier: row.tier,
      rate_low: Number(row.rate_low),
      rate_high: Number(row.rate_high),
      note: row.note?.trim() ? row.note.trim() : null,
      updated_at: stamp
    }));

    const results = await Promise.all([
      supabase
        .from(CATEGORY_TABLE)
        .upsert(categoryPayload, { onConflict: "key" }),
      supabase
        .from(RATE_TABLE)
        .upsert(ratePayload, { onConflict: "category_key,tier" }),
      supabase
        .from(SETTINGS_TABLE)
        .update({
          rates_are_placeholder: settings.rates_are_placeholder,
          disclaimer: settings.disclaimer,
          updated_at: stamp
        })
        .eq("id", 1)
    ]);

    const failure = results.find((result) => result.error);
    setSaving(false);

    if (failure) setError(failure.error.message);
    else setSaved(true);
  }

  if (loading) return <p className="admin-note">Loading…</p>;

  return (
    <>
      <div className="admin-toolbar">
        <p className="admin-note">
          Rupees per square foot for each room and finish. The page multiplies
          these by the area a visitor enters, and rounds to the nearest
          thousand. <a href="#/calculator">Open the calculator →</a>
        </p>

        <button
          className="admin-btn admin-btn--primary"
          onClick={save}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {error ? <p className="admin-error admin-error--bar">{error}</p> : null}
      {saved ? <p className="admin-saved">Saved.</p> : null}

      {settings.rates_are_placeholder ? (
        <p className="admin-warning">
          <strong>These rates are marked as placeholders.</strong> A warning
          banner is showing on the public calculator page. Untick the box at the
          bottom once the real rates are in.
        </p>
      ) : null}

      <div className="rates-tables">
        {categories.map((category) => (
          <section className="rates-card" key={category.key}>
            <header className="rates-card-head">
              <h2>{category.name}</h2>

              <label className="rates-inline">
                <span>Default area (sq ft)</span>
                <input
                  type="number"
                  min={MIN_AREA}
                  max={MAX_AREA}
                  value={category.default_area}
                  onChange={(event) =>
                    editCategory(
                      category.key,
                      "default_area",
                      event.target.value
                    )
                  }
                />
              </label>

              <button
                className={
                  category.published
                    ? "admin-pill is-live"
                    : "admin-pill is-draft"
                }
                onClick={() =>
                  editCategory(category.key, "published", !category.published)
                }
                title="Click to change"
              >
                {category.published ? "Shown" : "Hidden"}
              </button>
            </header>

            <table className="rates-table">
              <thead>
                <tr>
                  <th scope="col">Finish</th>
                  <th scope="col">Low ₹/sq ft</th>
                  <th scope="col">High ₹/sq ft</th>
                  <th scope="col">What it includes</th>
                  <th scope="col">At {category.default_area} sq ft</th>
                </tr>
              </thead>

              <tbody>
                {TIERS.map((tier) => {
                  const rate = rates[rateKey(category.key, tier.id)];
                  const area = Number(category.default_area);
                  const low = Number(rate.rate_low) * area;
                  const high = Number(rate.rate_high) * area;
                  const previewable =
                    Number.isFinite(low) &&
                    Number.isFinite(high) &&
                    high >= low;

                  return (
                    <tr key={tier.id}>
                      <th scope="row">{tier.name}</th>

                      <td>
                        <input
                          type="number"
                          min="0"
                          value={rate.rate_low}
                          aria-label={`${category.name} ${tier.name} low rate`}
                          onChange={(event) =>
                            editRate(
                              category.key,
                              tier.id,
                              "rate_low",
                              event.target.value
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          value={rate.rate_high}
                          aria-label={`${category.name} ${tier.name} high rate`}
                          onChange={(event) =>
                            editRate(
                              category.key,
                              tier.id,
                              "rate_high",
                              event.target.value
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          placeholder="Optional"
                          value={rate.note}
                          aria-label={`${category.name} ${tier.name} note`}
                          onChange={(event) =>
                            editRate(
                              category.key,
                              tier.id,
                              "note",
                              event.target.value
                            )
                          }
                        />
                      </td>

                      <td className="rates-preview">
                        {previewable
                          ? `${formatINR(low)} – ${formatINR(high)}`
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ))}
      </div>

      <section className="rates-card">
        <h2>Page settings</h2>

        <label className="admin-field">
          <span>Disclaimer shown under the cards</span>
          <textarea
            rows={3}
            value={settings.disclaimer}
            onChange={(event) => {
              touch();
              setSettings({ ...settings, disclaimer: event.target.value });
            }}
          />
        </label>

        <label className="rates-check">
          <input
            type="checkbox"
            checked={settings.rates_are_placeholder}
            onChange={(event) => {
              touch();
              setSettings({
                ...settings,
                rates_are_placeholder: event.target.checked
              });
            }}
          />
          <span>
            These rates are placeholders — show a warning banner on the public
            page
          </span>
        </label>
      </section>
    </>
  );
}

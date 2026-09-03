import { useState } from "react";
import ActionButton from "./ActionButton.jsx";
import EnquiryCard from "./EnquiryCard.jsx";
import RotatingWord from "./RotatingWord.jsx";
import "./calculator.css";
import {
  MAX_AREA,
  MIN_AREA,
  TIERS,
  estimateFor,
  formatINR,
  useCalculatorContent
} from "./calculatorRates.js";

// One estimator per interior work. Each section keeps its own area and tier,
// so a visitor can price a kitchen and a bedroom side by side without one
// resetting the other.

// A category the visitor hasn't touched falls back to its own default area.
// Holding only the edits means rates arriving late can't clobber typed input.
const defaultValue = (category) => ({
  area: String(category.defaultArea ?? ""),
  tier: "premium"
});

const scrollToEnquiry = () =>
  document
    .getElementById("calc-enquiry")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

function Estimator({ category, value, onChange }) {
  const area = Number(value.area);
  const isBlank = value.area.trim() === "";
  const tooSmall = !isBlank && (!Number.isFinite(area) || area < MIN_AREA);
  const tooLarge = Number.isFinite(area) && area > MAX_AREA;
  const estimate = tooLarge ? null : estimateFor(category, value.tier, area);

  const fieldId = `calc-area-${category.id}`;

  return (
    <article className="calc-card" id={`calc-${category.id}`}>
      <header className="calc-card-head">
        <h2>{category.name}</h2>
        <a className="calc-card-link" href={category.href}>
          View designs <span aria-hidden="true">&rarr;</span>
        </a>
      </header>

      <div className="calc-controls">
        <div className="calc-field">
          <label htmlFor={fieldId}>Area (sq ft)</label>
          <input
            id={fieldId}
            type="number"
            inputMode="numeric"
            min={MIN_AREA}
            max={MAX_AREA}
            step="1"
            value={value.area}
            onChange={(e) => onChange({ ...value, area: e.target.value })}
            aria-describedby={`${fieldId}-out`}
          />
        </div>

        <fieldset className="calc-tiers">
          <legend>Finish</legend>

          <div className="calc-tier-row">
          {TIERS.map((tier) => (
            <label
              key={tier.id}
              className={
                value.tier === tier.id ? "calc-tier is-on" : "calc-tier"
              }
            >
              <input
                type="radio"
                name={`tier-${category.id}`}
                value={tier.id}
                checked={value.tier === tier.id}
                onChange={() => onChange({ ...value, tier: tier.id })}
              />
              <span>{tier.name}</span>
              {category.notes?.[tier.id] && (
                <small>{category.notes[tier.id]}</small>
              )}
            </label>
          ))}
          </div>
        </fieldset>
      </div>

      <div className="calc-output" id={`${fieldId}-out`} aria-live="polite">
        {estimate ? (
          <>
            <p className="calc-range">
              {formatINR(estimate.low)} &ndash; {formatINR(estimate.high)}
            </p>
            <p className="calc-basis">
              {area} sq ft &times; {formatINR(estimate.rateLow)}&ndash;
              {formatINR(estimate.rateHigh)} per sq ft
            </p>
          </>
        ) : (
          <p className="calc-empty">
            {tooLarge
              ? `Enter an area up to ${MAX_AREA} sq ft, or talk to us directly.`
              : tooSmall
                ? `Enter an area of at least ${MIN_AREA} sq ft.`
                : "Enter an area to see an indicative range."}
          </p>
        )}
      </div>

      <ActionButton className="calc-cta" onAction={scrollToEnquiry}>
        Get an exact quote
      </ActionButton>
    </article>
  );
}

export default function CalculatorPage() {
  const { categories, settings } = useCalculatorContent();
  const [edits, setEdits] = useState({});

  const update = (id, next) =>
    setEdits((current) => ({ ...current, [id]: next }));

  return (
    <main className="calc-page">
      <section className="product-intro">
        <div className="shell">
          <p className="eyebrow">Price Calculator</p>
          {/* The rooms spin through the heading. aria-label carries the
              whole sentence, because the visible half of it changes every
              couple of seconds and the rotating half is hidden. */}
          <h1 aria-label="Estimate your interiors">
            Estimate Your{" "}
            <RotatingWord items={categories.map((category) => category.name)} />
          </h1>
          <p className="product-intro-text">
            Enter a room's area and choose a finish to see an indicative range.
            Every home is different, so treat the figure as a starting point
            rather than a quote &mdash; talk to us for an exact one.
          </p>
        </div>
      </section>

      {settings.ratesArePlaceholder && (
        <div className="shell">
          <p className="calc-warning" role="alert">
            <strong>Placeholder rates.</strong> The per-square-foot figures on
            this page are stand-ins, not NEEMA HOMES&rsquo; pricing. Replace them
            in the dashboard, then switch the warning off there, before this
            page goes live.
          </p>
        </div>
      )}

      <section className="calc-sections">
        <div className="shell">
          <div className="calc-grid">
            {categories.map((category) => (
              <Estimator
                key={category.id}
                category={category}
                value={edits[category.id] ?? defaultValue(category)}
                onChange={(next) => update(category.id, next)}
              />
            ))}
          </div>

          {/* Editable from the dashboard, so the studio states its own
              inclusions and exclusions. */}
          <p className="calc-disclaimer">{settings.disclaimer}</p>
        </div>
      </section>

      <EnquiryCard />
    </main>
  );
}

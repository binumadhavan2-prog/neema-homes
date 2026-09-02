import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

// Rates live in Supabase and are edited from #/admin. The arrays below are
// only the fallback, for the three cases that should never blank the page:
// Supabase unconfigured, the request failing, and the tables being empty.
//
// PLACEHOLDER FALLBACK — NOT NEEMA HOMES' PRICING. The real numbers live in
// public.calculator_rates. Clear the warning banner by turning off
// `rates_are_placeholder` in public.calculator_settings, from the dashboard.

export const CATEGORY_TABLE = "calculator_categories";
export const RATE_TABLE = "calculator_rates";
export const SETTINGS_TABLE = "calculator_settings";

// Display labels only. What a tier includes is per-category, and comes from
// the `note` column on each rate row.
export const TIERS = [
  { id: "essential", name: "Essential" },
  { id: "premium", name: "Premium" },
  { id: "luxury", name: "Luxury" }
];

export const MIN_AREA = 10;
export const MAX_AREA = 2000;

const FALLBACK_CATEGORIES = [
  {
    id: "kitchen",
    name: "Modular Kitchen",
    href: "#/kitchen",
    defaultArea: 120,
    rates: { essential: [1100, 1400], premium: [1600, 2000], luxury: [2400, 3200] },
    notes: {}
  },
  {
    id: "bedroom",
    name: "Bedroom",
    href: "#/bedroom",
    defaultArea: 140,
    rates: { essential: [900, 1200], premium: [1400, 1800], luxury: [2100, 2800] },
    notes: {}
  },
  {
    id: "living",
    name: "Living Room",
    href: "#/living",
    defaultArea: 200,
    rates: { essential: [800, 1100], premium: [1300, 1700], luxury: [2000, 2700] },
    notes: {}
  },
  {
    id: "dining",
    name: "Dining Room",
    href: "#/dining",
    defaultArea: 120,
    rates: { essential: [800, 1050], premium: [1250, 1600], luxury: [1900, 2500] },
    notes: {}
  },
  {
    id: "decor",
    name: "Decorative Units",
    href: "#/decor",
    defaultArea: 60,
    rates: { essential: [950, 1250], premium: [1450, 1850], luxury: [2200, 2900] },
    notes: {}
  },
  {
    id: "kids",
    name: "Kids Room",
    href: "#/kids",
    defaultArea: 120,
    rates: { essential: [950, 1250], premium: [1400, 1800], luxury: [2100, 2800] },
    notes: {}
  }
];

const FALLBACK_SETTINGS = {
  ratesArePlaceholder: true,
  disclaimer: "Indicative only, and not a quote."
};

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export const formatINR = (value) => inr.format(value);

// Rounds to the nearest thousand so an estimate never reads as an exact quote.
const toNearestThousand = (value) => Math.round(value / 1000) * 1000;

export function estimateFor(category, tierId, area) {
  const rate = category.rates?.[tierId];
  if (!rate || !Number.isFinite(area) || area < MIN_AREA) return null;

  const [low, high] = rate;
  return {
    low: toNearestThousand(low * area),
    high: toNearestThousand(high * area),
    rateLow: low,
    rateHigh: high
  };
}

// Category rows plus their rate rows, folded into the shape above.
function buildCategories(categoryRows, rateRows) {
  return categoryRows.map((row) => {
    const mine = rateRows.filter((rate) => rate.category_key === row.key);

    return {
      id: row.key,
      name: row.name,
      href: row.href || "",
      defaultArea: row.default_area,
      rates: Object.fromEntries(
        mine.map((rate) => [rate.tier, [rate.rate_low, rate.rate_high]])
      ),
      notes: Object.fromEntries(
        mine.filter((rate) => rate.note).map((rate) => [rate.tier, rate.note])
      )
    };
  });
}

/**
 * Published categories with their rates, and the page settings. Falls back to
 * the compiled-in arrays whenever Supabase can't answer.
 */
export function useCalculatorContent() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [settings, setSettings] = useState(FALLBACK_SETTINGS);

  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;

    (async () => {
      const [categoryResult, rateResult, settingsResult] = await Promise.all([
        supabase
          .from(CATEGORY_TABLE)
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true }),
        supabase.from(RATE_TABLE).select("*"),
        supabase.from(SETTINGS_TABLE).select("*").eq("id", 1).maybeSingle()
      ]);

      if (cancelled) return;

      if (
        !categoryResult.error &&
        !rateResult.error &&
        categoryResult.data?.length
      ) {
        setCategories(buildCategories(categoryResult.data, rateResult.data ?? []));
      }

      if (!settingsResult.error && settingsResult.data) {
        setSettings({
          ratesArePlaceholder: settingsResult.data.rates_are_placeholder,
          disclaimer: settingsResult.data.disclaimer
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, settings };
}

// Plan diagrams standing in for kitchen types we have no photograph of yet.
// Counters in gold on the room outline, drawn to match the site's line work.

const PLANS = {
  island: (
    <>
      <rect className="kp-counter" x="14" y="14" width="92" height="12" rx="2" />
      <rect className="kp-counter" x="42" y="44" width="36" height="18" rx="2" />
    </>
  ),
  "l-shaped": (
    <>
      <rect className="kp-counter" x="14" y="14" width="92" height="12" rx="2" />
      <rect className="kp-counter" x="14" y="14" width="12" height="54" rx="2" />
    </>
  ),
  parallel: (
    <>
      <rect className="kp-counter" x="14" y="14" width="92" height="12" rx="2" />
      <rect className="kp-counter" x="14" y="64" width="92" height="12" rx="2" />
    </>
  ),
  straight: (
    <rect className="kp-counter" x="14" y="14" width="92" height="12" rx="2" />
  ),
  "u-shaped": (
    <>
      <rect className="kp-counter" x="14" y="14" width="92" height="12" rx="2" />
      <rect className="kp-counter" x="14" y="14" width="12" height="62" rx="2" />
      <rect className="kp-counter" x="94" y="14" width="12" height="62" rx="2" />
    </>
  )
};

export default function KitchenPlan({ type, label }) {
  return (
    <svg
      className="product-drawing"
      viewBox="0 0 120 90"
      role="img"
      aria-label={`Plan diagram of a ${label.toLowerCase()}`}
    >
      <rect className="kp-room" x="10" y="10" width="100" height="70" rx="4" />
      {PLANS[type]}
    </svg>
  );
}

// Line drawings standing in for bedroom pieces we have no photograph of yet.
// Same treatment as the kitchen plans: gold on the ink ground.

const DRAWINGS = {
  bed: (
    <>
      <rect x="22" y="18" width="76" height="54" rx="5" />
      <rect x="31" y="25" width="25" height="12" rx="3" />
      <rect x="64" y="25" width="25" height="12" rx="3" />
      <path d="M22 46h76" />
    </>
  ),
  dressing: (
    <>
      <circle cx="60" cy="28" r="14" />
      <rect x="26" y="48" width="68" height="26" rx="4" />
      <path d="M60 48v26M38 60h10M72 60h10" />
    </>
  ),
  wardrobe: (
    <>
      <rect x="26" y="12" width="68" height="66" rx="4" />
      <path d="M60 12v66M54 42v9M66 42v9M26 30h68" />
    </>
  )
};

export default function BedroomIcon({ type, label }) {
  return (
    <svg
      className="product-drawing bedroom-drawing"
      viewBox="0 0 120 90"
      role="img"
      aria-label={`Line drawing of a ${label.toLowerCase()}`}
    >
      {DRAWINGS[type]}
    </svg>
  );
}

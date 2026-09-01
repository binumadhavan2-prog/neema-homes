// Line drawings standing in for dining pieces we have no photograph of yet.

const DRAWINGS = {
  "bar-counter": (
    <>
      <rect x="16" y="32" width="62" height="34" rx="3" />
      <path d="M16 42h62" />
      <circle cx="94" cy="40" r="7" />
      <path d="M94 47v20M87 67h14" />
    </>
  ),
  "crockery-shelf": (
    <>
      <rect x="30" y="10" width="60" height="70" rx="4" />
      <path d="M30 32h60M30 50h60M30 66h60" />
      <circle cx="46" cy="21" r="5" />
      <circle cx="62" cy="41" r="5" />
    </>
  ),
  "dining-chair": (
    <>
      <rect x="38" y="14" width="32" height="34" rx="3" />
      <path d="M32 48h50M38 48v26M78 48v26" />
    </>
  ),
  "wash-counter": (
    <>
      <rect x="24" y="44" width="72" height="28" rx="3" />
      <path d="M42 44v-7a8 8 0 0 1 8-8h4" />
      <ellipse cx="62" cy="58" rx="15" ry="7" />
    </>
  )
};

export default function DiningIcon({ type, label }) {
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

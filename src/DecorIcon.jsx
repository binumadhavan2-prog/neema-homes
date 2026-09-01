// Line drawings standing in for decorative units we have no photograph of.

const DRAWINGS = {
  "open-shelves": (
    <>
      <path d="M18 24h84M18 45h84M18 66h84" />
      <path d="M30 24v42M90 24v42" />
    </>
  ),
  cabinets: (
    <>
      <rect x="20" y="20" width="80" height="52" rx="3" />
      <path d="M60 20v52M53 44h-7M67 44h7" />
    </>
  )
};

export default function DecorIcon({ type, label }) {
  return (
    <svg
      className="product-drawing bedroom-drawing"
      viewBox="0 0 120 90"
      role="img"
      aria-label={`Line drawing of ${label.toLowerCase()}`}
    >
      {DRAWINGS[type]}
    </svg>
  );
}

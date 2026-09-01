// Line drawings standing in for living-room pieces we have no photograph of.

const DRAWINGS = {
  "centre-table": (
    <>
      <rect x="26" y="38" width="68" height="13" rx="4" />
      <path d="M36 51v20M84 51v20M36 71h-6M84 71h6" />
    </>
  ),
  chairs: (
    <>
      <rect x="32" y="26" width="56" height="30" rx="7" />
      <path d="M32 40h-9v16M88 40h9v16" />
      <path d="M38 56v16M82 56v16" />
    </>
  ),
  partition: (
    <>
      <rect x="26" y="12" width="68" height="66" rx="3" />
      <path d="M43 12v66M60 12v66M77 12v66" />
    </>
  ),
  "shoe-rack": (
    <>
      <rect x="24" y="24" width="72" height="50" rx="3" />
      <path d="M24 41h72M24 58h72" />
      <path d="M33 74v6M87 74v6" />
    </>
  )
};

export default function LivingIcon({ type, label }) {
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

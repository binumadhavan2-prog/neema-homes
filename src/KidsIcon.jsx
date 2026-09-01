// Line drawings standing in for kids' room pieces we have no photograph of.

const DRAWINGS = {
  bed: (
    <>
      <rect x="22" y="14" width="62" height="22" rx="3" />
      <rect x="22" y="52" width="62" height="22" rx="3" />
      <path d="M22 14v60M84 14v60" />
      <path d="M92 22v46M88 30h12M88 44h12M88 58h12" />
    </>
  ),
  "study-unit": (
    <>
      <path d="M20 48h60M26 48v24M74 48v24" />
      <path d="M28 22h44M28 34h44" />
      <rect x="82" y="52" width="18" height="6" rx="2" />
      <path d="M86 58v14M96 58v14M100 40v18" />
    </>
  ),
  "wardrobe-study": (
    <>
      <rect x="18" y="12" width="34" height="62" rx="3" />
      <path d="M35 12v62M31 42h-5M39 42h5" />
      <path d="M58 46h44M64 46v28M96 46v28" />
      <path d="M58 24h44" />
    </>
  )
};

export default function KidsIcon({ type, label }) {
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

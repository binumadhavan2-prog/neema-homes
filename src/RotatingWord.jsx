import { useEffect, useState } from "react";

// Cycles through a list of words in place, one at a time. Used in the
// calculator heading so the six rooms the page prices announce themselves
// rather than sitting in a list below the fold.
//
// The words are decorative: the heading around them carries the real
// sentence for screen readers, and this is hidden from them. Reduced motion
// gets the first word, standing still.
export default function RotatingWord({ items = [], interval = 2100 }) {
  const [index, setIndex] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || items.length < 2) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      Math.max(600, interval)
    );

    return () => clearInterval(id);
  }, [items.length, interval, reduced]);

  if (items.length === 0) return null;

  // The longest word reserves the width, so the heading does not reflow on
  // every tick — "Decorative Units" is a lot wider than "Bedroom".
  const widest = items.reduce((a, b) => (b.length > a.length ? b : a), items[0]);
  const current = items[Math.min(index, items.length - 1)];

  return (
    <span className="rotating-word" aria-hidden="true">
      <span className="rotating-word-sizer">{widest}</span>
      {reduced ? (
        <span className="rotating-word-item is-static">{items[0]}</span>
      ) : (
        <span className="rotating-word-item" key={current}>
          {current}
        </span>
      )}
    </span>
  );
}

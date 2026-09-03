import { useEffect, useState } from "react";

import "./RotatingWord.css";

// Cycles through a list of words in place, one at a time. Used by the hero
// headline, so the last word turns over what the studio designs rather than
// standing still on one of them.
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

  const current = items[Math.min(index, items.length - 1)];

  return (
    <span className="rotating-word" aria-hidden="true">
      {/* Every word is laid out here, stacked in one grid cell and hidden, so
          the box is as wide as the widest of them actually renders. Picking
          the longest string instead is wrong in a proportional font — the
          word "Dining Rooms" is wider than "Living Rooms" at the same
          twelve characters, and got its last letter clipped. */}
      <span className="rotating-word-sizer">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </span>
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

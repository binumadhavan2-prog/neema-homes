import { useRef } from "react";

// Three rooms in staggered slots. The outer slot holds the fixed perspective
// tilt, the middle floats, and the card takes the cursor tilt — separate
// layers so the transforms do not overwrite one another.

export default function HeroShowcase({ items, onOpen }) {
  const frameRef = useRef(null);

  const trackCursor = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    // -1 → 1 across each axis, measured from the centre
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--mx", x.toFixed(3));
      card.style.setProperty("--my", y.toFixed(3));
    });
  };

  const resetCursor = (event) => {
    event.currentTarget.style.setProperty("--mx", "0");
    event.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <div className="showcase">
      {items.map((item, index) => (
        <div className={`showcase-slot showcase-slot--${index}`} key={item.title}>
          <div className="showcase-float">
            <button
              type="button"
              className="showcase-card"
              onMouseMove={trackCursor}
              onMouseLeave={resetCursor}
              onClick={() => onOpen(item)}
            >
              <img src={item.image} alt={item.title} />

              <span className="showcase-caption">
                <span className="showcase-room">{item.title}</span>
                <span className="showcase-open">Open</span>
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

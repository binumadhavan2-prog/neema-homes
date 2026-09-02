import { useEffect, useState } from "react";

// How long each frame holds before the next one crossfades in
const HOLD_MS = 4800;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The hero background: three rooms crossfading behind the copy. The frames
// and the controls are separate absolute layers because the hero's dark
// scrim sits between them — the images go under it, the buttons over.

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);

  const goTo = (next) => setIndex((next + slides.length) % slides.length);

  // Restarted on every change, so a slide picked by hand gets a full turn
  // on screen rather than the tail of the one before it
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const timer = setTimeout(
      () => setIndex((current) => (current + 1) % slides.length),
      HOLD_MS
    );

    return () => clearTimeout(timer);
  }, [index, slides.length]);

  return (
    <>
      {/* Decorative: the hero's heading carries the meaning, and the room
          names are on the buttons below */}
      <div className="hero-slider" aria-hidden="true">
        {slides.map((slide, i) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            className={i === index ? "hero-frame is-on" : "hero-frame"}
          />
        ))}
      </div>

      <div className="hero-slider-controls">
        <div className="hero-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              className={i === index ? "hero-dot is-on" : "hero-dot"}
              aria-label={`Show the ${slide.label.toLowerCase()}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="hero-arrows">
          <button
            type="button"
            className="hero-arrow"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>

          <button
            type="button"
            className="hero-arrow"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

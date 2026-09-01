import { useEffect, useRef, useState } from "react";

// "What We Do" in the navbar: the label still links through, and the arrow
// beside it opens the two offerings.
const OPTIONS = [
  { label: "Customised Interior", href: "#services" },
  { label: "Design and Build", href: "#portfolio" }
];

export default function WhatWeDoNav() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setIsOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="nav-dropdown" ref={wrapRef}>
      <a href="#services" className="nav-what-we-do">
        What We Do
      </a>

      <button
        type="button"
        className={isOpen ? "what-we-do-toggle is-open" : "what-we-do-toggle"}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Show what we do options"
      >
        <span className="what-we-do-arrow" aria-hidden="true">
          ↓
        </span>
      </button>

      {isOpen && (
        <ul className="nav-submenu">
          {OPTIONS.map((option) => (
            <li key={option.label}>
              <a href={option.href} onClick={() => setIsOpen(false)}>
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

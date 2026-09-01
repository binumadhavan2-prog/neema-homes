import { useEffect, useRef, useState } from "react";

// A navbar item whose label links through, with an arrow beside it that
// opens a short list of options.

export default function NavDropdown({ label, href, options }) {
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
      <a href={href} className="nav-dropdown-label">
        {label}
      </a>

      <button
        type="button"
        className={
          isOpen ? "nav-dropdown-toggle is-open" : "nav-dropdown-toggle"
        }
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Show ${label} options`}
      >
        <span className="nav-dropdown-arrow" aria-hidden="true">
          ↓
        </span>
      </button>

      {isOpen && (
        <ul className="nav-submenu">
          {options.map((option) => (
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

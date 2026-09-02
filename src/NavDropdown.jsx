import { useEffect, useRef, useState } from "react";

// A navbar item whose label links through, with an arrow beside it that
// opens a short list of options.
//
// An option is { label, href }, plus an optional `hint` — a caption above
// the label, for a menu of details ("Phone" over the number) rather than a
// menu of destinations. `align` puts the menu's right edge under the arrow,
// for items sitting close to the end of the bar.

export default function NavDropdown({ label, href, options, align = "left" }) {
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
        <ul className={align === "right" ? "nav-submenu is-right" : "nav-submenu"}>
          {options.map((option) => {
            const isExternal = option.href.startsWith("http");

            return (
              <li key={option.label}>
                <a
                  href={option.href}
                  onClick={() => setIsOpen(false)}
                  {...(isExternal && { target: "_blank", rel: "noreferrer" })}
                >
                  {option.hint ? (
                    <span className="nav-submenu-hint">{option.hint}</span>
                  ) : null}
                  {option.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

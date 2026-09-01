import { useEffect, useRef, useState } from "react";

// A button that shows a spinner in place of its label for a beat, so the
// click visibly registers, then runs the action. Disabled while busy, so a
// second click cannot land.

const BUSY_MS = 550;

export default function ActionButton({
  className = "",
  onAction,
  children,
  ...rest
}) {
  const [isBusy, setIsBusy] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = () => {
    if (isBusy) return;

    setIsBusy(true);
    timer.current = setTimeout(() => {
      setIsBusy(false);
      onAction?.();
    }, BUSY_MS);
  };

  return (
    <button
      type="button"
      className={isBusy ? `${className} is-busy` : className}
      onClick={handleClick}
      disabled={isBusy}
      {...rest}
    >
      <span className="btn-label">{children}</span>
      <span className="btn-spinner" aria-hidden="true" />
    </button>
  );
}

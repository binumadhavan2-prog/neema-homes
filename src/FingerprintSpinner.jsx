// Busy indicator drawn as a fingerprint, echoing the NEEMA HOMES mark.
// The ridges light up from the core outwards, like a print being read.
// Strokes use currentColor, so each button colours its own.

export default function FingerprintSpinner() {
  return (
    <svg
      className="btn-spinner"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path className="fp-ridge fp-4" d="M2.6 14.2a9.4 9.4 0 0 1 18.8 0" />
      <path className="fp-ridge fp-3" d="M5.8 15.4a6.2 6.2 0 0 1 12.4 0" />
      <path className="fp-ridge fp-2" d="M9 16.6a3 3 0 0 1 6 0" />
      <path className="fp-ridge fp-1" d="M12 17.9v-.6" />
    </svg>
  );
}

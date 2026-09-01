// Busy indicator for Enquire Now: a handset ringing, with signal waves.
// Strokes use currentColor, so the button colours it.

export default function CallSpinner() {
  return (
    <svg
      className="btn-spinner"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g className="call-handset">
        <path d="M6.3 4h2.3l1.3 3.2-1.7 1.3a10.6 10.6 0 0 0 4.9 4.9l1.3-1.7 3.2 1.3v2.3a1.9 1.9 0 0 1-2.1 1.9A15.9 15.9 0 0 1 4.4 6.1 1.9 1.9 0 0 1 6.3 4z" />
      </g>

      <path className="call-wave call-wave-1" d="M15 5.4a4.3 4.3 0 0 1 3.9 3.9" />
      <path className="call-wave call-wave-2" d="M15.3 2.2a7.5 7.5 0 0 1 6.8 6.8" />
    </svg>
  );
}

// Icons for the service cards, keyed by the `icon` value in SERVICES.
// Line drawings in currentColor, so the card styles them.

const line = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

export const SERVICE_ICONS = {
  // An arch, echoing the foyer in our own work
  "interior-design": (
    <svg {...line}>
      <path d="M4 21V10a8 8 0 0 1 16 0v11" />
      <path d="M2 21h20" />
    </svg>
  ),

  // A floor plan divided into rooms
  "space-planning": (
    <svg {...line}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M13 3v18" />
      <path d="M3 12h10" />
    </svg>
  ),

  // A console table in elevation
  "furniture-design": (
    <svg {...line}>
      <path d="M3 9h18" />
      <path d="M5 5h14l2 4H3z" />
      <path d="M6 9v10" />
      <path d="M18 9v10" />
    </svg>
  )
};

// Flat vector illustration for the contact card: an envelope in flight, a
// paper plane, sparkles and a few geometric accents. Decorative only, so it
// is hidden from assistive tech.

const SPARKLE = "M0 -11C1.6 -3.6 3.6 -1.6 11 0 3.6 1.6 1.6 3.6 0 11c-1.6-7.4-3.6-9.4-11-11 7.4-1.6 9.4-3.6 11-11z";

export default function ContactIllustration() {
  return (
    <svg
      className="contact-art"
      viewBox="0 0 380 320"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Soft ground */}
      <circle cx="176" cy="176" r="132" fill="rgba(255,255,255,0.42)" />
      <circle
        cx="176"
        cy="176"
        r="156"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeDasharray="5 9"
      />

      {/* Flight path */}
      <path
        d="M118 118C154 66 232 60 286 92"
        fill="none"
        stroke="#c9a24d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 11"
        opacity="0.75"
      />

      {/* Paper plane */}
      <g>
        <path d="M330 44 234 96l38 13z" fill="#ffffff" />
        <path d="M330 44 272 109l9 31z" fill="#c9a24d" />
        <path d="M330 44 272 109l31-6z" fill="#9fc6bc" />
      </g>

      {/* Envelope */}
      <g>
        <rect x="92" y="150" width="168" height="116" rx="14" fill="#ffffff" />
        <path
          d="M92 166c0-9 7-16 16-16h136c9 0 16 7 16 16l-84 58z"
          fill="#e3efeb"
        />
        <path
          d="M92 166 176 224l84-58"
          fill="none"
          stroke="#2e6f66"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Letter peeking out */}
        <rect x="128" y="120" width="96" height="44" rx="7" fill="#fdfbf6" />
        <rect x="145" y="136" width="62" height="4" rx="2" fill="#c9a24d" />
        <rect x="145" y="147" width="40" height="4" rx="2" fill="#d9e5e1" />
      </g>

      {/* Geometric accents */}
      <circle cx="66" cy="96" r="10" fill="#c9a24d" opacity="0.9" />
      <circle
        cx="312"
        cy="214"
        r="15"
        fill="none"
        stroke="#9fc6bc"
        strokeWidth="3"
      />
      <rect
        x="286"
        y="262"
        width="20"
        height="20"
        rx="5"
        fill="#ffffff"
        opacity="0.22"
        transform="rotate(18 296 272)"
      />
      <circle cx="48" cy="232" r="6" fill="#9fc6bc" opacity="0.7" />
      <circle cx="74" cy="284" r="9" fill="#ffffff" opacity="0.9" />

      {/* Sparkles */}
      <g fill="#c9a24d">
        <path d={SPARKLE} transform="translate(292 140) scale(1.15)" />
        <path d={SPARKLE} transform="translate(60 160) scale(0.75)" />
        <path d={SPARKLE} transform="translate(214 62) scale(0.6)" />
      </g>
    </svg>
  );
}

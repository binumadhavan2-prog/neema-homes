import { SOCIAL_ICONS } from "./SocialIcons.jsx";

// The footer social row: each tile shows the platform's initial and turns to
// reveal its icon when the row is hovered, staggered along the row.
//
// Ported from the VengeanceUI "social flip button", which is written for
// Tailwind and framer-motion. This site has neither, so the flip is a CSS 3D
// transform, the sweeping lines are keyframes, and the tooltip is a hover
// state — no dependencies and the studio's own palette.
//
// Driven by the SOCIALS array, so it stays out of the page until the real
// profiles are filled in.
export default function SocialFlipButton({ items }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="social-flip">
      <div className="social-flip-row">
        <span className="social-flip-line social-flip-line--top" />
        <span className="social-flip-line social-flip-line--bottom" />

        {items.map((social, index) => (
          <a
            key={social.platform}
            className="social-flip-tile"
            style={{ "--i": index }}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`NEEMA HOMES on ${social.platform}`}
          >
            <span className="social-flip-inner">
              <span className="social-flip-face social-flip-front">
                {social.platform.charAt(0).toUpperCase()}
              </span>
              <span className="social-flip-face social-flip-back">
                {SOCIAL_ICONS[social.platform]}
              </span>
            </span>

            <span className="social-flip-label" aria-hidden="true">
              {social.platform}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

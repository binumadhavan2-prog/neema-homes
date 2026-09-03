// The app store badges under the footer's flip row. `store` picks the mark:
// "apple" or "play".
//
// Same rule as SOCIAL_FLIP: a badge without a `url` renders as a plain badge
// rather than a link, so these can sit here while the listings are on the
// way. A store button that goes nowhere is worse than one that plainly does
// not go yet.

// The Play mark is the four-winged triangle in Google's brand colours — it
// only reads as the store when it is coloured, so it does not take
// currentColor like the social icons. Apple's is a plain silhouette and does
// inherit, which keeps it legible dimmed as well as lit.
const STORE_MARKS = {
  apple: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.476-4.494 2.59-4.559-1.417-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  ),

  play: (
    <svg width="20" height="20" viewBox="0 0 24 24">
      {/* the spine, then the top, bottom and leading points */}
      <path
        d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35z"
        fill="#4285f4"
      />
      <path d="M6.05 2.66 16.81 8.88l-2.27 2.27z" fill="#34a853" />
      <path d="M16.81 15.12 6.05 21.34l8.49-8.49z" fill="#ea4335" />
      <path
        d="M20.16 10.81c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32L15.39 12l2.5-2.5z"
        fill="#fbbc04"
      />
    </svg>
  )
};

export default function StoreBadges({ items }) {
  return (
    <ul className="store-badges">
      {items.map((item) => {
        const Badge = item.url ? "a" : "div";

        return (
          <li key={item.name}>
            <Badge
              {...(item.url
                ? { href: item.url, target: "_blank", rel: "noreferrer" }
                : {})}
              className={item.url ? "store-badge" : "store-badge is-idle"}
            >
              <span className="store-badge-mark" aria-hidden="true">
                {STORE_MARKS[item.store]}
              </span>

              <span className="store-badge-text">
                <span className="store-badge-hint">{item.hint}</span>
                <span className="store-badge-name">{item.name}</span>
              </span>
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}

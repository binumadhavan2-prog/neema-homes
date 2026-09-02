import { SOCIAL_ICONS } from "./SocialIcons.jsx";

// A row of letter tiles that turn over to show social icons. Hovering
// anywhere on the row flips every tile; the per-tile delay is set from the
// index, so the word peels away left to right. The flip is a plain CSS 3D
// rotation — no animation library.
//
// An item without a `url` renders as a tile rather than a link. The studio's
// profiles are not all live yet, and a tile that goes nowhere is better than
// one pointing at an address we guessed.
export default function SocialFlipButton({ items }) {
  return (
    <ul className="flip-row">
      {items.map((item, index) => {
        const Tile = item.url ? "a" : "div";
        const isExternal = item.url && !item.url.startsWith("mailto:");

        const tileProps = item.url
          ? {
              href: item.url,
              ...(isExternal && { target: "_blank", rel: "noreferrer" })
            }
          : { role: "img" };

        return (
          <li key={item.label}>
            <Tile
              {...tileProps}
              className="flip-tile"
              style={{ "--i": index }}
              aria-label={item.label}
            >
              <span className="flip-inner">
                <span className="flip-face flip-front" aria-hidden="true">
                  {item.letter}
                </span>

                <span className="flip-face flip-back" aria-hidden="true">
                  {SOCIAL_ICONS[item.platform]}
                </span>
              </span>

              <span className="flip-tip" aria-hidden="true">
                {item.label}
              </span>
            </Tile>
          </li>
        );
      })}
    </ul>
  );
}

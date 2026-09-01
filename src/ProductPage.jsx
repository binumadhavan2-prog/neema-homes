import ActionButton from "./ActionButton.jsx";

// Shared layout for the product pages (kitchens, bedrooms). Items carry
// their own column span, so each page can set its own editorial rhythm.

export default function ProductPage({
  eyebrow,
  title,
  intro,
  items,
  renderFallback,
  ctaTitle,
  ctaText,
  ctaGlow = false,
  onCta
}) {
  return (
    <main className="product-page">
      <section className="product-intro">
        <div className="shell">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="product-intro-text">{intro}</p>
        </div>
      </section>

      <section className="product-types">
        <div className="product-grid">
          {items.map((item) => (
            <article
              className="product-card"
              key={item.id}
              style={{ gridColumn: `span ${item.span}` }}
            >
              <div
                className={
                  item.image
                    ? "product-media"
                    : "product-media product-media--drawn"
                }
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  renderFallback(item)
                )}
              </div>

              <div className="product-body">
                <h2>{item.name}</h2>
                <p>{item.description}</p>

                <span className="product-view">
                  View Designs <span aria-hidden="true">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-cta">
        <div className="shell">
          <h2>{ctaTitle}</h2>
          <p>{ctaText}</p>

          <ActionButton
            className={ctaGlow ? "btn rg-button" : "btn"}
            glow={ctaGlow}
            onAction={onCta}
          >
            Talk to Our Interior Design Team{" "}
            <span aria-hidden="true">→</span>
          </ActionButton>
        </div>
      </section>
    </main>
  );
}

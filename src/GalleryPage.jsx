import ActionButton from "./ActionButton.jsx";

// The gallery runs on the product-page photographs. Each tile opens the
// page its photograph belongs to.
const GALLERY = [
  {
    image: "/images/kitchen-l-shaped.jpg",
    name: "L-Shaped Kitchen",
    href: "#/kitchen",
    alt: "L-shaped kitchen in graphite and white handleless cabinetry with lit wall units"
  },
  {
    image: "/images/kitchen-u-shaped.jpg",
    name: "U-Shaped Kitchen",
    href: "#/kitchen",
    alt: "U-shaped kitchen in cream cabinetry with dark stone counters and a raised breakfast bar"
  },
  {
    image: "/images/dining-crockery.jpg",
    name: "Crockery Shelf",
    href: "#/dining",
    alt: "Crockery unit in dark timber with lit open shelves, a stone back panel and closed storage beneath"
  },
  {
    image: "/images/dining-bar-counter.jpg",
    name: "Bar Counter",
    href: "#/dining",
    alt: "Bar counter with stools, a stone top and lit bottle shelving behind"
  },
  {
    image: "/images/dining-wash-counter.jpg",
    name: "Wash Counter",
    href: "#/dining",
    alt: "Wash counter with a stone top, vessel basin, brass wall tap and a lit mirror above floating storage"
  },
  {
    image: "/images/bedroom-dressing.avif",
    name: "Dressing Unit",
    href: "#/bedroom",
    alt: "Dressing table with a mirror and drawers"
  }
];

export default function GalleryPage({ onBookConsultation }) {
  return (
    <main className="product-page">
      <section className="product-intro">
        <div className="shell">
          <p className="eyebrow">Gallery</p>
          <h1>A closer look</h1>
          <p className="product-intro-text">
            Kitchens, dining and storage, piece by piece. Each photograph
            opens the page it belongs to.
          </p>
        </div>
      </section>

      <section className="gallery gallery-page">
        <div className="shell">
          <div className="gallery-grid">
            {GALLERY.map((item) => (
              <a className="gallery-tile" href={item.href} key={item.image}>
                <img src={item.image} alt={item.alt} loading="lazy" />

                <span className="gallery-label">
                  <span className="gallery-name">{item.name}</span>
                  <span className="gallery-go" aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="shell">
          <h2>Design Your Space</h2>
          <p>
            Let our designers create a room that fits your space and
            lifestyle.
          </p>

          <ActionButton className="btn" onAction={onBookConsultation}>
            Talk to Our Interior Design Team <span aria-hidden="true">→</span>
          </ActionButton>
        </div>
      </section>
    </main>
  );
}

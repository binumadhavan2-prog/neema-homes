import ActionButton from "./ActionButton.jsx";
import { useCollection } from "./content.js";

// The gallery runs on the product-page photographs. Each tile opens the
// page its photograph belongs to. Kept here as the offline fallback for the
// "gallery" collection in the database.
const GALLERY = [
  {
    id: "l-shaped-kitchen",
    image: "/images/kitchen-l-shaped.jpg",
    name: "L-Shaped Kitchen",
    href: "#/kitchen",
    alt: "L-shaped kitchen in graphite and white handleless cabinetry with lit wall units"
  },
  {
    id: "u-shaped-kitchen",
    image: "/images/kitchen-u-shaped.jpg",
    name: "U-Shaped Kitchen",
    href: "#/kitchen",
    alt: "U-shaped kitchen in cream cabinetry with dark stone counters and a raised breakfast bar"
  },
  {
    id: "crockery-shelf",
    image: "/images/dining-crockery.jpg",
    name: "Crockery Shelf",
    href: "#/dining",
    alt: "Crockery unit in dark timber with lit open shelves, a stone back panel and closed storage beneath"
  },
  {
    id: "bar-counter",
    image: "/images/dining-bar-counter.jpg",
    name: "Bar Counter",
    href: "#/dining",
    alt: "Bar counter with stools, a stone top and lit bottle shelving behind"
  },
  {
    id: "wash-counter",
    image: "/images/dining-wash-counter.jpg",
    name: "Wash Counter",
    href: "#/dining",
    alt: "Wash counter with a stone top, vessel basin, brass wall tap and a lit mirror above floating storage"
  },
  {
    id: "dressing-unit",
    image: "/images/bedroom-dressing.avif",
    name: "Dressing Unit",
    href: "#/bedroom",
    alt: "Dressing table with a mirror and drawers"
  }
];

export default function GalleryPage({ onBookConsultation }) {
  const items = useCollection("gallery", GALLERY);

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
            {items
              .filter((item) => item.image)
              .map((item) => (
                <a
                  className="gallery-tile"
                  href={item.href || "#/gallery"}
                  key={item.id}
                >
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

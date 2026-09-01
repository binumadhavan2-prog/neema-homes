import KitchenPlan from "./KitchenPlan.jsx";
import ActionButton from "./ActionButton.jsx";

// Only the island kitchen has a photograph so far. The rest fall back to a
// plan diagram rather than borrowing an unrelated image — add `image` and
// `alt` to a type and the card uses the photo instead.
const KITCHENS = [
  {
    id: "island",
    name: "Island Kitchen",
    description:
      "A large central island for prep and gathering, wrapped in premium cabinetry and stone, in an open contemporary plan.",
    image: "/images/project-kitchen.jpg",
    alt: "Kitchen with a central stone-topped island and dark shaker cabinetry"
  },
  {
    id: "l-shaped",
    name: "L-Shaped Kitchen",
    description:
      "Cabinetry along two adjoining walls, turning an awkward corner into working storage. Suits apartments and villas alike.",
    image: "/images/kitchen-l-shaped.jpg",
    alt: "L-shaped kitchen in graphite and white handleless cabinetry with lit wall units"
  },
  {
    id: "parallel",
    name: "Parallel Kitchen",
    description:
      "Two facing runs of counter, keeping the cook between them. A clean, organised layout for a galley footprint."
  },
  {
    id: "straight",
    name: "Straight Kitchen",
    description:
      "A single wall of modular cabinetry, minimal and unobtrusive. The efficient answer for a compact home.",
    image: "/images/kitchen-straight.jpg",
    alt: "Single-wall kitchen in taupe cabinetry with a wood-panelled backdrop and open shelving"
  },
  {
    id: "u-shaped",
    name: "U-Shaped Kitchen",
    description:
      "Counters and storage on three sides, giving the most capacity of any layout and a work triangle within easy reach.",
    image: "/images/kitchen-u-shaped.jpg",
    alt: "U-shaped kitchen in cream cabinetry with dark stone counters and a raised breakfast bar"
  }
];

export default function KitchenPage({ onBookConsultation }) {
  return (
    <main className="kitchen-page">
      <section className="kitchen-intro">
        <div className="shell">
          <p className="eyebrow">Modular kitchens</p>
          <h1>Custom-Made Modular Kitchens</h1>
          <p className="kitchen-intro-text">
            Transform your kitchen into a space designed around your lifestyle,
            needs, and available space. We create customized modular kitchens
            for apartments, villas, and independent homes across India.
          </p>
        </div>
      </section>

      <section className="kitchen-types">
        <div className="kitchen-grid">
          {KITCHENS.map((kitchen) => (
            <article className="kitchen-card" key={kitchen.id}>
              <div
                className={
                  kitchen.image
                    ? "kitchen-media"
                    : "kitchen-media kitchen-media--plan"
                }
              >
                {kitchen.image ? (
                  <img
                    src={kitchen.image}
                    alt={kitchen.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <KitchenPlan type={kitchen.id} label={kitchen.name} />
                )}
              </div>

              <div className="kitchen-body">
                <h2>{kitchen.name}</h2>
                <p>{kitchen.description}</p>

                <span className="kitchen-view">
                  View Designs <span aria-hidden="true">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="kitchen-cta">
        <div className="shell">
          <h2>Design Your Dream Kitchen</h2>

          <p>
            Let our designers create a kitchen that perfectly fits your space
            and lifestyle.
          </p>

          <ActionButton className="btn" onAction={onBookConsultation}>
            Book a Consultation <span aria-hidden="true">→</span>
          </ActionButton>
        </div>
      </section>
    </main>
  );
}

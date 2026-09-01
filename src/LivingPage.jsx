import ProductPage from "./ProductPage.jsx";
import LivingIcon from "./LivingIcon.jsx";

// Copy written for NEEMA HOMES. The reference text supplied for this page
// belonged to another studio and named their brand and showrooms.
const LIVING = [
  {
    id: "sofas",
    name: "Sofas",
    span: 7,
    description:
      "Made or specified as part of the room rather than bought separately, in leather or fabric chosen against the floor and the walls it sits between.",
    image: "/images/hero-living.jpg",
    alt: "Living room with a long linen sofa, cane chairs and a marble coffee table"
  },
  {
    id: "display-unit",
    name: "Display Unit",
    span: 5,
    description:
      "The wall the room faces. Screen, storage and lit shelving detailed as a single run, with equipment and cabling concealed.",
    image: "/images/service-furniture-design.jpg",
    alt: "Built-in media unit in oak and grey with lit display shelving"
  },
  {
    id: "centre-table",
    name: "Centre Table",
    span: 5,
    description:
      "Sized to the sofa and to the walkway around it, in timber, stone or both, so it suits the room rather than the showroom floor."
  },
  {
    id: "bookshelves",
    name: "Bookshelves",
    span: 7,
    description:
      "Built floor to ceiling for books, objects and frames, with closed storage below for what should not be on show.",
    image: "/images/project-study.jpg",
    alt: "Black built-in bookshelves with closed storage beneath and a solid walnut desk"
  },
  {
    id: "partition",
    name: "Living–Dining Partition",
    span: 12,
    description:
      "A screen that keeps the dining table out of direct view while staying open to the light, often doubling as display."
  },
  {
    id: "prayer-unit",
    name: "Prayer Unit",
    span: 6,
    description:
      "A shrine planned into the living room where a separate room is not possible, in carved timber and brass, detailed to the room's palette.",
    image: "/images/project-pooja.jpg",
    alt: "Carved teak mandir on a raised stone plinth flanked by standing brass lamps"
  },
  {
    id: "chairs",
    name: "Chairs",
    span: 6,
    description:
      "Occasional chairs made or chosen to work with the sofa without matching it, so the seating reads as a group rather than a set."
  },
  {
    id: "shoe-rack",
    name: "Shoe Rack",
    span: 12,
    description:
      "Storage at the entrance sized to the wall beside the door, closed and vented, so the foyer stays clear."
  }
];

export default function LivingPage({ onBookConsultation }) {
  return (
    <ProductPage
      eyebrow="Living rooms"
      title="Custom-Made Living Rooms"
      intro="The living room takes the most furniture and the most compromise — a sofa from one shop, a display unit from another, a partition added later. NEEMA HOMES draws the room as one set of pieces in one palette, so the sofa, shelving, partition and prayer unit belong to each other rather than merely sharing a floor."
      items={LIVING}
      renderFallback={(item) => <LivingIcon type={item.id} label={item.name} />}
      ctaTitle="Design Your Dream Living Room"
      ctaText="Let our designers plan a living room where every piece is drawn to the same brief."
      onCta={onBookConsultation}
    />
  );
}

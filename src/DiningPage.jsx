import ProductPage from "./ProductPage.jsx";
import DiningIcon from "./DiningIcon.jsx";

// Copy written for NEEMA HOMES. The reference text supplied for this page
// belonged to another studio and named their brand and branches.
const DINING = [
  {
    id: "dining-table",
    name: "Dining Table",
    span: 7,
    description:
      "The piece the room is planned around. Tops in solid timber, stone or glass, sized to the number of chairs you actually seat rather than to a standard length.",
    image: "/images/project-dining.jpg",
    alt: "Dining room with a solid teak table, cane-back chairs and a tiered brass pendant"
  },
  {
    id: "crockery-shelf",
    name: "Crockery Shelf",
    span: 5,
    description:
      "Display and storage in one run — lit shelving above for the pieces you want seen, closed below for the ones you do not.",
    image: "/images/dining-crockery.jpg",
    alt: "Crockery unit in dark timber with lit open shelves, a stone back panel and closed storage beneath"
  },
  {
    id: "bar-counter",
    name: "Bar Counter",
    span: 5,
    description:
      "Worked into the dining room rather than added to it, with bottle storage, glass racks and a top carrying the same stone as the kitchen.",
    image: "/images/dining-bar-counter.jpg",
    alt: "Bar counter with stools, a stone top and lit bottle shelving behind"
  },
  {
    id: "dining-chair",
    name: "Dining Chair",
    span: 7,
    description:
      "Made to the table rather than bought to it, so height, reach and finish match the room instead of approximating it.",
    image: "/images/dining-chair.webp",
    alt: "Upholstered dining chairs on slim black legs around a round dark timber table"
  },
  {
    id: "wash-counter",
    name: "Wash Counter",
    span: 12,
    description:
      "The wash point treated as part of the room: a counter, storage beneath and a mirror, finished to match rather than left as an afterthought.",
    image: "/images/dining-wash-counter.jpg",
    alt: "Wash counter with a stone top, vessel basin, brass wall tap and a lit mirror above floating storage"
  }
];

export default function DiningPage({ onBookConsultation }) {
  return (
    <ProductPage
      eyebrow="Dining rooms"
      title="Custom-Made Dining Rooms"
      intro="Dining rooms are usually assembled from separately bought pieces, and it shows. NEEMA HOMES draws the table, chairs, crockery shelf and wash counter together, in one set of materials, so the room reads as one room — and sits properly against the kitchen it opens onto."
      items={DINING}
      renderFallback={(item) => <DiningIcon type={item.id} label={item.name} />}
      ctaTitle="Design Your Dream Dining Room"
      ctaText="Let our designers plan a dining room that works with the kitchen beside it."
      onCta={onBookConsultation}
    />
  );
}

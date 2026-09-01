import ProductPage from "./ProductPage.jsx";
import DecorIcon from "./DecorIcon.jsx";

// Copy written for NEEMA HOMES. The reference text supplied for this page
// belonged to another studio, named their showrooms, and made material
// claims about their own products that are not ours to repeat.
const DECOR = [
  {
    id: "display-units",
    name: "Display Units",
    span: 7,
    description:
      "A lit wall for the pieces worth showing — glass, ceramics, books — with a stone or timber back panel and closed storage carrying the rest.",
    image: "/images/dining-crockery.jpg",
    alt: "Display unit in dark timber with lit open shelves and a stone back panel"
  },
  {
    id: "open-shelves",
    name: "Open Shelves",
    span: 5,
    description:
      "Set into a niche or run along a wall, in solid timber or slim steel, spaced for what you actually put on them rather than to a standard pitch."
  },
  {
    id: "cabinets",
    name: "Cabinets",
    span: 12,
    description:
      "Closed storage detailed to disappear: handleless fronts, grain matched across the run, and a top that continues the line of the room."
  }
];

export default function DecorPage({ onBookConsultation }) {
  return (
    <ProductPage
      eyebrow="Decorative units"
      title="Custom-Made Decorative Units"
      intro="Decorative units are what make a room feel finished — the lit display wall, the run of open shelving, the cabinet that hides what should not be seen. NEEMA HOMES builds them to the wall they stand on, in materials chosen against the rest of the room, so they read as part of the architecture rather than furniture pushed up against it."
      items={DECOR}
      renderFallback={(item) => <DecorIcon type={item.id} label={item.name} />}
      ctaTitle="Design Your Dream Interiors"
      ctaText="Let our designers work the display and storage into the room from the start."
      onCta={onBookConsultation}
    />
  );
}

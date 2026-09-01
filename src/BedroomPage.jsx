import ProductPage from "./ProductPage.jsx";
import BedroomIcon from "./BedroomIcon.jsx";

// Copy written for NEEMA HOMES. The reference text supplied for this page
// belonged to another studio and named their brand and branches.
const BEDROOM = [
  {
    id: "bed",
    name: "Bed",
    span: 7,
    description:
      "Built to the room rather than to a standard size — headboard, storage base and side tables drawn as one piece, in a finish chosen with the rest of the room.",
    image: "/images/project-bedroom.jpg",
    alt: "Bedroom with a slatted oak headboard wall, linen bedding and a brass wall light"
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    span: 5,
    description:
      "Floor-to-ceiling storage planned around what you own: hanging, shelving and drawers laid out to suit, with lit rails and soft-close throughout.",
    image: "/images/project-wardrobe.jpg",
    alt: "Walk-in wardrobe in dark oak with lit shelving and a stone-topped island"
  },
  {
    id: "dressing",
    name: "Dressing Unit",
    span: 12,
    description:
      "Freestanding or run into the wardrobe, sized to the wall it sits on, with a lit mirror and drawers where you reach for them."
  }
];

export default function BedroomPage({ onBookConsultation }) {
  return (
    <ProductPage
      eyebrow="Bedrooms"
      title="Custom-Made Bedrooms"
      intro="The bedroom is the room you spend the most hours in, and the one most often furnished last. NEEMA HOMES designs and builds the pieces that fill it — bed, wardrobe and dressing unit — to the dimensions of your room rather than to a catalogue size."
      items={BEDROOM}
      renderFallback={(item) => (
        <BedroomIcon type={item.id} label={item.name} />
      )}
      ctaTitle="Design Your Dream Bedroom"
      ctaText="Let our designers plan a bedroom around how you actually use the room."
      onCta={onBookConsultation}
    />
  );
}

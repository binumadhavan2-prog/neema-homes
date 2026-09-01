import ProductPage from "./ProductPage.jsx";
import KidsIcon from "./KidsIcon.jsx";

// Copy written for NEEMA HOMES. The reference text supplied for this page
// belonged to another studio.
const KIDS = [
  {
    id: "bed",
    name: "Bed",
    span: 7,
    description:
      "Single, bunk or storage beds built to the room, with drawers underneath and rails detailed into the frame rather than added on.",
    image: "/images/kids-bed.jpg",
    alt: "Teal and white bunk bed with a guard rail, drawers under the lower bed, integrated shelving and boxed steps to the top bunk"
  },
  {
    id: "study-unit",
    name: "Study Unit",
    span: 5,
    description:
      "Desk, shelving and task light planned as one piece, at a height that suits the child now and can be raised as they grow.",
    image: "/images/kids-study-unit.webp",
    alt: "Pale oak children's desk with a drawer, flanked by tall towers of open shelving and closed cupboards"
  },
  {
    id: "wardrobe-study",
    name: "Wardrobe Cum Study Table",
    span: 12,
    description:
      "Wardrobe and desk in a single run, which frees the floor for everything else the room has to do.",
    image: "/images/kids-wardrobe-study.jpg",
    alt: "Cream wardrobe run with slim black handles and loft cabinets above, continuing into a built-in desk with lit shelves"
  }
];

export default function KidsPage({ onBookConsultation }) {
  return (
    <ProductPage
      eyebrow="Kids rooms"
      title="Custom-Made Kids Rooms"
      intro="A child's room works harder than any other: sleeping, playing, homework and storage in the same few square metres, and it has to keep working as they grow. NEEMA HOMES plans them around that — beds with storage beneath, study space suited to the age they are now, and joinery sized to be added to rather than replaced."
      items={KIDS}
      renderFallback={(item) => <KidsIcon type={item.id} label={item.name} />}
      ctaTitle="Design Your Child's Room"
      ctaText="Let our designers plan a room that keeps up with them."
      onCta={onBookConsultation}
    />
  );
}

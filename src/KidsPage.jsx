import ProductPage from "./ProductPage.jsx";
import KidsIcon from "./KidsIcon.jsx";
import { useCollection } from "./content.js";

// Copy written for NEEMA HOMES. The reference text supplied for this page
// belonged to another studio. No photographs of a kids' room exist yet, so
// every card here falls back to a drawing.
const KIDS = [
  {
    id: "bed",
    name: "Bed",
    span: 7,
    description:
      "Single, bunk or storage beds built to the room, with drawers underneath and rails detailed into the frame rather than added on."
  },
  {
    id: "study-unit",
    name: "Study Unit",
    span: 5,
    description:
      "Desk, shelving and task light planned as one piece, at a height that suits the child now and can be raised as they grow."
  },
  {
    id: "wardrobe-study",
    name: "Wardrobe Cum Study Table",
    span: 12,
    description:
      "Wardrobe and desk in a single run, which frees the floor for everything else the room has to do."
  }
];

export default function KidsPage({ onBookConsultation }) {
  // Database rows when they load; the array above is the offline fallback.
  const items = useCollection("kids", KIDS);

  return (
    <ProductPage
      eyebrow="Kids rooms"
      title="Custom-Made Kids Rooms"
      intro="A child's room works harder than any other: sleeping, playing, homework and storage in the same few square metres, and it has to keep working as they grow. NEEMA HOMES plans them around that — beds with storage beneath, study space suited to the age they are now, and joinery sized to be added to rather than replaced."
      items={items}
      renderFallback={(item) => <KidsIcon type={item.id} label={item.name} />}
      ctaTitle="Design Your Child's Room"
      ctaText="Let our designers plan a room that keeps up with them."
      onCta={onBookConsultation}
    />
  );
}

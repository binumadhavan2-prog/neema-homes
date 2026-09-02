import ProductPage from "./ProductPage.jsx";
import KitchenPlan from "./KitchenPlan.jsx";
import { useCollection } from "./content.js";

// Every type has a photograph now; the plan diagram stays as the fallback
// for any type added later without one.
const KITCHENS = [
  {
    id: "island",
    name: "Island Kitchen",
    span: 7,
    description:
      "A large central island for prep and gathering, wrapped in premium cabinetry and stone, in an open contemporary plan.",
    image: "/images/project-kitchen.jpg",
    alt: "Kitchen with a central stone-topped island and dark shaker cabinetry"
  },
  {
    id: "l-shaped",
    name: "L-Shaped Kitchen",
    span: 5,
    description:
      "Cabinetry along two adjoining walls, turning an awkward corner into working storage. Suits apartments and villas alike.",
    image: "/images/kitchen-l-shaped.jpg",
    alt: "L-shaped kitchen in graphite and white handleless cabinetry with lit wall units"
  },
  {
    id: "parallel",
    name: "Parallel Kitchen",
    span: 5,
    description:
      "Two facing runs of counter, keeping the cook between them. A clean, organised layout for a galley footprint.",
    image: "/images/kitchen-parallel.jpg",
    alt: "Parallel kitchen with facing timber counter runs, marble splashback and pendant lighting"
  },
  {
    id: "straight",
    name: "Straight Kitchen",
    span: 7,
    description:
      "A single wall of modular cabinetry, minimal and unobtrusive. The efficient answer for a compact home.",
    image: "/images/kitchen-straight.jpg",
    alt: "Single-wall kitchen in taupe cabinetry with a wood-panelled backdrop and open shelving"
  },
  {
    id: "u-shaped",
    name: "U-Shaped Kitchen",
    span: 12,
    description:
      "Counters and storage on three sides, giving the most capacity of any layout and a work triangle within easy reach.",
    image: "/images/kitchen-u-shaped.jpg",
    alt: "U-shaped kitchen in cream cabinetry with dark stone counters and a raised breakfast bar"
  }
];

export default function KitchenPage({ onBookConsultation }) {
  // Database rows when they load; the array above is the offline fallback.
  const items = useCollection("kitchen", KITCHENS);

  return (
    <ProductPage
      eyebrow="Modular kitchens"
      title="Custom-Made Modular Kitchens"
      intro="Transform your kitchen into a space designed around your lifestyle, needs, and available space. We create customized modular kitchens for apartments, villas, and independent homes across India."
      items={items}
      renderFallback={(item) => (
        <KitchenPlan type={item.id} label={item.name} />
      )}
      ctaTitle="Design Your Dream Kitchen"
      ctaText="Let our designers create a kitchen that perfectly fits your space and lifestyle."
      ctaGlow
      onCta={onBookConsultation}
    />
  );
}

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SERVICE_ICONS } from "./ServiceIcons.jsx";
import ContactIllustration from "./ContactIllustration.jsx";
import CalculatorPage from "./CalculatorPage.jsx";
import { submitEnquiry } from "./enquiries.js";
import ActionButton from "./ActionButton.jsx";
import FingerprintSpinner from "./FingerprintSpinner.jsx";
import WhatsAppLink from "./WhatsAppLink.jsx";
import CallSpinner from "./CallSpinner.jsx";
import NavDropdown from "./NavDropdown.jsx";
import KitchenPage from "./KitchenPage.jsx";
import BedroomPage from "./BedroomPage.jsx";
import DiningPage from "./DiningPage.jsx";
import LivingPage from "./LivingPage.jsx";
import DecorPage from "./DecorPage.jsx";
import KidsPage from "./KidsPage.jsx";
import GalleryPage from "./GalleryPage.jsx";
import MessageBox from "./MessageBox.jsx";
import HeroSlider from "./HeroSlider.jsx";
import SocialFlipButton from "./SocialFlipButton.jsx";
import ScrollFloat from "./ScrollFloat.jsx";
import FaqAccordion from "./FaqAccordion.jsx";
import StoreBadges from "./StoreBadges.jsx";
import TermsPage from "./TermsPage.jsx";
import NeonReveal from "./NeonReveal.jsx";

const WHAT_WE_DO = [
  { label: "Customised Interior", href: "#services" },
  { label: "Our Portfolio", href: "#portfolio" }
];

const PRODUCTS = [
  { label: "Kitchen", href: "#/kitchen" },
  { label: "Bedroom", href: "#/bedroom" },
  { label: "Dining Room", href: "#/dining" },
  { label: "Living Room", href: "#/living" },
  { label: "Decorative Units", href: "#/decor" },
  { label: "Kids Room", href: "#/kids" }
];

// Tiny hash router: "#/name" is a page, every other hash is an anchor on the
// home page. Avoids pulling in a router for a handful of routes.
const PAGES = {
  "#/kitchen": "kitchen",
  "#/bedroom": "bedroom",
  "#/dining": "dining",
  "#/living": "living",
  "#/decor": "decor",
  "#/kids": "kids",
  "#/gallery": "gallery",
  "#/calculator": "calculator",
  "#/terms": "terms"
};

const readRoute = () => PAGES[window.location.hash] ?? "home";

const SERVICES = [
  {
    number: "01",
    icon: "interior-design",
    image: "/images/service-interior-design.jpg",
    imageAlt: "Living room with built-in shelving opening onto a garden",
    title: "Interior Design",
    description: "Modern and elegant home interior designs."
  },
  {
    number: "02",
    icon: "space-planning",
    image: "/images/service-space-planning.jpg",
    imageAlt: "A colour-rendered floor plan being marked up by hand",
    title: "Space Planning",
    description: "Smart layouts to maximize comfort and functionality."
  },
  {
    number: "03",
    icon: "furniture-design",
    image: "/images/service-furniture-design.jpg",
    imageAlt: "A built-in media unit in oak and grey with lit display shelving",
    title: "Furniture Design",
    description: "Custom furniture that suits your lifestyle."
  }
];

// Each residence is one home; the rooms below it are spaces within it.
const RESIDENCES = [
  {
    name: "The Adyar Residence",
    locality: "Adyar",
    rooms: [
      {
        title: "Arched Foyer",
        caption: "Lime plaster · Teak · Jute",
        image: "/images/project-foyer.jpg",
        description:
          "A plastered entry hall framed by a black arched doorway, with a jute runner over dark timber and cane-fronted storage running the length of one wall."
      },
      {
        title: "Library Study",
        caption: "Black shelving · Walnut · Limestone",
        image: "/images/project-study.jpg",
        description:
          "Black built-in shelving and closed storage set against a solid walnut desk, a brass task lamp and full-height linen curtains."
      },
      {
        title: "Balcony Garden",
        caption: "Timber deck · Rattan · Terracotta",
        image: "/images/project-balcony.jpg",
        description:
          "Timber decking and a rattan lounger set among frangipani and palms, with a terrazzo side table against a cast-iron railing."
      }
    ]
  },
  {
    name: "The Kilpauk Residence",
    locality: "Kilpauk",
    rooms: [
      {
        title: "Dark Timber Kitchen",
        caption: "Shaker joinery · Stone · Brass",
        image: "/images/project-kitchen.jpg",
        description:
          "Near-black shaker cabinetry with brass cup pulls and pale stone counters, set off by a fluted-glass dresser beside the window."
      },
      {
        title: "Travertine Bathroom",
        caption: "Travertine · Fluted wood · Brass",
        image: "/images/project-bath.jpg",
        description:
          "Full-height travertine behind a solid stone tub, paired with a fluted wood vanity, dark stone top and unlacquered brass fittings."
      }
    ]
  },
  {
    name: "The Besant Nagar Residence",
    locality: "Besant Nagar",
    rooms: [
      {
        title: "Slatted Oak Bedroom",
        caption: "Slatted oak · Linen · Brass",
        image: "/images/project-bedroom.jpg",
        description:
          "A slatted oak headboard wall with a brass swing-arm light, layered linen bedding and sheer curtains that keep the light soft and even."
      },
      {
        title: "Walk-in Wardrobe",
        caption: "Dark oak · Stone · Leather",
        image: "/images/project-wardrobe.jpg",
        description:
          "Dark-stained joinery with lit shelving and a stone-topped island, finished with a leather bench and a glazed door to the garden."
      }
    ]
  },
  {
    name: "The Alwarpet Residence",
    locality: "Alwarpet",
    rooms: [
      {
        title: "Dining Room",
        caption: "Charcoal walls · Teak · Cane",
        image: "/images/project-dining.jpg",
        description:
          "A charcoal feature wall and tiered brass pendant over a solid teak table with cane-back chairs, opening through an arch to the living room."
      },
      {
        title: "Pooja Room",
        caption: "Carved teak · Brass · Marble",
        image: "/images/project-pooja.jpg",
        description:
          "A carved teak mandir on a raised stone plinth, flanked by standing brass lamps and hanging bells, lit by a sheer-curtained window."
      }
    ]
  }
];

// `imageHover` is the second view of the same room, cross-faded in on hover.
// Optional — without it the photo simply sits still.
const INTERIORS = [
  {
    title: "Reading Nook",
    caption: "Teak panelling · Linen · Brass",
    image: "/images/project-nook.jpg",
    description:
      "A window seat set into teak panelling, with a fluted base, a linen bolster and a brass side table turned to the trees outside."
  },
  {
    title: "Powder Room",
    caption: "Dark marble · Walnut · Brass",
    image: "/images/project-powder.jpg",
    description:
      "A single veined marble slab behind a round mirror, with a floating walnut vanity, stone counter and unlacquered brass fittings."
  }
];

// The questions the studio is asked before a project starts. The starting
// prices below are the studio's published figures for modular interiors in
// a new home — keep them in step with the calculator's rates in Supabase,
// which is the other place the site quotes money.
const FAQS = [
  {
    question: "Where should I start while designing a home?",
    answer:
      "The first step of your interior design journey is finding the right inspiration. With our design ideas, you can explore a bunch of different options before you find the one that matches your personality. From master bedrooms to foyers to home offices and balconies, we’ve curated design ideas for every room of your dream house. Once you have zeroed in on the style elements, the next step is to find the perfect interior designer who can help make your dream home a reality."
  },
  {
    question: "What types of rooms are covered under home interior design ideas?",
    answer:
      "Interior design ideas typically cover all key areas of a home, including kitchens, bedrooms, living rooms, dining areas, bathrooms, and balconies, helping you design every space cohesively."
  },
  {
    question: "Are these interior design ideas customisable for my home?",
    answer:
      "Yes, most design ideas can be customised based on your room dimensions, colour preferences, materials, and storage needs. Interior designers can adapt these inspirations to suit your specific requirements."
  },
  {
    question: "What are the latest trends in home interior design?",
    answer:
      "Current trends focus on functional layouts, minimal clutter, neutral colour palettes, and smart storage solutions. Styles like modern, Scandinavian, and minimalist interiors are especially popular in Indian homes."
  },
  {
    question: "How much does it cost to implement interior design ideas in India?",
    answer:
      "The cost depends on factors like home size, materials, and scope of work. Following are the standard costs for the respective types of project:",
    prices: [
      { label: "1 BHK", value: "Starting at ₹3.62L*" },
      { label: "2 BHK", value: "Starting at ₹4.52L*" },
      { label: "3 BHK", value: "Starting at ₹5.57L*" },
      { label: "4 BHK", value: "Starting at ₹6.33L*" },
      { label: "Modular Kitchens", value: "Starting at ₹1.7L*" }
    ],
    note: "*The prices include only modular interiors for new homes."
  }
];

// The studio's own numbers, and nothing else. Fill in a `value` and that
// tile appears; leave it empty and it stays out, so the section can never
// show a figure NEEMA HOMES has not earned. If a slot does not apply,
// delete the row rather than inventing something for it.
//
// `note` is for a claim that needs a qualifier — a warranty period, say,
// which is a promise to a client and must match what the quotation says.
// Shape: { value, label, note }
const WHY_US = [
  { value: "", label: "Homes completed" },
  { value: "", label: "Years designing in Chennai" },
  { value: "", label: "Designers on the team" },
  { value: "", label: "Checks before handover" },
  { value: "", label: "Localities delivered in" },
  { value: "", label: "Warranty on our modular work", note: "" }
];

// Real client quotes only — add entries as they come in and the section
// appears on its own. Shape: { quote, name, residence }
const TESTIMONIALS = [];

// Swap in the studio's street address and the map recentres on it.
const STUDIO_LOCATION = "Chennai, Tamil Nadu, India";

// Single source for the phone number: shown in contact and the footer, and
// stripped to digits for the WhatsApp link. Change it here only.
const STUDIO_PHONE = "+91 98765 43210";

// Shown in the contact panel and the footer, and used for the email tile
// in the footer flip row. Change it here only.
const STUDIO_EMAIL = "info@neemahomes.com";

const whatsappHref = `https://wa.me/${STUDIO_PHONE.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(
  "Hello NEEMA HOMES, I would like to discuss an interior design project."
)}`;

// The seven tiles in the footer: their letters spell CONTACT, and each
// turns over to the platform's icon. `platform` must match a key in
// SOCIAL_ICONS. A tile with no `url` is rendered as a plain tile, so fill
// these in as the profiles go live rather than leaving a link pointing
// nowhere.
const SOCIAL_FLIP = [
  { letter: "C", platform: "instagram", label: "Instagram", url: "" },
  { letter: "O", platform: "facebook", label: "Facebook", url: "" },
  { letter: "N", platform: "linkedin", label: "LinkedIn", url: "" },
  { letter: "T", platform: "youtube", label: "YouTube", url: "" },
  { letter: "A", platform: "pinterest", label: "Pinterest", url: "" },
  { letter: "C", platform: "whatsapp", label: "WhatsApp", url: whatsappHref },
  { letter: "T", platform: "email", label: "Email", url: `mailto:${STUDIO_EMAIL}` }
];

// The two store badges under the flip row. Fill in `url` as each listing
// goes live — until then the badge renders as a plain badge rather than a
// link, the same way an unfilled social tile does.
const APP_STORES = [
  { store: "play", hint: "Get it on", name: "Google Play", url: "" },
  { store: "apple", hint: "Download on the", name: "App Store", url: "" }
];

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  STUDIO_LOCATION
)}&output=embed`;

const mapLinkSrc = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STUDIO_LOCATION
)}`;

// What the Contact arrow drops down. These are details, not destinations,
// so each one opens the thing it names: the number dials, the address goes
// to the map, the email opens a draft. All three read from the constants
// above, so the nav can never drift from the contact panel and footer.
const CONTACT_DETAILS = [
  {
    hint: "Phone",
    label: STUDIO_PHONE,
    href: `tel:${STUDIO_PHONE.replace(/\s/g, "")}`
  },
  { hint: "Location", label: "Chennai", href: mapLinkSrc },
  { hint: "Email", label: STUDIO_EMAIL, href: `mailto:${STUDIO_EMAIL}` }
];

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The three rooms behind the hero. The frames themselves are decorative —
// the heading sits over them — so `label` is there to name each slide on
// its button.
const HERO_SLIDES = [
  { image: "/images/hero-living.jpg", label: "Living Room" },
  { image: "/images/project-dining.jpg", label: "Dining Room" },
  { image: "/images/project-bedroom.jpg", label: "Slatted Oak Bedroom" }
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
};

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [hasConsented, setHasConsented] = useState(false);
  // The three short fields were uncontrolled; they have to be readable to be
  // submitted.
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [contactError, setContactError] = useState("");
  const [route, setRoute] = useState(readRoute);
  const submitTimer = useRef(null);

  useEffect(() => () => clearTimeout(submitTimer.current), []);

  // The browser jumps on hashchange before React swaps the page in, so an
  // anchor arrived at from the kitchen page needs scrolling again after.
  useEffect(() => {
    const onHashChange = () => {
      const next = readRoute();
      setRoute(next);

      if (next !== "home") {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      const id = window.location.hash.slice(1);
      if (id) {
        setTimeout(() => scrollToSection(id), 0);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Land on the contact card, from wherever the visitor is. The header rides
  // above every route, and the contact section only exists on the home page,
  // so anywhere else has to go home first and let the hashchange handler
  // scroll once the page is in.
  const bookConsultation = () => {
    if (route === "home") {
      scrollToSection("contact");
    } else {
      window.location.hash = "#contact";
    }
  };

  // Hold the loader until the images are in, with a floor on the duration so
  // it settles rather than flashing on a warm cache.
  useEffect(() => {
    const MINIMUM_MS = 700;
    const startedAt = performance.now();
    let timer;

    const finish = () => {
      const remaining = MINIMUM_MS - (performance.now() - startedAt);
      timer = setTimeout(() => setIsLoading(false), Math.max(0, remaining));
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, []);

  // Escape closes the project view
  useEffect(() => {
    if (!selectedProject) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  // Nothing should scroll behind the loader
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // One listener drives both the header state and the back-to-top button.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 80);
      setShowScrollTop(y > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={isLoading ? "loader" : "loader is-done"}
        role="status"
        aria-label="Loading"
        aria-hidden={!isLoading}
      >
        <img className="loader-mark" src="/images/logo-symbol.png" alt="" />

        <span className="loader-track" aria-hidden="true">
          <span className="loader-bar" />
        </span>
      </div>

      <header
        className={[
          "header",
          isScrolled ? "is-scrolled" : "",
          route !== "home" ? "is-kitchen" : ""
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="logo">
          <img src="/images/logo-horizontal.png" alt="NEEMA HOMES" />
        </div>

        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li>
              <NavDropdown
                label="What We Do"
                href="#services"
                options={WHAT_WE_DO}
              />
            </li>
            <li>
              <NavDropdown
                label="Products"
                href="#services"
                options={PRODUCTS}
              />
            </li>
            <li><a href="#about">About</a></li>
            <li><a href="#/gallery">Gallery</a></li>
            <li>
              <a className="nav-calc" href="#/calculator">
                Price Calculator
              </a>
            </li>
            {TESTIMONIALS.length > 0 && (
              <li><a href="#testimonials">Testimonials</a></li>
            )}
            <li><a href="#faq">FAQs</a></li>
            <li>
              <NavDropdown
                label="Contact"
                href="#contact"
                options={CONTACT_DETAILS}
                align="right"
              />
            </li>
          </ul>
        </nav>

        <ActionButton
          className="btn"
          onAction={bookConsultation}
          spinner={<CallSpinner />}
        >
          Enquire Now
        </ActionButton>
      </header>

      {route === "kitchen" ? (
        <KitchenPage onBookConsultation={bookConsultation} />
      ) : route === "bedroom" ? (
        <BedroomPage onBookConsultation={bookConsultation} />
      ) : route === "dining" ? (
        <DiningPage onBookConsultation={bookConsultation} />
      ) : route === "living" ? (
        <LivingPage onBookConsultation={bookConsultation} />
      ) : route === "decor" ? (
        <DecorPage onBookConsultation={bookConsultation} />
      ) : route === "kids" ? (
        <KidsPage onBookConsultation={bookConsultation} />
      ) : route === "gallery" ? (
        <GalleryPage onBookConsultation={bookConsultation} />
      ) : route === "calculator" ? (
        <CalculatorPage />
      ) : route === "terms" ? (
        <TermsPage email={STUDIO_EMAIL} phone={STUDIO_PHONE} />
      ) : (
      <>
      <section id="home" className="hero">
        <HeroSlider slides={HERO_SLIDES} />

        <div className="hero-inner">
        <div className="hero-content">
          <p className="eyebrow">Neema Homes · Chennai</p>

          <h1>Premium Residential Interior Design</h1>

          <p>
            Creating beautiful, functional homes that reflect your lifestyle.
          </p>

          <div className="hero-actions">
            <ActionButton
              className="hero-btn"
              onAction={() => scrollToSection("portfolio")}
            >
              Explore Our Work <span aria-hidden="true">→</span>
            </ActionButton>

            <ActionButton
              className="ghost-btn"
              onAction={() => scrollToSection("contact")}
            >
              Contact Us
            </ActionButton>
          </div>
        </div>
        </div>

        <button
          className={isScrolled ? "hero-scroll is-hidden" : "hero-scroll"}
          onClick={() => scrollToSection("about")}
          aria-label="Scroll to the next section"
          tabIndex={isScrolled ? -1 : 0}
        >
          <span className="hero-scroll-label">Scroll</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </button>
      </section>

      <section id="about" className="about">
        <div className="about-panel">
          <div className="about-media">
            <img
              src="/images/materials.jpg"
              alt="Oak, travertine, brass and linen material samples"
            />
          </div>

          <div className="about-copy">
            <p className="eyebrow">About the studio</p>

            <h2>A studio built around how you actually live</h2>

            <p>
              NEEMA HOMES is a premium residential interior design studio based
              in Chennai. We create elegant and functional living spaces
              tailored to every client.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">What we do</p>
            <h2>Our Services</h2>
          </div>
        </div>

        <div className="service-container">
          {SERVICES.map((service) => (
            <div className="service-card" key={service.number}>
              {service.image && (
                <div className="service-media">
                  <img src={service.image} alt={service.imageAlt} />
                </div>
              )}

              <div className="service-head">
                <span className="service-icon" aria-hidden="true">
                  {SERVICE_ICONS[service.icon]}
                </span>

                <span className="service-number">{service.number}</span>
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="interiors">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Inside our work</p>
            <h2>Details from our interiors</h2>
          </div>

          <div className="interiors-grid">
            {INTERIORS.map((room) => (
              <figure className="interior-figure" key={room.title}>
                <div className="interior-media">
                  <img src={room.image} alt={room.title} />

                  {room.imageHover && (
                    <img
                      className="interior-hover"
                      src={room.imageHover}
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                </div>

                <figcaption>
                  <h3>{room.title}</h3>
                  <p className="interior-caption">{room.caption}</p>
                  <p>{room.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio">
        <div className="portfolio-head">
          <NeonReveal>
            <div className="section-head">
              <p className="eyebrow">Featured</p>
              <h2>Our Portfolio</h2>
              <p>
                A selection of our completed residential interiors across
                Chennai.
              </p>
            </div>
          </NeonReveal>
        </div>

        {RESIDENCES.map((residence) => (
          <div className="residence" key={residence.name}>
            <div className="residence-head">
              <h3>{residence.name}</h3>
              <span className="residence-meta">
                {residence.locality} · {residence.rooms.length} rooms
              </span>
            </div>

            <div className="portfolio-grid">
              {residence.rooms.map((room) => (
                <div
                  className="portfolio-card"
                  key={room.title}
                  onClick={() =>
                    setSelectedProject({ ...room, residence: residence.name })
                  }
                >
                  <div className="portfolio-media">
                    {/* Inside the media frame, not around it: the frame owns
                        the hover shadow, and a clipping wrapper outside it
                        would cut that shadow off. */}
                    <NeonReveal>
                      <img src={room.image} alt={room.title} />
                    </NeonReveal>
                  </div>

                  <div className="portfolio-info">
                    <h3>{room.title}</h3>
                    <p>{room.caption}</p>

                    <button className="view-project">
                      View Project <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Project Details */}
        {selectedProject && (
          <div
            className="project-modal"
            onClick={(event) => {
              // Only a click on the backdrop itself, not the panel
              if (event.target === event.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <div className="project-modal-content">
              <button
                className="close-project"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>

              <img src={selectedProject.image} alt={selectedProject.title} />

              <div className="project-modal-copy">
                <p className="modal-residence">{selectedProject.residence}</p>

                <h2>{selectedProject.title}</h2>

                <p>{selectedProject.description}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {WHY_US.some((stat) => stat.value) && (
        <section id="why-us" className="why-us">
          <div className="shell">
            <div className="section-head">
              <p className="eyebrow">Why choose us</p>
              <h2>What we bring to your home</h2>
            </div>

            <div className="why-us-grid">
              {WHY_US.filter((stat) => stat.value).map((stat) => (
                <div className="why-us-stat" key={stat.label}>
                  <p className="why-us-value">{stat.value}</p>
                  <p className="why-us-label">{stat.label}</p>
                  {stat.note && <p className="why-us-note">{stat.note}</p>}
                </div>
              ))}
            </div>

            <ActionButton className="btn" onAction={bookConsultation}>
              Book a Consultation
            </ActionButton>
          </div>
        </section>
      )}

      {TESTIMONIALS.length > 0 && (
        <section id="testimonials" className="testimonials">
          <div className="shell">
            <div className="section-head">
              <p className="eyebrow">What our clients say</p>
              <h2>Testimonials</h2>
            </div>

            <div className="testimonial-grid">
              {TESTIMONIALS.map((testimonial) => (
                <figure className="testimonial-card" key={testimonial.name}>
                  <blockquote>{testimonial.quote}</blockquote>

                  <figcaption>
                    <span className="testimonial-name">
                      {testimonial.name}
                    </span>

                    {testimonial.residence && (
                      <span className="testimonial-residence">
                        {testimonial.residence}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="contact">
        <div className="contact-card">
          <div className="contact-form-panel">
            <h2>Let's Talk About Your Project</h2>

            <p className="contact-sub">
              Tell us about your home and we will be in touch.
            </p>

            <form
              className="contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                if (isSubmitting) return;

                setIsSubmitting(true);
                setContactError("");

                // Same beat as ActionButton, so the click registers
                const [{ error: submitError }] = await Promise.all([
                  submitEnquiry({
                    source: "home",
                    name: contact.name,
                    phone: contact.phone,
                    email: contact.email,
                    message,
                    consented: hasConsented
                  }),
                  new Promise((resolve) => {
                    submitTimer.current = setTimeout(resolve, 550);
                  })
                ]);

                setIsSubmitting(false);

                if (submitError) {
                  setContactError(submitError);
                  return;
                }

                setContact({ name: "", email: "", phone: "" });
                setMessage("");
                setAttachments([]);
                setHasConsented(false);
                alert("Enquiry submitted successfully!");
              }}
            >
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <MessageBox
                  id="contact-message"
                  value={message}
                  onChange={setMessage}
                  attachments={attachments}
                  onAttach={(files) =>
                    setAttachments((current) => [...current, ...files])
                  }
                  onRemove={(index) =>
                    setAttachments((current) =>
                      current.filter((_, i) => i !== index)
                    )
                  }
                  placeholder="Tell us about your project"
                />
              </div>

              {contactError ? (
                <p className="calc-form-error">{contactError}</p>
              ) : null}

              <label className="form-consent" htmlFor="contact-consent">
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                />
                <span>
                  By proceeding, I authorise NEEMA HOMES to contact me via
                  WhatsApp, phone calls, SMS and e-mail about my enquiry.
                </span>
              </label>

              <button
                type="submit"
                className={
                  isSubmitting ? "submit-btn is-busy" : "submit-btn"
                }
                disabled={isSubmitting || !hasConsented}
              >
                <span className="btn-label">Contact Us</span>
                <FingerprintSpinner />
              </button>
            </form>
          </div>

          <div className="contact-art-panel">
            <ContactIllustration />

            <div className="contact-art-details">
              <div className="contact-line">
                <strong>Location</strong>
                <span>Chennai</span>
              </div>

              <div className="contact-line">
                <strong>Phone</strong>
                <span>{STUDIO_PHONE}</span>
              </div>

              <div className="contact-line">
                <strong>Email</strong>
                <span>{STUDIO_EMAIL}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-map">
          <div className="contact-map-head">
            <h3>Find the studio</h3>

            <a
              className="map-link"
              href={mapLinkSrc}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>

          <iframe
            title={`Map showing NEEMA HOMES in ${STUDIO_LOCATION}`}
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section id="faq" className="faq">
        <div className="faq-shell">
          <div className="section-head">
            <h2>Frequently Asked Questions</h2>
            <p>
              The questions that come up most often before a project starts.
            </p>
          </div>

          <FaqAccordion items={FAQS} />
        </div>
      </section>
      </>
      )}

      <footer className="footer">
        {/* Sits behind the columns, filling the footer. The scrub ties the
            word to the scroll: it rises as the footer comes up and sinks
            again on the way back, fully formed once the footer is mostly in
            view. Ending on the word's own centre rather than the component's
            default keeps that last point reachable — the default ends 40% up
            the viewport, which the page cannot reach this close to its end. */}
        <div className="footer-wordmark" aria-hidden="true">
          <ScrollFloat
            scrollStart="top bottom"
            scrollEnd="center bottom-=10%"
            stagger={0.05}
          >
            NEEMA
          </ScrollFloat>
        </div>

        <div className="footer-container">
          <div className="footer-brand">
            <img src="/images/logo-horizontal.png" alt="NEEMA HOMES" />
            <p>
              Creating beautiful, functional homes that reflect your lifestyle.
            </p>

            <SocialFlipButton items={SOCIAL_FLIP} />

            <StoreBadges items={APP_STORES} />
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>
            <p>Chennai</p>
            <p>{STUDIO_PHONE}</p>
            <p>{STUDIO_EMAIL}</p>
            <a className="footer-terms" href="#/terms">
              Terms of Service
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NEEMA HOMES. All rights reserved.</p>
        </div>
      </footer>

      <WhatsAppLink href={whatsappHref} />

      <button
        className={showScrollTop ? "scroll-top is-visible" : "scroll-top"}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        tabIndex={showScrollTop ? 0 : -1}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}

// The dashboard is loaded on demand: it has no place in the bundle a visitor
// downloads, and it renders on its own rather than inside the site chrome.
const AdminPage = lazy(() => import("./AdminPage.jsx"));

const isAdminHash = () => window.location.hash.startsWith("#/admin");

export default function Root() {
  const [admin, setAdmin] = useState(isAdminHash);

  useEffect(() => {
    const onHashChange = () => setAdmin(isAdminHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (admin) {
    return (
      <Suspense fallback={null}>
        <AdminPage />
      </Suspense>
    );
  }

  return <App />;
}

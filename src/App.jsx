import { useEffect, useRef, useState } from "react";
import { SOCIAL_ICONS } from "./SocialIcons.jsx";
import { SERVICE_ICONS } from "./ServiceIcons.jsx";
import ContactIllustration from "./ContactIllustration.jsx";
import ActionButton from "./ActionButton.jsx";

// Add the studio's real profiles and the footer block appears on its own.
// `platform` must match a key in SOCIAL_ICONS: instagram, facebook,
// linkedin, youtube, pinterest, whatsapp.
const SOCIALS = [];

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

// Real client quotes only — add entries as they come in and the section
// appears on its own. Shape: { quote, name, residence }
const TESTIMONIALS = [];

// Swap in the studio's street address and the map recentres on it.
const STUDIO_LOCATION = "Chennai, Tamil Nadu, India";

// Single source for the phone number: shown in contact and the footer, and
// stripped to digits for the WhatsApp link. Change it here only.
const STUDIO_PHONE = "+91 98765 43210";

const whatsappHref = `https://wa.me/${STUDIO_PHONE.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(
  "Hello NEEMA HOMES, I would like to discuss an interior design project."
)}`;

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  STUDIO_LOCATION
)}&output=embed`;

const mapLinkSrc = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STUDIO_LOCATION
)}`;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const submitTimer = useRef(null);

  useEffect(() => () => clearTimeout(submitTimer.current), []);

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

      <header className={isScrolled ? "header is-scrolled" : "header"}>
        <div className="logo">
          <img src="/images/logo-horizontal.png" alt="NEEMA HOMES" />
        </div>

        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            {TESTIMONIALS.length > 0 && (
              <li><a href="#testimonials">Testimonials</a></li>
            )}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <ActionButton
          className="btn"
          onAction={() => scrollToSection("contact")}
        >
          Enquire Now
        </ActionButton>
      </header>

      <section id="home" className="hero">
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
          <div className="section-head">
            <p className="eyebrow">Featured</p>
            <h2>Our Portfolio</h2>
            <p>
              A selection of our completed residential interiors across
              Chennai.
            </p>
          </div>
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
                    <img src={room.image} alt={room.title} />
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
              onSubmit={(e) => {
                e.preventDefault();
                if (isSubmitting) return;

                // Same beat as ActionButton, so the click registers
                setIsSubmitting(true);
                submitTimer.current = setTimeout(() => {
                  setIsSubmitting(false);
                  alert("Enquiry submitted successfully!");
                }, 550);
              }}
            >
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="Tell us about your project"
                />
              </div>

              <button
                type="submit"
                className={
                  isSubmitting ? "submit-btn is-busy" : "submit-btn"
                }
                disabled={isSubmitting}
              >
                <span className="btn-label">Contact Us</span>
                <span className="btn-spinner" aria-hidden="true" />
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
                <span>info@neemahomes.com</span>
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

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src="/images/logo-horizontal.png" alt="NEEMA HOMES" />
            <p>
              Creating beautiful, functional homes that reflect your lifestyle.
            </p>

            {SOCIALS.length > 0 && (
              <ul className="footer-social">
                {SOCIALS.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`NEEMA HOMES on ${social.platform}`}
                    >
                      {SOCIAL_ICONS[social.platform]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
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
            <p>info@neemahomes.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NEEMA HOMES. All rights reserved.</p>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Message NEEMA HOMES on WhatsApp"
      >
        {SOCIAL_ICONS.whatsapp}
      </a>

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

export default App;

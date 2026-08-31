import { useEffect, useState } from "react";

const SERVICES = [
  {
    number: "01",
    title: "Interior Design",
    description: "Modern and elegant home interior designs."
  },
  {
    number: "02",
    title: "Space Planning",
    description: "Smart layouts to maximize comfort and functionality."
  },
  {
    number: "03",
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

// Real client quotes only — add entries as they come in and the section
// appears on its own. Shape: { quote, name, residence }
const TESTIMONIALS = [];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // The header sits transparent over the hero photo and solidifies past it.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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

        <button className="btn" onClick={() => scrollToSection("contact")}>
          Enquire Now
        </button>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <p className="eyebrow">Neema Homes · Chennai</p>

          <h1>Premium Residential Interior Design</h1>

          <p>
            Creating beautiful, functional homes that reflect your lifestyle.
          </p>

          <div className="hero-actions">
            <button
              className="hero-btn"
              onClick={() => scrollToSection("portfolio")}
            >
              Explore Our Work <span aria-hidden="true">→</span>
            </button>

            <button
              className="ghost-btn"
              onClick={() => scrollToSection("contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-grid">
          <div>
            <p className="eyebrow">About the studio</p>

            <h2>A studio built around how you actually live</h2>

            <p>
              NEEMA HOMES is a premium residential interior design studio based
              in Chennai. We create elegant and functional living spaces
              tailored to every client.
            </p>
          </div>

          <div className="about-media">
            <img
              src="/images/materials.jpg"
              alt="Oak, travertine, brass and linen material samples"
            />
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
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
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
          <div className="project-modal">
            <div className="project-modal-content">
              <button
                className="close-project"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>

              <img src={selectedProject.image} alt={selectedProject.title} />

              <p className="modal-residence">{selectedProject.residence}</p>

              <h2>{selectedProject.title}</h2>

              <p>{selectedProject.description}</p>

              <button
                className="close-btn"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
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
        <div className="contact-container">
          <div className="contact-info">
            <p className="eyebrow">Get in touch</p>

            <h3>Let's Talk About Your Project</h3>

            <p>
              Ready to transform your home? We would love to hear about your
              interior design requirements.
            </p>

            <div className="contact-line">
              <strong>Location</strong>
              <span>Chennai</span>
            </div>

            <div className="contact-line">
              <strong>Phone</strong>
              <span>+91 98765 43210</span>
            </div>

            <div className="contact-line">
              <strong>Email</strong>
              <span>info@neemahomes.com</span>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Enquiry submitted successfully!");
            }}
          >
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Tell us about your project" />
            </div>

            <button type="submit" className="submit-btn">
              Submit Enquiry
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src="/images/logo-horizontal.png" alt="NEEMA HOMES" />
            <p>
              Creating beautiful, functional homes that reflect your lifestyle.
            </p>
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
            <p>+91 98765 43210</p>
            <p>info@neemahomes.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NEEMA HOMES. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

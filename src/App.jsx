import { useEffect, useState } from "react";

const SERVICES = [
  {
    number: "01",
    title: "Interior Design",
    description:
      "Full-home design, from concept boards and material palettes through to the final styling."
  },
  {
    number: "02",
    title: "Space Planning",
    description:
      "Smart layouts that make every square foot work — circulation, storage and natural light."
  },
  {
    number: "03",
    title: "Furniture Design",
    description:
      "Custom joinery and loose furniture built to your dimensions by our own workshop."
  }
];

const PROJECTS = [
  {
    title: "Arched Foyer",
    caption: "Entrance · Anna Nagar",
    image: "/images/project-foyer.jpg",
    description:
      "An arched entry in fluted oak and travertine that sets the tone for the rest of the home."
  },
  {
    title: "Modern Kitchen",
    caption: "Kitchen · Adyar",
    image: "/images/project-kitchen.jpg",
    description:
      "A working kitchen planned around the cook — deep drawers, a quiet stone island and concealed appliances."
  },
  {
    title: "Primary Bedroom",
    caption: "Bedroom · Besant Nagar",
    image: "/images/project-bedroom.jpg",
    description:
      "Layered neutrals, soft linen and a panelled headboard wall for a calm, low-contrast retreat."
  },
  {
    title: "Dining Room",
    caption: "Dining · Alwarpet",
    image: "/images/project-dining.jpg",
    description:
      "A dining room built around a single long table, with brass lighting and a full-height display wall."
  },
  {
    title: "Guest Bath",
    caption: "Bathroom · Nungambakkam",
    image: "/images/project-bath.jpg",
    description:
      "Full-height stone, a floating vanity and warm brass fittings in a compact guest bathroom."
  },
  {
    title: "Study",
    caption: "Workspace · Kotturpuram",
    image: "/images/project-study.jpg",
    description:
      "A quiet study with a bespoke desk, closed storage and a reading corner set into the window."
  },
  {
    title: "Walk-in Wardrobe",
    caption: "Wardrobe · Boat Club",
    image: "/images/project-wardrobe.jpg",
    description:
      "Open shelving, lit rails and a central island — every item visible without feeling cluttered."
  },
  {
    title: "Pooja Room",
    caption: "Pooja · Mylapore",
    image: "/images/project-pooja.jpg",
    description:
      "A carved teak shrine with concealed lighting, detailed with traditional joinery and brass inlay."
  },
  {
    title: "Balcony Garden",
    caption: "Outdoor · ECR",
    image: "/images/project-balcony.jpg",
    description:
      "A planted balcony with weatherproof seating, designed as an extension of the living room."
  }
];

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
            Creating beautiful, functional homes that reflect your lifestyle —
            designed, detailed and delivered by a single studio.
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

            <p>
              Every project runs through one team — space planning, material
              selection, custom joinery and site supervision — so what you
              approve on the drawings is what gets handed over.
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
            <p>
              Three ways we work with homeowners, from a single room to a
              complete residence.
            </p>
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
              A selection of residential interiors completed across Chennai.
            </p>
          </div>
        </div>

        <div className="portfolio-grid">
          {PROJECTS.map((project) => (
            <div
              className="portfolio-card"
              key={project.title}
              onClick={() => setSelectedProject(project)}
            >
              <div className="portfolio-media">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <p>{project.caption}</p>

                <button className="view-project">
                  View Project <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

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

import { useState } from "react";
function App() {
  const[selectedProject,setSelectedProject]=useState(null);
  return (
    <>
      <header className="header">
        <div className="logo">
          <h2>NEEMA HOMES</h2>
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

        <button
  className="btn"
  onClick={() => {
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });
  }}
>
  Enquire Now
</button>
      </header>

      <section id="home" className="hero">
        <h1>Premium Residential Interior Design</h1>
        <p>
          Creating beautiful, functional homes that reflect your lifestyle.
        </p>

      <button
  className="hero-btn"
  onClick={() => {
    document.getElementById("portfolio").scrollIntoView({
      behavior: "smooth"
    });
  }}
>
  Explore Our Work
</button>
      </section>

      <section id="about" className="about">
        <h2>About NEEMA HOMES</h2>

        <p>
          NEEMA HOMES is a premium residential interior design studio based
          in Chennai. We create elegant and functional living spaces tailored
          to every client.
        </p>
      </section>

      <section id="services" className="services">
        <h2>Our Services</h2>

        <div className="service-container">
          <div className="service-card">
            <h3>Interior Design</h3>
            <p>Modern and elegant home interior designs.</p>
          </div>

          <div className="service-card">
            <h3>Space Planning</h3>
            <p>Smart layouts to maximize comfort and functionality.</p>
          </div>

          <div className="service-card">
            <h3>Furniture Design</h3>
            <p>Custom furniture that suits your lifestyle.</p>
          </div>
        </div>
      </section>
<section id="portfolio" className="portfolio">
  <h2>Our Portfolio</h2>

  <p className="portfolio-intro">
    Explore some of our residential interior design projects.
  </p>

  <div className="portfolio-grid">

    {/* Project 1 */}
    <div className="portfolio-card">
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        alt="Modern living room"
      />

      <div className="portfolio-info">
        <h3>Modern Living Space</h3>
        <p>Contemporary residential interior</p>

        <button
          className="view-project"
          onClick={() =>
            setSelectedProject({
              title: "Modern Living Space",
              image:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
              description:
                "A contemporary residential interior designed with comfort, elegance and modern functionality."
            })
          }
        >
          View Project
        </button>
      </div>
    </div>

    {/* Project 2 */}
    <div className="portfolio-card">
      <img
        src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
        alt="Luxury residence"
      />

      <div className="portfolio-info">
        <h3>Luxury Residence</h3>
        <p>Elegant luxury interiors</p>

        <button
          className="view-project"
          onClick={() =>
            setSelectedProject({
              title: "Luxury Residence",
              image:
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
              description:
                "An elegant luxury residence featuring premium materials, sophisticated furniture and timeless interior details."
            })
          }
        >
          View Project
        </button>
      </div>
    </div>

    {/* Project 3 */}
    <div className="portfolio-card">
      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
        alt="Minimalist home"
      />

      <div className="portfolio-info">
        <h3>Minimalist Home</h3>
        <p>Clean and functional design</p>

        <button
          className="view-project"
          onClick={() =>
            setSelectedProject({
              title: "Minimalist Home",
              image:
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
              description:
                "A clean and functional minimalist home focused on simplicity, natural light and comfortable living."
            })
          }
        >
          View Project
        </button>
      </div>
    </div>

    {/* Project 4 */}
    <div className="portfolio-card">
      <img
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
        alt="Elegant bedroom"
      />

      <div className="portfolio-info">
        <h3>Elegant Bedroom</h3>
        <p>Calm and sophisticated interiors</p>

        <button
          className="view-project"
          onClick={() =>
            setSelectedProject({
              title: "Elegant Bedroom",
              image:
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
              description:
                "A calm and sophisticated bedroom designed to create a peaceful and comfortable personal space."
            })
          }
        >
          View Project
        </button>
      </div>
    </div>

    {/* Project 5 */}
    <div className="portfolio-card">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="Modern kitchen"
      />

      <div className="portfolio-info">
        <h3>Modern Kitchen</h3>
        <p>Functional contemporary kitchen</p>

        <button
          className="view-project"
          onClick={() =>
            setSelectedProject({
              title: "Modern Kitchen",
              image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
              description:
                "A modern kitchen combining practical storage, contemporary styling and efficient functionality."
            })
          }
        >
          View Project
        </button>
      </div>
    </div>

    {/* Project 6 */}
    <div className="portfolio-card">
      <img
        src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
        alt="Premium apartment"
      />

      <div className="portfolio-info">
        <h3>Premium Apartment</h3>
        <p>Modern urban residence</p>

        <button
          className="view-project"
          onClick={() =>
            setSelectedProject({
              title: "Premium Apartment",
              image:
                "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
              description:
                "A premium urban apartment combining modern aesthetics, comfortable furniture and practical space planning."
            })
          }
        >
          View Project
        </button>
      </div>
    </div>

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

        <img
          src={selectedProject.image}
          alt={selectedProject.title}
        />

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
  <h2>Contact Us</h2>

  <p className="contact-intro">
    Ready to transform your home? Get in touch with NEEMA HOMES.
  </p>

  <div className="contact-container">

    <div className="contact-info">
      <h3>Let's Talk About Your Project</h3>

      <p>
        We would love to hear about your interior design requirements.
      </p>

      <p>
        <strong>Location:</strong> Chennai
      </p>

      <p>
        <strong>Phone:</strong> +91 98765 43210
      </p>

      <p>
        <strong>Email:</strong> info@neemahomes.com
      </p>
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
        <input
          type="text"
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          rows="5"
          placeholder="Tell us about your project"
        ></textarea>
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
      <h2>NEEMA HOMES</h2>
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